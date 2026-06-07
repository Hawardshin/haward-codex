import assert from "node:assert/strict";
import test from "node:test";
import { importTypeScriptModule } from "./utils/import-type-script-module.mjs";

const sourceDocuments = await importTypeScriptModule("components/workbench/source-editor/sourceDocuments.ts");
const sourceDraftActions = await importTypeScriptModule("components/workbench/source-editor/sourceDraftActions.ts");
const sourceDrafts = await importTypeScriptModule("components/workbench/source-editor/sourceDrafts.ts");

function makeTextFile(overrides = {}) {
  return {
    relativePath: "src/app.ts",
    content: "base",
    sizeBytes: 4,
    maxSizeBytes: 64,
    ...overrides
  };
}

function makeDraft(overrides = {}) {
  return {
    relativePath: "src/app.ts",
    baseContent: "base",
    content: "base",
    sizeBytes: 4,
    maxSizeBytes: 64,
    loadedAt: "2026-06-07T00:00:00.000Z",
    ...overrides
  };
}

function makeReport(relativePath, sizeBytes = 10) {
  return {
    relativePath,
    sizeBytes,
    backupPath: `.awp-backups/${relativePath}`,
    status: "saved"
  };
}

test("source document helpers render deterministic starter and patch context text", () => {
  assert.match(sourceDocuments.renderAgentsMdStarter("codex"), /- Workspace: codex/);
  assert.match(sourceDocuments.renderAgentsMdStarter("codex"), /## First Task Prompt/);
  assert.equal(sourceDocuments.formatSourceDiffLine(null), "not computed");
  assert.equal(
    sourceDocuments.formatSourceDiffLine({ dirty: true, addedLines: 2, removedLines: 1, changedLines: 3, preview: [] }),
    "+2 / -1 / 3 changed"
  );

  assert.equal(
    sourceDocuments.buildSourcePatchContext({
      relativePath: "src/app.ts",
      profileLabel: "Source Patch",
      templateLabel: "Spec Section",
      dirty: true,
      diff: { dirty: true, addedLines: 2, removedLines: 1, changedLines: 3, preview: [] },
      draftContent: "const value = 1;"
    }),
    [
      "Platform Source Patch Context",
      "Path: src/app.ts",
      "Profile: Source Patch",
      "Template: Spec Section",
      "Dirty: yes",
      "Diff: +2 / -1 / 3 changed",
      "Gate: workspace-scoped backup on save",
      "",
      "--- draft ---",
      "const value = 1;"
    ].join("\n")
  );
});

test("source draft helpers keep dirty state and active draft transitions deterministic", () => {
  const file = makeTextFile();
  const entry = sourceDrafts.createSourceDraftEntry(file, "draft", "2026-06-07T01:00:00.000Z");
  assert.deepEqual(entry, {
    relativePath: "src/app.ts",
    baseContent: "base",
    content: "draft",
    sizeBytes: 4,
    maxSizeBytes: 64,
    loadedAt: "2026-06-07T01:00:00.000Z"
  });
  assert.equal(sourceDrafts.isSourceDraftEntryDirty(entry), true);
  assert.equal(sourceDrafts.isCurrentSourceDraftDirty(null, file, "base"), false);
  assert.equal(sourceDrafts.isCurrentSourceDraftDirty(null, file, "changed"), true);
  assert.equal(sourceDrafts.findCurrentSourceDraftEntry({ "src/app.ts": entry }, file), entry);

  const map = {
    "src/b.ts": makeDraft({ relativePath: "src/b.ts", content: "changed" }),
    "src/a.ts": makeDraft({ relativePath: "src/a.ts" })
  };
  assert.deepEqual(
    sourceDrafts.listOpenSourceDraftEntries(map).map((draft) => draft.relativePath),
    ["src/a.ts", "src/b.ts"]
  );
  assert.deepEqual(
    sourceDrafts.listDirtySourceDraftEntries(sourceDrafts.listOpenSourceDraftEntries(map)).map((draft) => draft.relativePath),
    ["src/b.ts"]
  );
  assert.deepEqual(Array.from(sourceDrafts.buildDirtySourcePathSet([map["src/b.ts"]])), ["src/b.ts"]);
});

test("source draft save helpers dedupe save reports and preserve visible content", () => {
  const file = makeTextFile();
  const draft = makeDraft({ content: "saved content" });
  const report = makeReport("src/app.ts", 13);

  assert.deepEqual(sourceDrafts.applySourceDraftSaveReport(draft, report), {
    ...draft,
    baseContent: "saved content",
    content: "saved content",
    sizeBytes: 13,
    lastSavedBackupPath: ".awp-backups/src/app.ts",
    status: "saved"
  });

  assert.deepEqual(sourceDrafts.upsertSavedSourceDraft({ "src/app.ts": draft }, file, report, "saved content", "visible newer"), {
    "src/app.ts": {
      ...draft,
      baseContent: "saved content",
      content: "visible newer",
      sizeBytes: 13,
      lastSavedBackupPath: ".awp-backups/src/app.ts",
      status: "saved"
    }
  });

  const currentReports = Array.from({ length: 9 }, (_, index) => makeReport(`src/${index}.ts`, index));
  assert.deepEqual(
    sourceDrafts.mergeSourceSaveReports(currentReports, [makeReport("src/2.ts", 22), makeReport("src/new.ts", 99)]),
    [
      makeReport("src/2.ts", 22),
      makeReport("src/new.ts", 99),
      makeReport("src/0.ts", 0),
      makeReport("src/1.ts", 1),
      makeReport("src/3.ts", 3),
      makeReport("src/4.ts", 4),
      makeReport("src/5.ts", 5),
      makeReport("src/6.ts", 6)
    ]
  );
});

test("source draft action helpers keep open save and close transitions deterministic", () => {
  const file = makeTextFile();
  const openState = sourceDraftActions.buildOpenSourceFileState(file);
  assert.equal(openState.draftEntry.relativePath, "src/app.ts");
  assert.equal(openState.draftEntry.baseContent, "base");
  assert.deepEqual(openState.visibleState, {
    sourceFile: file,
    sourceDraft: "base",
    activeSourcePath: "src/app.ts",
    selectedSourcePath: "src/app.ts",
    sourcePathInput: "src/app.ts",
    sourceCopyNotice: "",
    writeReport: null,
    workbenchView: "editor"
  });

  const savedDraft = makeDraft({
    content: "saved",
    lastSavedBackupPath: ".awp-backups/src/app.ts",
    status: "saved",
    sizeBytes: 7
  });
  assert.deepEqual(sourceDraftActions.sourceTextFileFromDraftEntry(savedDraft), {
    relativePath: "src/app.ts",
    content: "base",
    sizeBytes: 7,
    maxSizeBytes: 64
  });
  assert.deepEqual(sourceDraftActions.sourceWriteReportFromDraftEntry(savedDraft), {
    relativePath: "src/app.ts",
    sizeBytes: 7,
    backupPath: ".awp-backups/src/app.ts",
    status: "saved"
  });

  const report = makeReport("src/app.ts", 12);
  const saveResult = sourceDraftActions.buildSourceFileSaveResult({
    fileToSave: file,
    report,
    savedContent: "saved",
    activePathAfterSave: "src/app.ts",
    nextDraftContent: "saved visible"
  });
  assert.deepEqual(saveResult, {
    activeFileStillVisible: true,
    sourceFile: {
      ...file,
      content: "saved",
      sizeBytes: 12
    },
    sourceDraft: "saved visible",
    writeReport: report,
    sourceCopyNotice: "",
    workbenchView: "results"
  });
  assert.deepEqual(
    sourceDraftActions.buildSourceFileSaveDrafts(
      { "src/app.ts": makeDraft({ content: "dirty" }) },
      {
        fileToSave: file,
        report,
        savedContent: "saved",
        activeFileStillVisible: saveResult.activeFileStillVisible,
        nextDraftContent: saveResult.sourceDraft
      }
    )["src/app.ts"],
    {
      ...makeDraft({ content: "dirty" }),
      baseContent: "saved",
      content: "saved visible",
      sizeBytes: 12,
      lastSavedBackupPath: ".awp-backups/src/app.ts",
      status: "saved"
    }
  );

  const closeResult = sourceDraftActions.buildCloseSourceDraftResult({
    drafts: {
      "src/app.ts": makeDraft({ relativePath: "src/app.ts" }),
      "src/next.ts": makeDraft({ relativePath: "src/next.ts", content: "next draft" })
    },
    openEntries: [
      makeDraft({ relativePath: "src/app.ts" }),
      makeDraft({ relativePath: "src/next.ts", content: "next draft" })
    ],
    activeFile: file,
    relativePath: "src/app.ts"
  });
  assert.equal(closeResult.closingActiveDraft, true);
  assert.deepEqual(Object.keys(closeResult.sourceDrafts), ["src/next.ts"]);
  assert.deepEqual(closeResult.visibleState, {
    sourceFile: {
      relativePath: "src/next.ts",
      content: "base",
      sizeBytes: 4,
      maxSizeBytes: 64
    },
    sourceDraft: "next draft",
    activeSourcePath: "src/next.ts",
    selectedSourcePath: "src/next.ts",
    sourcePathInput: "src/next.ts",
    sourceCopyNotice: "",
    writeReport: null,
    workbenchView: "editor"
  });
});
