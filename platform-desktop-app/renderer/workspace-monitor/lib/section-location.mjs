export function readInitialSectionFromParts(search = "", hash = "") {
  const fromQuery = new URLSearchParams(search).get("section");
  if (fromQuery) {
    return normalizeInitialSection(fromQuery);
  }

  const hashValue = hash.replace(/^#/, "");
  if (!hashValue) {
    return "";
  }
  return normalizeInitialSection(hashValue);
}

export function normalizeInitialSection(value) {
  return safeDecodeURIComponent(value).replace(/^section-/, "");
}

function safeDecodeURIComponent(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
