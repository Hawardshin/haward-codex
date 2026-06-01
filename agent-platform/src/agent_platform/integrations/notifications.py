"""Config-driven notification dispatch for Slack, Discord, and Teams."""

from __future__ import annotations

from dataclasses import dataclass
import json
import os
from pathlib import Path
from typing import Any, Callable, Mapping
from urllib import request
from urllib.error import HTTPError, URLError


JsonMap = dict[str, Any]
Environment = Mapping[str, str]
Sender = Callable[[str, JsonMap, float], JsonMap]

ALLOWED_PROVIDERS = {"discord", "slack", "teams"}
ALLOWED_SEVERITIES = {"debug": 10, "info": 20, "warning": 30, "error": 40, "critical": 50}
DEFAULT_EVENTS = {"approval_needed", "long_running_update", "work_completed", "work_failed"}
INLINE_SECRET_FIELDS = {
    "webhook_url",
    "url",
    "token",
    "secret",
    "bearer_token",
    "bot_token",
    "incoming_webhook",
}


@dataclass(frozen=True)
class NotificationEvent:
    """One event that can be sent to configured notification channels."""

    event_type: str
    title: str
    message: str
    severity: str = "info"
    metadata: Mapping[str, str] | None = None


def load_notification_config(path: Path) -> JsonMap:
    """Load a notification config JSON file."""

    with path.open("r", encoding="utf-8") as file:
        data = json.load(file)
    if not isinstance(data, dict):
        raise TypeError("Notification config must be a JSON object.")
    return data


def check_notification_config(
    config: JsonMap,
    *,
    env: Environment | None = None,
    require_secrets: bool = False,
) -> JsonMap:
    """Validate notification settings without sending messages."""

    gaps: list[str] = []
    warnings: list[str] = []
    env = env if env is not None else os.environ

    if not isinstance(config.get("notifications_enabled"), bool):
        gaps.append("notifications_enabled must be a bool.")

    channels = config.get("channels")
    if not isinstance(channels, list) or not channels:
        gaps.append("channels must be a non-empty list.")
    else:
        _check_channels(channels, env, require_secrets, gaps, warnings)

    default_policy = config.get("default_event_policy", {})
    if not isinstance(default_policy, dict):
        gaps.append("default_event_policy must be an object.")
    else:
        dry_run_default = default_policy.get("dry_run_default", True)
        if not isinstance(dry_run_default, bool):
            gaps.append("default_event_policy.dry_run_default must be a bool.")
        minimum_severity = str(default_policy.get("minimum_severity", "info")).lower()
        if minimum_severity not in ALLOWED_SEVERITIES:
            gaps.append("default_event_policy.minimum_severity must be one of debug, info, warning, error, critical.")
        if not _list_of_strings(default_policy.get("enabled_events", list(DEFAULT_EVENTS))):
            gaps.append("default_event_policy.enabled_events must be a list of event names.")

    secret_policy = config.get("secret_policy", {})
    if not isinstance(secret_policy, dict):
        gaps.append("secret_policy must be an object.")
    elif secret_policy.get("store_secrets_in_config") is not False:
        gaps.append("secret_policy.store_secrets_in_config must be false.")

    status = "ready" if not gaps else "rework_required"
    return {
        "status": status,
        "requires_rework": bool(gaps),
        "principle": "Notification config stores only routing policy and environment variable names; webhook URLs stay outside git.",
        "checks": {
            "channels_count": len(channels) if isinstance(channels, list) else 0,
            "enabled_channels_count": len([item for item in channels if isinstance(item, dict) and item.get("enabled")])
            if isinstance(channels, list)
            else 0,
            "require_secrets": require_secrets,
        },
        "gaps": gaps,
        "warnings": warnings,
        "follow_up_actions": [f"Resolve notification config gap: {gap}" for gap in gaps],
    }


