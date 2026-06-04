import { runCustomerBundleAudit } from "./check-customer-bundle.mjs";

const report = runCustomerBundleAudit({ allowMissingDist: false });
console.log(JSON.stringify(report, null, 2));

if (report.failures.length) {
  console.error(
    "[tauri-before-build-prepared] Prepared renderer output is missing or failed the customer bundle audit. Run `corepack pnpm run renderer:build` from platform-desktop-app first."
  );
  process.exitCode = 1;
} else {
  console.log("[tauri-before-build-prepared] Prepared renderer output is ready; skipping expensive renderer rebuild.");
}
