import fs from "node:fs";
import path from "node:path";

const IGNORE_DIRS = new Set([".git", ".next", "node_modules", "out", "__pycache__", ".pytest_cache", "_private", "outputs"]);

export function collectIntentFeatureMap(repoRoot) {
  const sources = collectIntentFeatureMapSources(repoRoot);
  const selectedSource = sources[0];
  if (!selectedSource) {
    return emptyIntentFeatureMap();
  }

  const { sourcePath, absolutePath, sourceDate, updatedAt } = selectedSource;
  const content = fs.readFileSync(absolutePath, "utf8");
  const summarySection = extractHeadingSection(content, "## 요약 결론");
  const themeRows = parseMarkdownTableRows(summarySection);
  const themes = themeRows
    .filter((row) => row.length >= 4 && /^\d+\./.test(row[0]))
    .map((row) => {
      const axis = stripMarkdown(row[0]);
      return {
        id: slugify(axis),
        label: axis.replace(/^\d+\.\s*/, ""),
        intent: stripMarkdown(row[1]),
        implemented: stripMarkdown(row[2]),
        nextCandidate: stripMarkdown(row[3])
      };
    });

  const roadmap = {
    now: parseRoadmapRows(extractHeadingSection(content, "### Now")),
    next: parseRoadmapRows(extractHeadingSection(content, "### Next")),
    later: parseRoadmapRows(extractHeadingSection(content, "### Later"))
  };
  const sourceLimits = extractBulletItems(extractHeadingSection(content, "## 출처와 한계"));
  const totalIntents = Number(content.match(/총 구조화 의도:\s*(\d+)개/)?.[1] || 0);

  return {
    sourcePath,
    summary: {
      totalIntents,
      totalThemes: themes.length,
      now: roadmap.now.length,
      next: roadmap.next.length,
      later: roadmap.later.length,
      sourceDate,
      updatedAt,
      availableMaps: sources.length
    },
    themes,
    roadmap,
    sourceLimits
  };
}

export function emptyIntentFeatureMap(sourcePath = "") {
  return {
    sourcePath,
    summary: {
      totalIntents: 0,
      totalThemes: 0,
      now: 0,
      next: 0,
      later: 0,
      sourceDate: "",
      updatedAt: "",
      availableMaps: 0
    },
    themes: [],
    roadmap: {
      now: [],
      next: [],
      later: []
    },
    sourceLimits: []
  };
}

function collectIntentFeatureMapSources(repoRoot) {
  const sourceRoot = path.join(repoRoot, "_history", "intent-feature-maps");
  return walkFiles(sourceRoot)
    .filter((filePath) => /\.ko\.md$/i.test(filePath))
    .map((filePath) => {
      const sourcePath = toPosix(path.relative(repoRoot, filePath));
      const stats = fs.statSync(filePath);
      return {
        absolutePath: filePath,
        sourcePath,
        sourceDate: extractHistoryDate(sourcePath),
        updatedAt: stats.mtime.toISOString()
      };
    })
    .sort(
      (left, right) =>
        right.sourceDate.localeCompare(left.sourceDate) ||
        right.updatedAt.localeCompare(left.updatedAt) ||
        right.sourcePath.localeCompare(left.sourcePath)
    );
}

function parseRoadmapRows(section) {
  return parseMarkdownTableRows(section)
    .filter((row) => row.length >= 3 && row[0] !== "기능 후보")
    .map((row) => ({
      feature: stripMarkdown(row[0]),
      reason: stripMarkdown(row[1]),
      dependency: stripMarkdown(row[2])
    }))
    .filter((row) => row.feature);
}

function parseMarkdownTableRows(section) {
  const rows = [];
  for (const line of section.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!/^\|.+\|\s*$/.test(trimmed)) {
      continue;
    }
    const cells = trimmed
      .split("|")
      .slice(1, -1)
      .map((cell) => cell.trim());
    if (cells.every((cell) => /^:?-{2,}:?$/.test(cell))) {
      continue;
    }
    rows.push(cells);
  }
  return rows.slice(1);
}

function extractHeadingSection(content, heading) {
  const start = content.indexOf(heading);
  if (start === -1) {
    return "";
  }
  const headingLevel = heading.match(/^#+/)?.[0].length || 1;
  const afterHeading = content.slice(start + heading.length);
  const nextHeadingPattern = new RegExp(`\\n#{1,${headingLevel}}\\s+`);
  const nextMatch = afterHeading.search(nextHeadingPattern);
  return nextMatch === -1 ? afterHeading : afterHeading.slice(0, nextMatch);
}

function extractBulletItems(section) {
  return section
    .split(/\r?\n/)
    .map((line) => line.trim().match(/^[-*]\s+(.+)$/)?.[1] || "")
    .filter(Boolean)
    .map((line) => stripMarkdown(line));
}

function extractHistoryDate(relativePath) {
  const datedFolderMatch = relativePath.match(/(?:^|\/)(20\d{2})\/(20\d{2}-\d{2}-\d{2})(?:[-./]|$)/);
  if (datedFolderMatch) {
    return datedFolderMatch[2];
  }
  const dateMatch = relativePath.match(/(?:^|\/)(20\d{2}-\d{2}-\d{2})(?:[-./]|$)/);
  return dateMatch ? dateMatch[1] : "";
}

function walkFiles(root) {
  if (!fs.existsSync(root)) {
    return [];
  }
  const files = [];
  const stack = [root];
  while (stack.length) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      if (IGNORE_DIRS.has(entry.name)) {
        continue;
      }
      const entryPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(entryPath);
      } else {
        files.push(entryPath);
      }
    }
  }
  return files;
}

function stripMarkdown(value) {
  return value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_`[\]()-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9가-힣]+/g, "-").replace(/^-|-$/g, "");
}

function toPosix(value) {
  return value.split(path.sep).join("/");
}
