export const helpText = `Usage:
  node scripts/desktop-pipeline.mjs setup [--dry-run]
  node scripts/desktop-pipeline.mjs verify-quick [--dry-run]
  node scripts/desktop-pipeline.mjs verify [--dry-run]
  node scripts/desktop-pipeline.mjs tauri-build-prepared [--dry-run]
  node scripts/desktop-pipeline.mjs package-internal [--dry-run]
  node scripts/desktop-pipeline.mjs package-public [--dry-run]
  node scripts/desktop-pipeline.mjs public-report [--dry-run]

Root shortcuts:
  corepack pnpm run desktop:setup
  corepack pnpm run desktop:dev
  corepack pnpm run desktop:verify:quick
  corepack pnpm run desktop:setup:verify
  corepack pnpm run desktop:verify
  corepack pnpm run desktop:renderer:build
  corepack pnpm run desktop:package:internal
  corepack pnpm run desktop:run:internal
  corepack pnpm run desktop:package:run:internal
  corepack pnpm run desktop:package:public
  corepack pnpm run desktop:release:dev-env
  corepack pnpm run desktop:release:report
  corepack pnpm run desktop:doctor`;
