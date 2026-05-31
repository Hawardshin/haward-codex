from __future__ import annotations

import argparse
import html
import json
import sys
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
        root / "_ops" / "coordination" / "board.ko.md": render_markdown(status, "ko"),
        root / "_ops" / "coordination" / "board.en.md": render_markdown(status, "en"),
        root / "_ops" / "coordination" / "board.html": render_html(status),
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


def render_markdown(status: JsonMap, language: str) -> str:
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

    lines.extend(["", f"## {labels['tasks']}", "", "| ID | Title | Project | Status | Agent | Next Action |", "| --- | --- | --- | --- | --- | --- |"])
    for task in status["tasks"]:
        lines.append(
            "| {id} | {title} | {project} | {status} | {agent} | {next_action} |".format(
                id=md(task.get("id", "")),
                title=md(task.get("title", "")),
                project=md(task.get("project", "")),
                status=md(task.get("status", "")),
                agent=md(task.get("agent", "")),
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


def render_html(status: JsonMap) -> str:
    agents = "\n".join(render_agent_card(agent) for agent in status["agents"])
    tasks = "\n".join(render_task_row(task) for task in status["tasks"])
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


def render_task_row(task: JsonMap) -> str:
    return f"""<tr>
              <td>{escape(task.get("id", ""))}</td>
              <td>{escape(task.get("title", ""))}</td>
              <td>{escape(task.get("status", ""))}</td>
              <td>{escape(task.get("agent", ""))}</td>
              <td>{escape(task.get("next_action", ""))}</td>
            </tr>"""


def md(value: str) -> str:
    return str(value).replace("|", "\\|").replace("\n", " ")


def escape(value: str) -> str:
    return html.escape(str(value), quote=True)


if __name__ == "__main__":
    raise SystemExit(main())
