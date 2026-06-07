# 2026-06-07 소스 에디터 순수 로직 분리 계획

## 범위

- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/components/workbench/source-editor/`
- `platform-desktop-app/renderer/workspace-monitor/tests/source-editor-templates.test.mjs`

## 작업

1. `buildSourceDiffSummary`를 `sourceDiff.ts`로 이동한다.
2. `monacoLanguageFromPath`와 확장자 매핑을 `sourceLanguage.ts`로 이동한다.
3. `source-editor/index.ts`에서 새 모듈을 export한다.
4. 구조 테스트를 업데이트한다.
5. 테스트, 체크, 패키징을 실행한다.

## 제외

- 소스 에디터 state/action hook 분리는 다음 슬라이스로 남긴다.
