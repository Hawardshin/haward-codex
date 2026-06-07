# 2026-06-07 다크모드 색상 일관성 평가

## 평가 입력

- `installation_occurred`: `false`
- `resource_risk_occurred`: `true`
- `resource_check_targets`:
  - `_history/resource-checks/2026/2026-06-07-dark-mode-color-consistency.ko.md`
- `omission_check_targets`:
  - `_history/omission-checks/2026/2026-06-07-dark-mode-color-consistency.ko.md`

## 결과

- 명시 다크와 시스템 다크의 핵심 팔레트가 일치한다.
- 다크모드 텍스트와 포커스 링이 순백색 기반으로 튀지 않는다.
- 실제 렌더에서 `body` 배경도 다크모드와 일치한다.

## 검증

- `node --test tests/color-tokens.test.mjs`: 통과.
- `corepack pnpm --filter workspace-monitor test`: 통과.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- Playwright 데스크톱/모바일 계산 스타일 검증: 통과.
- `corepack pnpm run desktop:package:run:internal`: 통과.
- Rust 테스트: `cargo test` 8개 통과.
- Tauri 내부 앱 번들 및 DMG 검증: 통과.

## 잔여 위험

- 기존 작업 트리에 많은 선행 변경과 생성 파일이 섞여 있어 이번 변경만 별도 커밋하지 않았다.
- public 배포 준비는 서명, notarization, updater 키/엔드포인트, clean-machine smoke가 남아 있어 별도 게이트로 남는다.
