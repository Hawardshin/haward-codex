# Monaco 코드 편집 surface 검증 계획

## 자동 검증

- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run build`
- `corepack pnpm --filter workspace-monitor run check:intent-map:customer`

## 시각 검증

- static preview에서 desktop runtime panel의 Source Review가 Monaco editor surface로 렌더링되는지 확인한다.
- editor loading/fallback text가 고정된 크기의 workbench 안에 보이는지 확인한다.
- Source viewer에 copy 버튼과 copy notice가 표시되는지 확인한다.

## 검증 결과

- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor test`: 통과, 16개 테스트
- `corepack pnpm --filter workspace-monitor run build`: 통과
- `corepack pnpm --filter workspace-monitor run check:intent-map:customer`: 통과
- `corepack pnpm audit --prod=false`: known vulnerability 없음
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter platform-desktop-app run check`: 통과, customer bundle audit ready
- Browser static preview: Source 탭에서 `.source-viewer-monaco`와 `.monaco-editor`가 mount됨, 440px 높이, 가로 오버플로 없음
- Browser clipboard: 자동화 환경 권한 제한으로 copy notice는 `Clipboard unavailable`이 표시됨. 구현은 Clipboard API 실패 후 textarea fallback을 시도한다.
- `PYTHONPATH=src python3 -m agent_platform.cli check-resources ../_history/evaluations/2026/2026-06-03-monaco-code-editor-surface-resource-input.json`: `resource_ready`
- `PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/evaluations/2026/2026-06-03-monaco-code-editor-surface-omission-input.json`: `coverage_ready`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-03-monaco-code-editor-surface-evaluation-input.json`: `ready_to_close`
