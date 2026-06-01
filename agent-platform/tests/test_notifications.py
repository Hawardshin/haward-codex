from __future__ import annotations

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from agent_platform.governance.config_contract import check_config_contract
from agent_platform.integrations.notifications import (
    NotificationEvent,
    build_provider_payload,
    check_notification_config,
    dispatch_notification,
    load_notification_config,
)


CONFIG_PATH = Path(__file__).resolve().parents[1] / "configs" / "integrations" / "notification-channels.json"


class NotificationTests(unittest.TestCase):
    def test_notification_config_is_self_documenting_and_valid_without_secrets(self) -> None:
        config = load_notification_config(CONFIG_PATH)

        contract = check_config_contract(config, str(CONFIG_PATH))
        notification = check_notification_config(config, env={}, require_secrets=False)

        self.assertEqual(contract["status"], "self_documenting")
        self.assertEqual(notification["status"], "ready")

    def test_enabled_channel_can_require_webhook_env(self) -> None:
        config = load_notification_config(CONFIG_PATH)
        config["channels"][0]["enabled"] = True

        report = check_notification_config(config, env={}, require_secrets=True)

        self.assertEqual(report["status"], "rework_required")
        self.assertIn("AGENT_PLATFORM_DISCORD_WEBHOOK_URL", " ".join(report["gaps"]))

    def test_inline_secret_fields_are_rejected(self) -> None:
        config = load_notification_config(CONFIG_PATH)
        config["channels"][0]["webhook_url"] = "https://example.invalid/secret"

        report = check_notification_config(config)

        self.assertEqual(report["status"], "rework_required")
        self.assertIn("inline secret fields", " ".join(report["gaps"]))

    def test_dry_run_dispatch_previews_enabled_channel_payload(self) -> None:
        config = load_notification_config(CONFIG_PATH)
        config["channels"][0]["enabled"] = True
        event = NotificationEvent("work_completed", "Done", "The task finished.", "info", {"commit": "abc1234"})

        report = dispatch_notification(
            config,
            event,
            env={"AGENT_PLATFORM_DISCORD_WEBHOOK_URL": "https://discord.com/api/webhooks/test"},
            dry_run=True,
        )

        self.assertEqual(report["status"], "dry_run_ready")
        self.assertEqual(len(report["attempted"]), 1)
        self.assertEqual(report["attempted"][0]["payload_preview"]["allowed_mentions"], {"parse": []})
        self.assertIn("commit=abc1234", report["attempted"][0]["payload_preview"]["content"])

    def test_global_disable_skips_all_channels(self) -> None:
        config = load_notification_config(CONFIG_PATH)
        config["notifications_enabled"] = False
        config["channels"][0]["enabled"] = True

        report = dispatch_notification(
            config,
            NotificationEvent("work_completed", "Done", "The task finished."),
            env={"AGENT_PLATFORM_DISCORD_WEBHOOK_URL": "https://discord.com/api/webhooks/test"},
            dry_run=True,
        )

        self.assertEqual(report["status"], "disabled")
        self.assertEqual(report["attempted"], [])

    def test_severity_filter_skips_low_priority_channel(self) -> None:
        config = load_notification_config(CONFIG_PATH)
        config["channels"][2]["enabled"] = True

        report = dispatch_notification(
            config,
            NotificationEvent("work_completed", "Done", "Informational update.", "info"),
            env={"AGENT_PLATFORM_TEAMS_WEBHOOK_URL": "https://example.invalid/workflows/test"},
            dry_run=True,
        )

        self.assertEqual(report["status"], "nothing_to_send")
        self.assertIn("below_minimum_severity", {item["reason"] for item in report["skipped"]})

    def test_sender_is_used_only_when_send_is_requested(self) -> None:
        config = load_notification_config(CONFIG_PATH)
        config["channels"][1]["enabled"] = True
        sent: list[tuple[str, dict[str, object]]] = []

        def fake_sender(url: str, payload: dict[str, object], timeout: float) -> dict[str, object]:
            sent.append((url, payload))
            return {"status_code": 200, "reason": "OK", "timeout": timeout}

        report = dispatch_notification(
            config,
            NotificationEvent("work_completed", "Done", "The task finished."),
            env={"AGENT_PLATFORM_SLACK_WEBHOOK_URL": "https://hooks.slack.com/services/test"},
            dry_run=False,
            sender=fake_sender,
        )

        self.assertEqual(report["status"], "sent")
        self.assertEqual(sent[0][1]["text"].splitlines()[0], "[INFO] Done")

    def test_provider_payload_shapes(self) -> None:
        event = NotificationEvent("work_failed", "Failure", "A check failed.", "error")

        self.assertEqual(build_provider_payload("slack", event, {})["text"].splitlines()[0], "[ERROR] Failure")
        self.assertIn("content", build_provider_payload("discord", event, {}))
        self.assertEqual(build_provider_payload("teams", event, {})["@type"], "MessageCard")
        self.assertEqual(
            build_provider_payload("teams", event, {"payload_style": "simple_text"})["text"].splitlines()[0],
            "[ERROR] Failure",
        )


if __name__ == "__main__":
    unittest.main()
