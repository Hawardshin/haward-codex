export function defaultClipboardEnvironment() {
  return {
    document: typeof document === "undefined" ? undefined : document,
    navigator: typeof navigator === "undefined" ? undefined : navigator
  };
}

export async function writeClipboardText(value, environment = defaultClipboardEnvironment()) {
  const text = String(value ?? "");
  if (!text) {
    return false;
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