def dispatch_notification(
    config: JsonMap,
    event: NotificationEvent,
    *,
    env: Environment | None = None,
    dry_run: bool | None = None,
    timeout: float = 10.0,
    sender: Sender | None = None,
) -> JsonMap:
    """Dispatch one event to enabled channels, or return payload previews in dry-run mode."""

    env = env if env is not None else os.environ
    event_validation = _check_event(event)
    validation = check_notification_config(config, env=env, require_secrets=False)
    if event_validation["requires_rework"] or validation["requires_rework"]:
        return {
            "status": "rework_required",
            "dry_run": True if dry_run is None else dry_run,
            "validation": {"config": validation, "event": event_validation},
            "attempted": [],
            "skipped": [],
            "failed": [],
        }
    event = NotificationEvent(
        event.event_type,
        event.title,
        event.message,
        event.severity.lower(),
        event.metadata,
    )

    default_policy = config.get("default_event_policy", {})
    if dry_run is None:
        dry_run = bool(default_policy.get("dry_run_default", True))

    if not config.get("notifications_enabled", False):
        return {
            "status": "disabled",
            "dry_run": dry_run,
            "validation": validation,
            "attempted": [],
            "skipped": [{"reason": "notifications_disabled"}],
            "failed": [],
        }

    sender = sender or _post_json
    attempted: list[JsonMap] = []
    skipped: list[JsonMap] = []
    failed: list[JsonMap] = []

    for channel in config.get("channels", []):
        decision = _channel_send_decision(channel, event, default_policy, env)
        if not decision["send"]:
            skipped.append(decision["report"])
            continue

        payload = build_provider_payload(str(channel["provider"]).lower(), event, channel)
        webhook_url = env.get(channel["webhook_url_env"], "")
        if dry_run:
            attempted.append(
                {
                    "channel_id": channel["id"],
                    "provider": channel["provider"],
                    "dry_run": True,
                    "webhook_url_env": channel["webhook_url_env"],
                    "payload_preview": payload,
                }
            )
            continue

        try:
            response = sender(webhook_url, payload, timeout)
            attempted.append(
                {
                    "channel_id": channel["id"],
                    "provider": channel["provider"],
                    "dry_run": False,
                    "response": response,
                }
            )
        except NotificationDispatchError as exc:
            failed.append(
                {
                    "channel_id": channel["id"],
                    "provider": channel["provider"],
                    "error": str(exc),
                }
            )

    status = _dispatch_status(attempted, failed, dry_run)
    return {
        "status": status,
        "dry_run": dry_run,
        "validation": validation,
        "attempted": attempted,
        "skipped": skipped,
        "failed": failed,
    }


def build_provider_payload(provider: str, event: NotificationEvent, channel: JsonMap) -> JsonMap:
    """Build the JSON payload expected by a provider webhook."""

    text = _render_text(event, channel)
    provider = provider.lower()
    if provider == "slack":
        return {"text": text}
    if provider == "discord":
        payload: JsonMap = {"content": _limit(text, 2000), "allowed_mentions": {"parse": []}}
        username = _channel_format(channel).get("username", "")
        if isinstance(username, str) and username.strip():
            payload["username"] = username.strip()
        return payload
    if provider == "teams":
        style = str(channel.get("payload_style", "message_card")).lower()
        if style == "simple_text":
            return {"text": text}
        if style == "adaptive_card":
            return {
                "type": "message",
                "attachments": [
                    {
                        "contentType": "application/vnd.microsoft.card.adaptive",
                        "content": {
                            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                            "type": "AdaptiveCard",
                            "version": "1.5",
                            "body": [{"type": "TextBlock", "text": text, "wrap": True}],
                        },
                    }
                ],
            }
        return {
            "@type": "MessageCard",
            "@context": "https://schema.org/extensions",
            "summary": _limit(event.title, 200),
            "themeColor": _teams_theme_color(event.severity),
            "text": text,
        }
    raise ValueError(f"Unsupported provider: {provider}")


class NotificationDispatchError(RuntimeError):
    """Raised when a webhook POST fails."""


def _check_channels(
    channels: list[Any],
    env: Environment,
    require_secrets: bool,
    gaps: list[str],
    warnings: list[str],
) -> None:
    seen = set()
    for index, channel in enumerate(channels, start=1):
        label = f"channels[{index}]"
        if not isinstance(channel, dict):
            gaps.append(f"{label} must be an object.")
            continue
        channel_id = str(channel.get("id", "")).strip()
        provider = str(channel.get("provider", "")).strip().lower()
        if not channel_id:
            gaps.append(f"{label}.id is required.")
        elif channel_id in seen:
            gaps.append(f"{label}.id is duplicated: {channel_id}.")
        else:
            seen.add(channel_id)
        if provider not in ALLOWED_PROVIDERS:
            gaps.append(f"{label}.provider must be one of: {', '.join(sorted(ALLOWED_PROVIDERS))}.")
        if not isinstance(channel.get("enabled"), bool):
            gaps.append(f"{label}.enabled must be a bool.")
        webhook_env = channel.get("webhook_url_env")
        if not isinstance(webhook_env, str) or not webhook_env.strip():
            gaps.append(f"{label}.webhook_url_env is required.")
        elif require_secrets and channel.get("enabled") and webhook_env not in env:
            gaps.append(f"{label}.webhook_url_env points to missing environment variable: {webhook_env}.")
        inline_secret_fields = sorted(INLINE_SECRET_FIELDS.intersection(channel))
        if inline_secret_fields:
            gaps.append(f"{label} must not store inline secret fields: {', '.join(inline_secret_fields)}.")
        if "events" in channel and not _list_of_strings(channel["events"]):
            gaps.append(f"{label}.events must be a list of event names.")
        minimum_severity = str(channel.get("minimum_severity", "info")).lower()
        if minimum_severity not in ALLOWED_SEVERITIES:
            gaps.append(f"{label}.minimum_severity must be one of debug, info, warning, error, critical.")
        if provider == "teams" and channel.get("payload_style") not in (None, "simple_text", "message_card", "adaptive_card"):
            gaps.append(f"{label}.payload_style must be simple_text, message_card, or adaptive_card.")
        if provider == "teams":
            warnings.append(f"{label}: Teams connector behavior is changing; prefer Workflows webhook URLs.")


