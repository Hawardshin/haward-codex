export function defaultClipboardEnvironment() {
  return {
    document: typeof document === "undefined" ? undefined : document,
    navigator: typeof navigator === "undefined" ? undefined : navigator,
    window: typeof window === "undefined" ? undefined : window
  };
}

function tauriInvokeFromEnvironment(environment) {
  const explicitInvoke = environment?.tauriInvoke;
  if (typeof explicitInvoke === "function") {
    return explicitInvoke;
  }
  const windowRef = environment?.window;
  const windowInvoke = windowRef?.__TAURI__?.core?.invoke;
  if (typeof windowInvoke === "function") {
    return windowInvoke;
  }
  return null;
}

export async function readClipboardText(environment = defaultClipboardEnvironment()) {
  const tauriInvoke = tauriInvokeFromEnvironment(environment);
  if (tauriInvoke) {
    try {
      const report = await tauriInvoke("read_system_clipboard_text");
      if (report && typeof report.text === "string") {
        return report.text;
      }
    } catch {
      // Fall through to browser clipboard. Static previews and older app builds can still paste.
    }
  }

  const clipboard = environment.navigator?.clipboard;
  if (typeof clipboard?.readText === "function") {
    try {
      return await clipboard.readText();
    } catch {
      return "";
    }
  }

  return "";
}

export async function writeClipboardText(value, environment = defaultClipboardEnvironment()) {
  const text = String(value ?? "");
  if (!text) {
    return false;
  }

  const tauriInvoke = tauriInvokeFromEnvironment(environment);
  if (tauriInvoke) {
    try {
      const report = await tauriInvoke("write_system_clipboard_text", { text });
      if (report?.status === "written" || report?.textLength > 0) {
        return true;
      }
    } catch {
      // Browser clipboard permissions may still succeed in non-native previews.
    }
  }

  const clipboard = environment.navigator?.clipboard;
  if (typeof clipboard?.writeText === "function") {
    try {
      await clipboard.writeText(text);
      return true;
    } catch {
      // Browser clipboard permissions may fail; fall through to the textarea copy path.
    }
  }

  const documentRef = environment.document;
  if (
    !documentRef ||
    typeof documentRef.createElement !== "function" ||
    typeof documentRef.execCommand !== "function" ||
    !documentRef.body ||
    typeof documentRef.body.appendChild !== "function" ||
    typeof documentRef.body.removeChild !== "function"
  ) {
    return false;
  }

  try {
    const field = documentRef.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "true");
    field.style.position = "fixed";
    field.style.left = "-9999px";
    field.style.top = "0";
    documentRef.body.appendChild(field);
    field.focus();
    field.select();
    field.setSelectionRange(0, text.length);
    const copied = documentRef.execCommand("copy");
    documentRef.body.removeChild(field);
    return Boolean(copied);
  } catch {
    return false;
  }
}
