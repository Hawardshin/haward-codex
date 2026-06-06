"use client";

export function SnapshotLoadingShell({
  detail,
  status = "loading"
}: {
  detail: string;
  status?: "loading" | "error";
}) {
  return (
    <main className="snapshot-loading-shell">
      <div>
        <p className="eyebrow">Workspace Monitor</p>
        <h1>{status === "error" ? "Snapshot unavailable" : "Loading monitor"}</h1>
        <p>{detail}</p>
      </div>
      <span className={`snapshot-loading-indicator ${status}`} />
    </main>
  );
}
