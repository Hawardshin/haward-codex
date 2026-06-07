import type { SourceDiffSummary } from "@/types/desktop";

export function buildSourceDiffSummary(original: string, draft: string): SourceDiffSummary {
  const before = original.split(/\r?\n/);
  const after = draft.split(/\r?\n/);
  const max = Math.max(before.length, after.length);
  const preview: SourceDiffSummary["preview"] = [];
  let addedLines = 0;
  let removedLines = 0;
  let changedLines = 0;

  for (let index = 0; index < max; index += 1) {
    const beforeLine = before[index];
    const afterLine = after[index];
    if (beforeLine === afterLine) {
      continue;
    }
    if (beforeLine === undefined) {
      addedLines += 1;
    } else if (afterLine === undefined) {
      removedLines += 1;
    } else {
      changedLines += 1;
    }
    if (preview.length < 8) {
      preview.push({
        line: index + 1,
        before: beforeLine ?? "",
        after: afterLine ?? ""
      });
    }
  }

  return {
    dirty: addedLines + removedLines + changedLines > 0,
    addedLines,
    removedLines,
    changedLines,
    preview
  };
}
