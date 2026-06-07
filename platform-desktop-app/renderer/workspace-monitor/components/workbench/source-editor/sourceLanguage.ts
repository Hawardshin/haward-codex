const monacoLanguageByExtension: Record<string, string> = {
  c: "c",
  cc: "cpp",
  cpp: "cpp",
  cs: "csharp",
  css: "css",
  go: "go",
  h: "cpp",
  hpp: "cpp",
  html: "html",
  java: "java",
  js: "javascript",
  jsx: "javascript",
  json: "json",
  jsonc: "json",
  kt: "kotlin",
  md: "markdown",
  mjs: "javascript",
  py: "python",
  rs: "rust",
  scss: "scss",
  sh: "shell",
  sql: "sql",
  ts: "typescript",
  tsx: "typescript",
  toml: "toml",
  txt: "plaintext",
  yaml: "yaml",
  yml: "yaml"
};

export function monacoLanguageFromPath(relativePath: string) {
  const extension = relativePath.split(".").pop()?.toLowerCase() || "";
  return monacoLanguageByExtension[extension] || "plaintext";
}
