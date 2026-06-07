import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import * as ts from "typescript";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const testProjectRoot = path.resolve(__dirname, "..", "..");

export async function importTypeScriptModule(relativePath, options = {}) {
  const projectRoot = options.projectRoot || testProjectRoot;
  const filePath = path.join(projectRoot, relativePath);
  const moduleUrl = await compileTypeScriptModuleToDataUrl(filePath, projectRoot, new Map());
  return import(moduleUrl);
}

async function compileTypeScriptModuleToDataUrl(filePath, projectRoot, cache) {
  const normalizedPath = path.normalize(filePath);
  const cached = cache.get(normalizedPath);
  if (cached) {
    return cached;
  }

  const source = fs.readFileSync(filePath, "utf8");
  const result = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022
    },
    fileName: filePath,
    reportDiagnostics: true
  });
  const errors = (result.diagnostics || []).filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error);
  const relativePath = path.relative(projectRoot, filePath);
  assert.deepEqual(
    errors.map((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n")),
    [],
    `${relativePath} should transpile for behavior tests`
  );

  const rewrittenOutput = await rewriteRelativeModuleSpecifiers(result.outputText, filePath, projectRoot, cache);
  const dataUrl = `data:text/javascript;base64,${Buffer.from(rewrittenOutput).toString("base64")}`;
  cache.set(normalizedPath, dataUrl);
  return dataUrl;
}

async function rewriteRelativeModuleSpecifiers(outputText, filePath, projectRoot, cache) {
  const modulePattern = /((?:import|export)\s+(?:[^"']*?\s+from\s+)?["'])(\.{1,2}\/[^"']+)(["'])/g;
  let rewritten = "";
  let cursor = 0;

  for (const match of outputText.matchAll(modulePattern)) {
    const [fullMatch, prefix, specifier, suffix] = match;
    const matchIndex = match.index ?? 0;
    const resolvedUrl = await resolveLocalModuleSpecifier(specifier, filePath, projectRoot, cache);
    rewritten += outputText.slice(cursor, matchIndex);
    rewritten += `${prefix}${resolvedUrl}${suffix}`;
    cursor = matchIndex + fullMatch.length;
  }

  return rewritten + outputText.slice(cursor);
}

async function resolveLocalModuleSpecifier(specifier, filePath, projectRoot, cache) {
  const basePath = path.resolve(path.dirname(filePath), specifier);
  const candidates = [
    basePath,
    `${basePath}.ts`,
    `${basePath}.tsx`,
    `${basePath}.mjs`,
    `${basePath}.js`,
    path.join(basePath, "index.ts"),
    path.join(basePath, "index.tsx"),
    path.join(basePath, "index.mjs"),
    path.join(basePath, "index.js")
  ];

  const resolvedPath = candidates.find((candidate) => fs.existsSync(candidate));
  if (!resolvedPath) {
    return specifier;
  }

  if (/\.tsx?$/.test(resolvedPath)) {
    return compileTypeScriptModuleToDataUrl(resolvedPath, projectRoot, cache);
  }

  return pathToFileURL(resolvedPath).href;
}
