import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const snapshotPath = path.join(projectRoot, "src", "generated", "workspace-snapshot.json");
const maxDocumentJsonBytes = 2_800_000;
const maxHistoryHtmlChars = 3_600;
const historyCategories = new Set([
  "daily-history",
  "evaluation",
  "intent-feature-map",
  "plan",
  "request-trace",
  "user-request",
  "web-search",
  "work-timing",
  "work-summary"
]);

if (!fs.existsSync(snapshotPath)) {
  throw new Error("Generated workspace snapshot is missing. Run `corepack pnpm --filter workspace-monitor collect` first.");
}

const snapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));
const documents = Array.isArray(snapshot.documents) ? snapshot.documents : [];
const documentJsonBytes = Buffer.byteLength(JSON.stringify(documents), "utf8");
if (documentJsonBytes > maxDocumentJsonBytes) {
  throw new Error(
    `Document snapshot payload is ${documentJsonBytes} bytes, over the ${maxDocumentJsonBytes} byte budget.`
  );
}

const oversizedHistoryDocuments = documents.filter(
  (document) => historyCategories.has(document.category) && String(document.html || "").length > maxHistoryHtmlChars
);
if (oversizedHistoryDocuments.length > 0) {
  throw new Error(
    `History documents must use bounded admin previews. Oversized entries: ${oversizedHistoryDocuments
      .slice(0, 8)
      .map((document) => document.path)
      .join(", ")}`
  );
}

const historyDocuments = documents.filter((document) => historyCategories.has(document.category));
const missingPreviewMetadata = historyDocuments.filter(
  (document) => document.previewMode !== "admin-summary" || typeof document.sourceBytes !== "number"
);
if (missingPreviewMetadata.length > 0) {
  throw new Error(
    `History documents must include previewMode=admin-summary and sourceBytes. Missing entries: ${missingPreviewMetadata
      .slice(0, 8)
      .map((document) => document.path)
      .join(", ")}`
  );
}

console.log(
  JSON.stringify(
    {
      status: "history_payload_ok",
      maxDocumentJsonBytes,
      documentJsonBytes,
      documents: documents.length,
      historyDocuments: historyDocuments.length
    },
    null,
    2
  )
);
