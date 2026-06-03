# 2026-06-03 Monaco 코드 편집 surface 요청 추적

## 요청

코드 복사와 코드 편집 기능이 필요하므로 VS Code 오픈소스 또는 다른 오픈소스 코드 편집 기능을 설치/적용한다.

## 결과

- VS Code 전체 제품 설치가 아니라 Monaco Editor를 선택했다.
- `workspace-monitor`에 이미 있던 `@monaco-editor/react`와 `monaco-editor` dependency를 실제 UI에 연결했다.
- Source 탭은 Monaco read-only viewer와 Copy 버튼을 제공한다.
- Desktop Runtime의 scoped source editor는 Monaco 기반 편집기로 바뀌었고 기존 save current, save all, revert, close draft, backup save gate는 유지한다.

## 산출물

- `workspace-monitor/components/MonitorShell.tsx`
- `workspace-monitor/app/globals.css`
- `platform-desktop-app/docs/requirements/2026-06-03-code-editor-surface.ko.md`
- `platform-desktop-app/specs/2026-06-03-code-editor-surface/`
- `_history/evaluations/2026/2026-06-03-monaco-code-editor-surface-evaluation-input.json`

## 검증

- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run build`
- `corepack pnpm --filter workspace-monitor run build:customer`
- `corepack pnpm audit --prod=false`
- Browser static preview Monaco render check
- `corepack pnpm --filter workspace-monitor run check:intent-map:customer`
- `corepack pnpm --filter platform-desktop-app run check`

## 남은 개선

- clipboard 성공은 Browser 자동화 권한 제한 때문에 직접 증명하지 못했다. 실제 사용자 환경 QA나 브라우저 권한 설정이 있는 테스트를 추가한다.
- Monaco workbench는 다음 UI 구조 개선에서 별도 component로 분리한다.
