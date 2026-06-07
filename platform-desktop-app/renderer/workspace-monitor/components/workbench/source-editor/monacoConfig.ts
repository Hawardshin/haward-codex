import type { editor } from "monaco-editor";

export const monacoEditorOptions: editor.IStandaloneEditorConstructionOptions = {
  automaticLayout: true,
  bracketPairColorization: { enabled: true },
  copyWithSyntaxHighlighting: true,
  cursorBlinking: "smooth",
  formatOnPaste: true,
  formatOnType: true,
  fontFamily: "\"SFMono-Regular\", Consolas, \"Liberation Mono\", monospace",
  fontSize: 13,
  glyphMargin: true,
  guides: { bracketPairs: true, indentation: true },
  lineHeight: 22,
  minimap: { enabled: false },
  mouseWheelZoom: true,
  padding: { bottom: 14, top: 12 },
  renderLineHighlight: "all",
  renderWhitespace: "selection",
  rulers: [100, 120],
  scrollBeyondLastLine: false,
  smoothScrolling: true,
  stickyScroll: { enabled: true },
  tabSize: 2,
  wordWrap: "on",
  wordWrapColumn: 120,
  wrappingIndent: "same"
};

export const monacoReadOnlyOptions: editor.IStandaloneEditorConstructionOptions = {
  ...monacoEditorOptions,
  domReadOnly: true,
  minimap: { enabled: false },
  readOnly: true
};

export const monacoDiffEditorOptions: editor.IStandaloneDiffEditorConstructionOptions = {
  automaticLayout: true,
  diffAlgorithm: "advanced",
  enableSplitViewResizing: true,
  originalEditable: false,
  readOnly: true,
  renderSideBySide: true,
  scrollBeyondLastLine: false
};

export const platformMonacoTheme = "agent-platform-workbench";

export const definePlatformMonacoTheme = (monaco: typeof import("monaco-editor")) => {
  monaco.editor.defineTheme(platformMonacoTheme, {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "8ea6b8" },
      { token: "keyword", foreground: "7dd3fc" },
      { token: "string", foreground: "b7e4c7" },
      { token: "number", foreground: "f4a261" }
    ],
    colors: {
      "editor.background": "#101923",
      "editor.foreground": "#d7e0ea",
      "editor.lineHighlightBackground": "#172435",
      "editorLineNumber.foreground": "#637386",
      "editorLineNumber.activeForeground": "#d7e0ea",
      "editorCursor.foreground": "#9bd5ff",
      "editor.selectionBackground": "#245173",
      "editorIndentGuide.background1": "#263546",
      "editorIndentGuide.activeBackground1": "#55677a",
      "minimap.background": "#101923"
    }
  });
};