def _check_event(event: NotificationEvent) -> JsonMap:
    gaps = []
    if not event.event_type.strip():
        gaps.append("event_type is required.")
    if not event.title.strip():
        gaps.append("title is required.")
    if not event.message.strip():
        gaps.append("message is required.")
    if event.severity.lower() not in ALLOWED_SEVERITIES:
        gaps.append("severity must be one of debug, info, warning, error, critical.")
    return {"status": "ready" if not gaps else "rework_required", "requires_rework": bool(gaps), "gaps": gaps}


def _channel_send_decision(channel: JsonMap, event: NotificationEvent, default_policy: JsonMap, env: Environment) -> JsonMap:
    channel_id = channel.get("id", "")
    provider = channel.get("provider", "")
    if not channel.get("enabled", False):
        return {"send": False, "report": {"channel_id": channel_id, "provider": provider, "reason": "channel_disabled"}}
    events = channel.get("events") or default_policy.get("enabled_events") or list(DEFAULT_EVENTS)
    if event.event_type not in set(events):
        return {"send": False, "report": {"channel_id": channel_id, "provider": provider, "reason": "event_not_enabled"}}
    minimum_severity = str(channel.get("minimum_severity") or default_policy.get("minimum_severity", "info")).lower()
    if ALLOWED_SEVERITIES[event.severity] < ALLOWED_SEVERITIES[minimum_severity]:
        return {"send": False, "report": {"channel_id": channel_id, "provider": provider, "reason": "below_minimum_severity"}}
    webhook_env = channel.get("webhook_url_env", "")
    if not isinstance(webhook_env, str) or not env.get(webhook_env):
        return {"send": False, "report": {"channel_id": channel_id, "provider": provider, "reason": "missing_webhook_env", "webhook_url_env": webhook_env}}
    return {"send": True, "report": {"channel_id": channel_id, "provider": provider}}


def _post_json(url: str, payload: JsonMap, timeout: float) -> JsonMap:
    data = json.dumps(payload).encode("utf-8")
    webhook_request = request.Request(
        url,
        data=data,
        headers={"Content-Type": "application/json; charset=utf-8", "User-Agent": "agent-platform-notifier/1.0"},
        method="POST",
    )
    try:
        with request.urlopen(webhook_request, timeout=timeout) as response:
            body = response.read().decode("utf-8", errors="replace")
            return {"status_code": response.status, "reason": response.reason, "body": body[:500]}
    except HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        raise NotificationDispatchError(f"HTTP {exc.code}: {body[:500]}") from exc
    except URLError as exc:
        raise NotificationDispatchError(f"URL error: {exc.reason}") from exc


def _render_text(event: NotificationEvent, channel: JsonMap) -> str:
    metadata = event.metadata or {}
    lines = [
        f"[{event.severity.upper()}] {event.title}",
        event.message,
    ]
    if _channel_format(channel).get("include_event_type", True):
        lines.append(f"event={event.event_type}")
    if metadata:
        meta_text = ", ".join(f"{key}={value}" for key, value in sorted(metadata.items()))
        lines.append(meta_text)
    return "\n".join(line for line in lines if str(line).strip())


def _channel_format(channel: JsonMap) -> JsonMap:
    value = channel.get("format", {})
    return value if isinstance(value, dict) else {}


def _teams_theme_color(severity: str) -> str:
    return {
        "debug": "64748B",
        "info": "2563EB",
        "warning": "D97706",
        "error": "DC2626",
        "critical": "991B1B",
    }.get(severity, "2563EB")


def _dispatch_status(attempted: list[JsonMap], failed: list[JsonMap], dry_run: bool) -> str:
    if failed:
        return "partial_failure" if attempted else "failed"
    if attempted:
        return "dry_run_ready" if dry_run else "sent"
    return "nothing_to_send"


def _limit(value: str, max_length: int) -> str:
    if len(value) <= max_length:
        return value
    return value[: max_length - 3] + "..."


def _list_of_strings(value: Any) -> bool:
    return isinstance(value, list) and all(isinstance(item, str) and item.strip() for item in value)
