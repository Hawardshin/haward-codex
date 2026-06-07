import type { SourceDiffSummary } from "@/types/desktop";

export function renderAgentsMdStarter(workspaceRootLabel: string) {
  return [
    "# Repository Instructions",
    "",
    "## Project Context",
    "",
    `- Workspace: ${workspaceRootLabel}`,
    "- Treat this folder as the active project unless the user chooses another workspace.",
    "- Read the nearest relevant source, docs, and tests before changing code.",
    "",
    "## Agent Workflow",
    "",
    "- Keep changes scoped to the user request.",
    "- Prefer existing project patterns and local helper APIs.",
    "- Do not inspect secrets, private notes, or unrelated local-only folders.",
    "- Before editing, state the specific files or surfaces you are changing.",
    "",
    "## Validation",
    "",
    "- Run the narrowest relevant check after code changes.",
    "- If a check cannot run, explain the reason and the remaining risk.",
    "- Summarize changed files and validation results before handing off.",
    "",
    "## First Task Prompt",
    "",
    "Use a concrete request, for example:",
    "",
    "```text",
    "Inspect this project, explain what is ready, then make the smallest safe improvement and run the relevant check.",
    "```",
    ""
  ].join("\n");
}

export function formatSourceDiffLine(diff: SourceDiffSummary | null) {
  if (!diff) {
    return "not computed";
  }
  return `+${diff.addedLines} / -${diff.removedLines} / ${diff.changedLines} changed`;
}

export function buildSourcePatchContext(input: {
  relativePath: string;
  profileLabel: string;
  templateLabel: string;
  dirty: boolean;
  diff: SourceDiffSummary | null;
  draftContent: string;
}) {
  return [
    "Platform Source Patch Context",
    `Path: ${input.relativePath}`,
    `Profile: ${input.profileLabel}`,
    `Template: ${input.templateLabel}`,
    `Dirty: ${input.dirty ? "yes" : "no"}`,
    `Diff: ${formatSourceDiffLine(input.diff)}`,
    "Gate: workspace-scoped backup on save",
    "",
    "--- draft ---",
    input.draftContent
  ].join("\n");
}
