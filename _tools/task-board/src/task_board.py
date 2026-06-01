from __future__ import annotations

import argparse
import html
import json
import sys
from datetime import datetime
from pathlib import Path
from typing import Any


JsonMap = dict[str, Any]


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Generate coordination boards.")
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[3])
    parser.add_argument("--check", action="store_true", help="Fail if generated boards are stale.")
    args = parser.parse_args(argv)

    root = args.root.resolve()
    status_path = root / "_ops" / "coordination" / "status.json"
    status = load_status(status_path)

    outputs = {
        root / "_ops" / "coordination" / "board.ko.md": render_markdown(status, "ko", root),
        root / "_ops" / "coordination" / "board.en.md": render_markdown(status, "en", root),
        root / "_ops" / "coordination" / "board.html": render_html(status, root),
    }

    stale = []
    for path, content in outputs.items():
        normalized = content.rstrip() + "\n"
        if args.check:
            if not path.exists() or path.read_text(encoding="utf-8") != normalized:
                stale.append(path)
            continue
        path.write_text(normalized, encoding="utf-8")
        print(f"updated: {path.relative_to(root)}")

    if stale:
        for path in stale:
            print(f"stale: {path.relative_to(root)}", file=sys.stderr)
        return 1
    return 0


def load_status(path: Path) -> JsonMap:
    with path.open("r", encoding="utf-8") as file:
        data = json.load(file)
    validate_status(data)
    return data


def validate_status(data: JsonMap) -> None:
    for key in ("updated_at", "summary", "agents", "tasks"):
        if key not in data:
            raise ValueError(f"status.json missing required key: {key}")
    if not isinstance(data["agents"], list):
        raise TypeError("agents must be a list")
    if not isinstance(data["tasks"], list):
        raise TypeError("tasks must be a list")


def render_markdown(status: JsonMap, language: str, root: Path) -> str:
    ko = language == "ko"
    labels = {
        "title": "작업 조율 보드" if ko else "Work Coordination Board",
        "generated": "생성 위치" if ko else "Generated from",
        "updated": "마지막 갱신" if ko else "Last updated",
        "summary": "요약" if ko else "Summary",
        "agents": "에이전트" if ko else "Agents",
        "tasks": "작업" if ko else "Tasks",
        "blockers": "차단 요소" if ko else "Blockers",
    }

    lines = [
        f"# {labels['title']}",
        "",
        f"- {labels['generated']}: `_ops/coordination/status.json`",
        f"- {labels['updated']}: `{status['updated_at']}`",
        f"- {labels['summary']}: {status['summary']}",
        "",
        f"## {labels['agents']}",
        "",
        "| ID | Name | Role | Status | Current Task |",
        "| --- | --- | --- | --- | --- |",
    ]

    for agent in status["agents"]:
        lines.append(
            "| {id} | {name} | {role} | {status} | {current_task} |".format(
                id=md(agent.get("id", "")),
                name=md(agent.get("name", "")),
                role=md(agent.get("role", "")),
                status=md(agent.get("status", "")),
                current_task=md(agent.get("current_task", "")),
            )
        )

    lines.extend(
        [
            "",
            f"## {labels['tasks']}",
            "",
            "| ID | Title | Project | Status | Agent | Timing | Bottleneck | Next Action |",
            "| --- | --- | --- | --- | --- | --- | --- | --- |",
        ]
    )
    for task in status["tasks"]:
        timing = timing_summary_for_task(task, root)
        lines.append(
            "| {id} | {title} | {project} | {status} | {agent} | {timing} | {bottleneck} | {next_action} |".format(
                id=md(task.get("id", "")),
                title=md(task.get("title", "")),
                project=md(task.get("project", "")),
                status=md(task.get("status", "")),
                agent=md(task.get("agent", "")),
                timing=md(timing["timing"]),
                bottleneck=md(timing["bottleneck"]),
                next_action=md(task.get("next_action", "")),
            )
        )

    lines.extend(["", f"## {labels['blockers']}", ""])
    blockers = [(task.get("id", ""), blocker) for task in status["tasks"] for blocker in task.get("blockers", [])]
    if blockers:
        for task_id, blocker in blockers:
            lines.append(f"- `{task_id}`: {blocker}")
    else:
        lines.append("- None")

    return "\n".join(lines)


