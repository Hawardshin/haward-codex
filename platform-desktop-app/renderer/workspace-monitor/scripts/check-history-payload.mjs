import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const snapshotPath = path.join(projectRoot, "src", "generated", "workspace-snapshot.json");
const adminHistoryIndexPath = path.join(projectRoot, "public", "admin-history-index.json");
const maxDocumentJsonBytes = 1_900_000;
const maxInlineHistoryDocuments = 96;
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

if (!fs.existsSync(adminHistoryIndexPath)) {
  throw new Error("Generated admin history index is missing. Run `corepack pnpm --filter workspace-monitor collect` first.");
}

const adminHistoryIndex = JSON.parse(fs.readFileSync(adminHistoryIndexPath, "utf8"));
const adminHistoryDocuments = Array.isArray(adminHistoryIndex.documents) ? adminHistoryIndex.documents : [];
const adminHistoryDays = Array.isArray(adminHistoryIndex.historyDays) ? adminHistoryIndex.historyDays : [];
if (adminHistoryIndex?.migration?.status !== "migrated_to_lazy_admin_index") {
  throw new Error("Admin history index must mark records as migrated_to_lazy_admin_index.");
}
const duplicatedDayDocuments = adminHistoryDays.filter((day) => Array.isArray(day.documents) && day.documents.length > 0);
if (duplicatedDayDocuments.length > 0) {
  throw new Error("Admin history index day groups must not duplicate document lists; build day documents client-side.");
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
if (historyDocuments.length > maxInlineHistoryDocuments) {
  throw new Error(
    `Inline history documents must stay at or below ${maxInlineHistoryDocuments}. Found ${historyDocuments.length}.`
  );
}

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

const oversizedAdminHistoryDocuments = adminHistoryDocuments.filter(
  (document) => historyCategories.has(document.category) && String(document.html || "").length > maxHistoryHtmlChars
);
if (oversizedAdminHistoryDocuments.length > 0) {
  throw new Error(
    `Admin history index must use bounded previews. Oversized entries: ${oversizedAdminHistoryDocuments
      .slice(0, 8)
      .map((document) => document.path)
      .join(", ")}`
  );
}

if ((snapshot.adminHistory?.summary?.documents || 0) !== adminHistoryDocuments.length) {
  throw new Error("Snapshot adminHistory summary must match generated admin-history-index.json.");
}

console.log(
  JSON.stringify(
    {
      status: "history_payload_ok",
      maxDocumentJsonBytes,
      documentJsonBytes,
      documents: documents.length,
      historyDocuments: historyDocuments.length,
      adminHistoryDocuments: adminHistoryDocuments.length,
      adminHistoryIndexBytes: fs.statSync(adminHistoryIndexPath).size
    },
    null,
    2
  )
);
