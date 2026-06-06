import assert from "node:assert/strict";
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const require = createRequire(import.meta.url);

const layout = fs.readFileSync(path.join(projectRoot, "app", "layout.tsx"), "utf8");
const css = fs.readFileSync(path.join(projectRoot, "app", "globals.css"), "utf8");
const packageJson = JSON.parse(fs.readFileSync(path.join(projectRoot, "package.json"), "utf8"));

test("layout imports the bundled Korean variable font subset", () => {
  assert.match(
    layout,
    /import "pretendard\/dist\/web\/variable\/pretendardvariable-dynamic-subset\.css";/
  );
});

test("font stack prioritizes bundled Pretendard before system fallbacks", () => {
  assert.match(
    css,
    /--font-family-sans:\s*"Pretendard Variable", Pretendard, "Noto Sans KR"/
  );
  assert.match(css, /system-ui, sans-serif;/);
});

test("Pretendard package provides Korean dynamic subset font faces", () => {
  assert.equal(packageJson.dependencies.pretendard, "1.3.9");
  assert.equal(packageJson.dependencies["@fontsource/pretendard"], undefined);

  const packagePath = require.resolve("pretendard/package.json", { paths: [projectRoot] });
  const packageRoot = path.dirname(packagePath);
  const subsetCssPath = path.join(
    packageRoot,
    "dist",
    "web",
    "variable",
    "pretendardvariable-dynamic-subset.css"
  );
  const subsetCss = fs.readFileSync(subsetCssPath, "utf8");

  assert.match(subsetCss, /font-family: 'Pretendard Variable';/);
  assert.match(subsetCss, /font-weight: 45 920;/);
  assert.match(subsetCss, /unicode-range:/);
  assert.match(subsetCss, /woff2-dynamic-subset\/PretendardVariable\.subset\.\d+\.woff2/);
});

test("base typography keeps readable body text defaults", () => {
  assert.match(css, /body \{[\s\S]*?line-height: 1\.5;/);
  assert.match(css, /text-rendering: optimizeLegibility;/);
  assert.match(css, /-webkit-font-smoothing: antialiased;/);
  assert.match(css, /-moz-osx-font-smoothing: grayscale;/);
  assert.doesNotMatch(css, /letter-spacing:\s*-/);
});

test("text wrapping contract separates prose, controls, and long tokens", () => {
  assert.match(css, /--text-measure: 68ch;/);
  assert.match(css, /\.desktop-app-root \{[\s\S]*?line-break: strict;/);
  assert.match(
    css,
    /\.desktop-app-root :where\(h1, h2, h3, h4, h5, h6, p, li, dd, blockquote, figcaption\) \{[\s\S]*?overflow-wrap: var\(--text-natural-wrap\);[\s\S]*?word-break: keep-all;/
  );
  assert.match(
    css,
    /\.desktop-app-root :where\(p, li, dd, blockquote, figcaption\) \{[\s\S]*?max-width: min\(100%, var\(--text-measure\)\);[\s\S]*?text-wrap: pretty;/
  );
  assert.match(
    css,
    /\.desktop-app-root :where\(code, kbd, samp, \.path\) \{[\s\S]*?overflow-wrap: var\(--text-long-token-wrap\);[\s\S]*?word-break: normal;/
  );
  assert.match(
    css,
    /\.desktop-app-root :where\(button > span, button > strong, button > small, button > em, button > kbd\) \{[\s\S]*?max-width: 100%;[\s\S]*?overflow: hidden;[\s\S]*?text-overflow: ellipsis;[\s\S]*?white-space: nowrap;[\s\S]*?overflow-wrap: normal;[\s\S]*?word-break: keep-all;/
  );
});