def render_html(status: JsonMap, root: Path) -> str:
    agents = "\n".join(render_agent_card(agent) for agent in status["agents"])
    tasks = "\n".join(render_task_row(task, root) for task in status["tasks"])
    blockers = [blocker for task in status["tasks"] for blocker in task.get("blockers", [])]
    blocker_text = "None" if not blockers else ", ".join(blockers)

    return f"""<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Work Coordination Board</title>
    <style>
      :root {{
        color-scheme: light;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: #f5f7fb;
        color: #1f2937;
      }}
      body {{
        margin: 0;
      }}
      main {{
        width: min(1160px, calc(100% - 32px));
        margin: 0 auto;
        padding: 36px 0;
      }}
      header {{
        margin-bottom: 24px;
      }}
      h1 {{
        margin: 0 0 8px;
        font-size: 32px;
        line-height: 1.2;
      }}
      p {{
        margin: 0;
        color: #526173;
        line-height: 1.6;
      }}
      .meta {{
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        margin-top: 16px;
      }}
      .pill {{
        border: 1px solid #d8dee8;
        background: #ffffff;
        border-radius: 999px;
        padding: 6px 10px;
        font-size: 13px;
      }}
      .grid {{
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 14px;
        margin: 22px 0;
      }}
      .card, .panel {{
        border: 1px solid #d8dee8;
        background: #ffffff;
        border-radius: 8px;
        padding: 16px;
      }}
      h2 {{
        margin: 0 0 12px;
        font-size: 18px;
      }}
      h3 {{
        margin: 0 0 8px;
        font-size: 15px;
      }}
      table {{
        width: 100%;
        border-collapse: collapse;
        background: #ffffff;
        border: 1px solid #d8dee8;
        border-radius: 8px;
        overflow: hidden;
      }}
      th, td {{
        border-bottom: 1px solid #e5eaf1;
        padding: 10px;
        text-align: left;
        vertical-align: top;
        font-size: 14px;
      }}
      th {{
        background: #eef2f7;
      }}
      tr:last-child td {{
        border-bottom: 0;
      }}
      @media (max-width: 860px) {{
        .grid {{
          grid-template-columns: 1fr;
        }}
      }}
    </style>
  </head>
  <body>
    <main>
      <header>
        <h1>작업 조율 보드</h1>
        <p>{escape(status["summary"])}</p>
        <div class="meta">
          <span class="pill">Updated: {escape(status["updated_at"])}</span>
          <span class="pill">Agents: {len(status["agents"])}</span>
          <span class="pill">Tasks: {len(status["tasks"])}</span>
          <span class="pill">Blockers: {escape(blocker_text)}</span>
        </div>
      </header>
      <section>
        <h2>에이전트</h2>
        <div class="grid">
          {agents}
        </div>
      </section>
      <section>
        <h2>작업</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Status</th>
              <th>Agent</th>
              <th>Timing</th>
              <th>Bottleneck</th>
              <th>Next Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks}
          </tbody>
        </table>
      </section>
    </main>
  </body>
</html>"""


def render_agent_card(agent: JsonMap) -> str:
    return f"""<article class="card">
            <h3>{escape(agent.get("name", ""))}</h3>
            <p><strong>ID:</strong> {escape(agent.get("id", ""))}</p>
            <p><strong>Role:</strong> {escape(agent.get("role", ""))}</p>
            <p><strong>Status:</strong> {escape(agent.get("status", ""))}</p>
            <p><strong>Task:</strong> {escape(agent.get("current_task", ""))}</p>
          </article>"""


def render_task_row(task: JsonMap, root: Path) -> str:
    timing = timing_summary_for_task(task, root)
    return f"""<tr>
              <td>{escape(task.get("id", ""))}</td>
              <td>{escape(task.get("title", ""))}</td>
              <td>{escape(task.get("status", ""))}</td>
              <td>{escape(task.get("agent", ""))}</td>
              <td>{escape(timing["timing"])}</td>
              <td>{escape(timing["bottleneck"])}</td>
              <td>{escape(task.get("next_action", ""))}</td>
            </tr>"""


def timing_summary_for_task(task: JsonMap, root: Path) -> JsonMap:
    timing_summary = task.get("timing_summary")
    if isinstance(timing_summary, dict):
        return {
            "timing": str(timing_summary.get("total", "")) or "not recorded",
            "bottleneck": str(timing_summary.get("bottleneck", "")) or "not recorded",
        }

    timing_report = task.get("timing_report")
    if not timing_report:
        return {"timing": "not recorded", "bottleneck": "not recorded"}

    report_path = root / str(timing_report)
    if not report_path.exists():
        return {"timing": "missing report", "bottleneck": str(timing_report)}

    try:
        data = json.loads(report_path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return {"timing": "invalid report", "bottleneck": str(timing_report)}

    phases = [phase for phase in data.get("phases", []) if isinstance(phase, dict)]
    durations = [(phase, phase_duration_seconds(phase)) for phase in phases]
    measured = [(phase, duration) for phase, duration in durations if duration is not None]
    if not measured:
        return {"timing": "unmeasured", "bottleneck": "not measured"}

    total = sum(float(duration) for _, duration in measured)
    slowest_phase, slowest_duration = max(measured, key=lambda item: float(item[1]))
    return {
        "timing": format_seconds(total),
        "bottleneck": f"{slowest_phase.get('label', slowest_phase.get('phase_id', 'phase'))} ({format_seconds(float(slowest_duration))})",
    }


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


def format_seconds(seconds: float) -> str:
    if seconds < 60:
        return f"{round(seconds)}s"
    minutes, remaining = divmod(round(seconds), 60)
    if minutes < 60:
        return f"{minutes}m {remaining}s"
    hours, minutes = divmod(minutes, 60)
    return f"{hours}h {minutes}m"


def md(value: str) -> str:
    return str(value).replace("|", "\\|").replace("\n", " ")


def escape(value: str) -> str:
    return html.escape(str(value), quote=True)


if __name__ == "__main__":
    raise SystemExit(main())
