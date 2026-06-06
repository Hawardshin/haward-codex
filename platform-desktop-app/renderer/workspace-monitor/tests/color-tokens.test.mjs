import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const css = fs.readFileSync(path.join(projectRoot, "app", "globals.css"), "utf8");

function readBlock(selector) {
  const start = css.indexOf(`${selector} {`);
  assert.notEqual(start, -1, `missing ${selector} block`);
  let depth = 0;
  for (let index = start; index < css.length; index += 1) {
    const char = css[index];
    if (char === "{") {
      depth += 1;
    } else if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return css.slice(start, index + 1);
      }
    }
  }
  throw new Error(`unterminated ${selector} block`);
}

function readTokens(selector) {
  return Object.fromEntries(
    Array.from(readBlock(selector).matchAll(/--([a-z0-9-]+):\s*([^;]+);/gi)).map(([, name, value]) => [
      name,
      value.trim()
    ])
  );
}

function resolveToken(tokens, name, seen = new Set()) {
  assert.ok(tokens[name], `missing --${name}`);
  if (seen.has(name)) {
    throw new Error(`cyclic token --${name}`);
  }
  const value = tokens[name];
  const varMatch = value.match(/^var\(--([a-z0-9-]+)\)$/i);
  if (varMatch) {
    seen.add(name);
    return resolveToken(tokens, varMatch[1], seen);
  }
  return value;
}

function hexToRgb(value) {
  assert.match(value, /^#[0-9a-f]{6}$/i, `expected hex color, got ${value}`);
  return {
    r: Number.parseInt(value.slice(1, 3), 16) / 255,
    g: Number.parseInt(value.slice(3, 5), 16) / 255,
    b: Number.parseInt(value.slice(5, 7), 16) / 255
  };
}

function channelToLinear(channel) {
  return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  return 0.2126 * channelToLinear(r) + 0.7152 * channelToLinear(g) + 0.0722 * channelToLinear(b);
}

function contrastRatio(foreground, background) {
  const first = luminance(foreground);
  const second = luminance(background);
  const lighter = Math.max(first, second);
  const darker = Math.min(first, second);
  return (lighter + 0.05) / (darker + 0.05);
}

function assertContrast(tokens, foreground, background, minimum = 4.5) {
  const foregroundValue = resolveToken(tokens, foreground);
  const backgroundValue = resolveToken(tokens, background);
  const ratio = contrastRatio(foregroundValue, backgroundValue);
  assert.ok(
    ratio >= minimum,
    `--${foreground} on --${background} contrast ${ratio.toFixed(2)} is below ${minimum}`
  );
}

test("light color tokens keep readable foreground contrast", () => {
  const tokens = readTokens(":root");

  assertContrast(tokens, "text", "bg");
  assertContrast(tokens, "text", "surface");
  assertContrast(tokens, "text-secondary", "surface");
  assertContrast(tokens, "status-success-text", "status-success-bg");
  assertContrast(tokens, "status-info-text", "status-info-bg");
  assertContrast(tokens, "status-warning-text", "status-warning-bg");
  assertContrast(tokens, "status-danger-text", "status-danger-bg");
  assertContrast(tokens, "control-selected-fg", "control-selected-bg");
  assertContrast(tokens, "action-primary-fg", "action-primary-bg");
});

test("dark color tokens keep readable foreground contrast", () => {
  const tokens = {
    ...readTokens(":root"),
    ...readTokens(".desktop-app-root.theme-dark")
  };

  assertContrast(tokens, "text", "bg");
  assertContrast(tokens, "text", "surface");
  assertContrast(tokens, "text-secondary", "surface");
  assertContrast(tokens, "terminal-fg", "terminal-bg");
  assertContrast(tokens, "terminal-muted", "terminal-bg");
  assertContrast(tokens, "status-success-text", "status-success-bg");
  assertContrast(tokens, "status-info-text", "status-info-bg");
  assertContrast(tokens, "status-warning-text", "status-warning-bg");
  assertContrast(tokens, "status-danger-text", "status-danger-bg");
  assertContrast(tokens, "control-selected-fg", "control-selected-bg");
  assertContrast(tokens, "action-primary-fg", "action-primary-bg");
});

test("scroll and surface color tokens keep scope boundaries understated", () => {
  const lightTokens = readTokens(":root");
  const darkTokens = {
    ...readTokens(":root"),
    ...readTokens(".desktop-app-root.theme-dark")
  };

  for (const tokens of [lightTokens, darkTokens]) {
    assert.ok(tokens["scroll-scope-bg"], "missing --scroll-scope-bg");
    assert.ok(tokens["scroll-scope-border"], "missing --scroll-scope-border");
    assert.ok(tokens["scrollbar-track"], "missing --scrollbar-track");
    assert.ok(tokens["scrollbar-thumb"], "missing --scrollbar-thumb");
    assert.ok(tokens["scrollbar-thumb-hover"], "missing --scrollbar-thumb-hover");
  }

  assert.equal(lightTokens["scrollbar-thumb"], "#b5c2d1");
  assert.equal(darkTokens["scrollbar-thumb"], "#526276");
});
