import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const chunkDir = path.join(projectRoot, "out", "_next", "static", "chunks");
const indexHtmlPath = path.join(projectRoot, "out", "index.html");
const snapshotModulePath = path.join(projectRoot, "lib", "snapshot.ts");
const maxInitialChunkBytes = 1_000_000;

function main() {
  if (!fs.existsSync(chunkDir)) {
    throw new Error("Static chunk directory is missing. Run `corepack pnpm --filter workspace-monitor build` first.");
  }
  if (!fs.existsSync(indexHtmlPath)) {
    throw new Error("Static index.html is missing. Run `corepack pnpm --filter workspace-monitor build` first.");
  }

  const chunks = fs
    .readdirSync(chunkDir)
    .filter((file) => file.endsWith(".js"))
    .map((file) => {
      const absolutePath = path.join(chunkDir, file);
      return {
        file,
        bytes: fs.statSync(absolutePath).size
      };
    })
    .sort((left, right) => right.bytes - left.bytes);

  const largest = chunks[0];
  if (!largest) {
    throw new Error("No JavaScript chunks were found in the static build output.");
  }
  if (largest.bytes > maxInitialChunkBytes) {
    throw new Error(
      `Largest JavaScript chunk ${largest.file} is ${largest.bytes} bytes, over the ${maxInitialChunkBytes} byte budget.`
    );
  }

  const snapshotModule = fs.readFileSync(snapshotModulePath, "utf8");
  if (snapshotModule.includes("workspace-snapshot.json") || snapshotModule.includes("src/generated")) {
    throw new Error("lib/snapshot.ts must not statically import the generated workspace snapshot.");
  }

  const indexHtml = fs.readFileSync(indexHtmlPath, "utf8");
  if (/\b(?:src|href)=["']\/_next\//.test(indexHtml)) {
    throw new Error("Static build must use relative _next asset paths for packaged desktop and subpath contexts.");
  }

  const report = {
    status: "within_budget",
    staticAssetPaths: "relative",
    maxInitialChunkBytes,
    largestChunk: largest,
    chunkCount: chunks.length
  };
  console.log(JSON.stringify(report, null, 2));
}

main();
