from __future__ import annotations

import argparse
import json
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Any


JsonMap = dict[str, Any]

DEFAULT_POLICY_PATH = Path(__file__).resolve().parents[1] / "configs" / "work-timing-policy.json"


@dataclass(frozen=True)
class PhaseSummary:
    phase_id: str
    label: str
    status: str
    duration_seconds: float | None
    measurement: str
    bottleneck_notes: str

    def to_dict(self) -> JsonMap:
        return {
            "phase_id": self.phase_id,
            "label": self.label,
            "status": self.status,
            "duration_seconds": self.duration_seconds,
            "measurement": self.measurement,
            "bottleneck_notes": self.bottleneck_notes,
        }


def load_json(path: Path) -> JsonMap:
    with path.open(encoding="utf-8") as handle:
        data = json.load(handle)
    if not isinstance(data, dict):
        raise TypeError(f"JSON root must be an object: {path}")
    return data


def summarize_timing(timing: JsonMap, policy: JsonMap | None = None) -> JsonMap:
    policy = policy or {}
    thresholds = policy.get("bottleneck_thresholds", {})
    seconds_threshold = float(thresholds.get("phase_seconds_warn", 900))
    ratio_threshold = float(thresholds.get("phase_total_ratio_warn", 0.35))

    phase_summaries = [_phase_summary(phase) for phase in timing.get("phases", []) if isinstance(phase, dict)]
    measured = [phase for phase in phase_summaries if phase.duration_seconds is not None]
    total_seconds = sum(float(phase.duration_seconds) for phase in measured)
    slowest = max(measured, key=lambda phase: float(phase.duration_seconds), default=None)
    bottlenecks = []
    for phase in measured:
        ratio = float(phase.duration_seconds) / total_seconds if total_seconds else 0.0
        if phase.duration_seconds >= seconds_threshold or ratio >= ratio_threshold:
            bottlenecks.append(
                {
                    "phase_id": phase.phase_id,
                    "label": phase.label,
                    "duration_seconds": phase.duration_seconds,
                    "ratio_of_measured_total": round(ratio, 4),
                    "bottleneck_notes": phase.bottleneck_notes,
                }
            )

    return {
        "task_id": timing.get("task_id", ""),
        "title": timing.get("title", ""),
        "work_mode": timing.get("work_mode", ""),
        "measurement_quality": timing.get("measurement_quality", ""),
        "total_measured_seconds": round(total_seconds, 3),
        "measured_phase_count": len(measured),
        "unmeasured_phase_count": len(phase_summaries) - len(measured),
        "slowest_phase": slowest.to_dict() if slowest else None,
        "bottleneck_phases": bottlenecks,
        "phase_summaries": [phase.to_dict() for phase in phase_summaries],
    }


def check_timing(timing: JsonMap, policy: JsonMap | None = None) -> JsonMap:
    policy = policy or {}
    gaps: list[str] = []
    warnings: list[str] = []

    for field in ("task_id", "title", "work_mode", "measurement_quality", "phases"):
        if field not in timing:
            gaps.append(f"Missing required field: {field}")

    quality_values = set(policy.get("measurement_quality_values", ["measured", "partial", "not_measured"]))
    quality = timing.get("measurement_quality")
    if quality and quality not in quality_values:
        gaps.append(f"measurement_quality must be one of: {', '.join(sorted(quality_values))}")

    phases = timing.get("phases", [])
    if not isinstance(phases, list) or not phases:
        gaps.append("phases must be a non-empty list.")
    else:
        for index, phase in enumerate(phases):
            _check_phase(index, phase, policy, quality, gaps, warnings)

    summary = summarize_timing(timing, policy)
    if summary["unmeasured_phase_count"] and quality == "measured":
        gaps.append("measurement_quality is measured, but at least one phase has no measured duration.")
    if summary["unmeasured_phase_count"] and quality == "partial":
        warnings.append("Some phases are unmeasured because measurement started after the task began or data was unavailable.")
    if not summary["measured_phase_count"]:
        warnings.append("No measured phase durations are available; bottleneck analysis cannot identify a slowest phase.")

    return {
        "status": "rework_required" if gaps else "ready",
        "requires_rework": bool(gaps),
        "gaps": gaps,
        "warnings": warnings,
        "summary": summary,
    }


