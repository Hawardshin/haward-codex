import assert from "node:assert/strict";
import { test } from "node:test";

import { readClipboardText, writeClipboardText } from "../renderer/workspace-monitor/lib/clipboard.mjs";

function mockDocument(execResult = true) {
  const appended = [];
  const field = {
    value: "",
    style: {},
    focused: false,
    selected: false,
    range: null,
    setAttribute(name, value) {
      this[name] = value;
    },
    focus() {
      this.focused = true;
    },
    select() {
      this.selected = true;
    },
    setSelectionRange(start, end) {
      this.range = [start, end];
    }
  };
  return {
    appended,
    field,
    body: {
      appendChild(value) {
        appended.push(value);
      },
      removeChild(value) {
        const index = appended.indexOf(value);
        if (index >= 0) {
          appended.splice(index, 1);
        }
      }
    },
    createElement(name) {
      assert.equal(name, "textarea");
      return field;
    },
    execCommand(command) {
      assert.equal(command, "copy");
      return execResult;
    }
  };
}

test("clipboard utility writes through navigator clipboard when available", async () => {
  const writes = [];
  const copied = await writeClipboardText("hello", {
    navigator: {
      clipboard: {
        writeText(value) {
          writes.push(value);
        }
      }
    }
  });

  assert.equal(copied, true);
  assert.deepEqual(writes, ["hello"]);
});

test("clipboard utility writes through native Tauri clipboard before browser fallback", async () => {
  const calls = [];
  const copied = await writeClipboardText("native", {
    tauriInvoke(command, args) {
      calls.push({ command, args });
      return { status: "written", textLength: 6 };
    },
    navigator: {
      clipboard: {
        writeText() {
          throw new Error("browser clipboard should not be used first");
        }
      }
    }
  });

  assert.equal(copied, true);
  assert.deepEqual(calls, [
    {
      command: "write_system_clipboard_text",
      args: { text: "native" }
    }
  ]);
});

test("clipboard utility reads through native Tauri clipboard before browser fallback", async () => {
  const calls = [];
  const text = await readClipboardText({
    tauriInvoke(command) {
      calls.push(command);
      return { status: "read", text: "native paste", textLength: 12 };
    },
    navigator: {
      clipboard: {
        readText() {
          throw new Error("browser clipboard should not be used first");
        }
      }
    }
  });

  assert.equal(text, "native paste");
  assert.deepEqual(calls, ["read_system_clipboard_text"]);
});

test("clipboard utility falls back to textarea copy when navigator write fails", async () => {
  const document = mockDocument(true);
  const copied = await writeClipboardText("fallback", {
    navigator: {
      clipboard: {
        writeText() {
          throw new Error("permission denied");
        }
      }
    },
    document
  });

  assert.equal(copied, true);
  assert.equal(document.appended.length, 0);
  assert.equal(document.field.value, "fallback");
  assert.equal(document.field.readonly, "true");
  assert.equal(document.field.focused, true);
  assert.equal(document.field.selected, true);
  assert.deepEqual(document.field.range, [0, "fallback".length]);
});

test("clipboard utility falls back to browser read when native read fails", async () => {
  const text = await readClipboardText({
    tauriInvoke() {
      throw new Error("native unavailable");
    },
    navigator: {
      clipboard: {
        readText() {
          return "browser paste";
        }
      }
    }
  });

  assert.equal(text, "browser paste");
});

test("clipboard utility returns false when no write path is available", async () => {
  assert.equal(await writeClipboardText("missing", {}), false);
  assert.equal(await writeClipboardText("", { document: mockDocument(true) }), false);
});
