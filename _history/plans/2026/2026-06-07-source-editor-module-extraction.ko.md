# 2026-06-07 소스 에디터 모듈 분리 계획

## 범위

- 대상 프로젝트: `platform-desktop-app/renderer/workspace-monitor`
- 주요 파일:
  - `components/MonitorShell.tsx`
  - `components/workbench/source-editor/sourceTemplates.ts`
  - `components/workbench/source-editor/monacoConfig.ts`
  - `components/workbench/source-editor/index.ts`
  - `tests/source-editor-templates.test.mjs`
  - `tests/tool-studio.test.mjs`

## 실행 슬라이스

1. 큰 파일 후보와 변경 상태를 확인한다.
2. `MonitorShell`의 정적 소스 에디터 템플릿/프로파일 로직을 별도 모듈로 이동한다.
3. Monaco 옵션/테마 설정을 같은 `source-editor` 모듈로 이동한다.
4. 구조 테스트를 추가하고 기존 스캔 테스트를 새 모듈 위치로 갱신한다.
5. Workspace Monitor 테스트, 타입/계약 체크, 내부 패키징을 실행한다.

## 제외

- 런타임 Rust 명령 구조 변경은 이번 슬라이스에서 제외했다.
- 사용자 visible 기능 변경은 의도하지 않았다.