def _check_phase(
    index: int,
    phase: Any,
    policy: JsonMap,
    measurement_quality: str | None,
    gaps: list[str],
    warnings: list[str],
) -> None:
    prefix = f"phases[{index}]"
    if not isinstance(phase, dict):
        gaps.append(f"{prefix} must be an object.")
        return
    for field in ("phase_id", "label", "status"):
        if not phase.get(field):
            gaps.append(f"{prefix}.{field} is required.")

    status_values = set(policy.get("phase_status_values", ["pending", "in_progress", "completed", "blocked", "skipped"]))
    status = phase.get("status")
    if status and status not in status_values:
        gaps.append(f"{prefix}.status must be one of: {', '.join(sorted(status_values))}")

    duration = phase_duration_seconds(phase)
    if duration is not None and duration < 0:
        gaps.append(f"{prefix}.duration_seconds must not be negative.")
    if status == "completed" and duration is None and measurement_quality == "measured":
        gaps.append(f"{prefix} is completed but has no measured duration.")
    if status == "completed" and duration is None:
        warnings.append(f"{prefix} is completed without measured duration.")


def _phase_summary(phase: JsonMap) -> PhaseSummary:
    return PhaseSummary(
        phase_id=str(phase.get("phase_id", "")),
        label=str(phase.get("label", "")),
        status=str(phase.get("status", "")),
        duration_seconds=phase_duration_seconds(phase),
        measurement=str(phase.get("measurement", "measured" if phase_duration_seconds(phase) is not None else "not_measured")),
        bottleneck_notes=str(phase.get("bottleneck_notes", "")),
    )


def phase_duration_seconds(phase: JsonMap) -> float | None:
    explicit = phase.get("duration_seconds")
    if explicit is not None:
        try:
            return float(explicit)
        except (TypeError, ValueError):
            return None
    started = parse_datetime(phase.get("started_at"))
    ended = parse_datetime(phase.get("ended_at"))
    if started and ended:
        return (ended - started).total_seconds()
    return None


def parse_datetime(value: Any) -> datetime | None:
    if not isinstance(value, str) or not value:
        return None
    normalized = value.strip()
    if normalized.endswith("Z"):
        normalized = f"{normalized[:-1]}+00:00"
    if len(normalized) >= 5 and normalized[-5] in {"+", "-"} and normalized[-3] != ":":
        normalized = f"{normalized[:-2]}:{normalized[-2:]}"
    try:
        return datetime.fromisoformat(normalized)
    except ValueError:
        return None


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Validate and summarize workspace task timing records.")
    parser.add_argument("--policy", type=Path, default=DEFAULT_POLICY_PATH, help="Timing policy config path.")
    subparsers = parser.add_subparsers(dest="command", required=True)

    check = subparsers.add_parser("check", help="Validate a timing record.")
    check.add_argument("path", type=Path)

    summarize = subparsers.add_parser("summarize", help="Summarize timing and bottleneck candidates.")
    summarize.add_argument("path", type=Path)

    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    policy = load_json(args.policy)
    timing = load_json(args.path)

    if args.command == "check":
        report = check_timing(timing, policy)
        print(json.dumps(report, indent=2, ensure_ascii=False))
        return 1 if report["requires_rework"] else 0

    if args.command == "summarize":
        print(json.dumps(summarize_timing(timing, policy), indent=2, ensure_ascii=False))
        return 0

    raise ValueError(f"Unknown command: {args.command}")


if __name__ == "__main__":
    raise SystemExit(main())
