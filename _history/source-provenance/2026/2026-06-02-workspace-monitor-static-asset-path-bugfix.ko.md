# 소스 출처: Workspace Monitor 정적 asset 경로 버그 수정

## 로컬 소스

- `workspace-monitor/out/index.html`: 수정 전 `/_next` absolute path 재현, 수정 후 `./_next` 확인
- `workspace-monitor/next.config.mjs`: Next static export 설정
- `workspace-monitor/components/SnapshotLoader.tsx`: workspace snapshot fetch 경로
- `workspace-monitor/scripts/check-performance-budget.mjs`: 성능/경로 회귀 검사
- `workspace-monitor/docs/requirements/2026-06-01-workspace-monitor.ko.md`: `REQ-WM-017`
- `workspace-monitor/specs/2026-06-02-performance-budget/`: 기존 성능 스펙 연결

## 외부 소스

- Next.js static export official docs
- Next.js `assetPrefix` official docs
- MDN `Window.fetch()` official docs
- Tauri asset protocol official docs

## 제외

- `_private/`는 읽지 않았다.
- community posts는 직접 사실 근거로 쓰지 않았다.
