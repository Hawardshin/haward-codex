# 2026-06-07 소스 에디터 모듈 분리 작업 요약

## 변경 사항

- `MonitorShell.tsx`에서 소스 에디터 템플릿 카탈로그, 파일 경로별 에디터 프로파일 판단, 템플릿 렌더/append 헬퍼를 `sourceTemplates.ts`로 이동했다.
- Monaco 기본 옵션, diff 옵션, 테마 등록 함수를 `monacoConfig.ts`로 이동했다.
- `source-editor/index.ts`를 추가해 호출부 import를 단일 경로로 정리했다.
- `source-editor-templates.test.mjs`를 추가해 구조 분리가 유지되도록 했다.
- 기존 `tool-studio.test.mjs`가 Monaco 옵션을 새 모듈에서 검사하도록 갱신했다.

## 코드 크기

- 현재 `MonitorShell.tsx`: 14,490줄.
- 새 `source-editor` 모듈:
  - `sourceTemplates.ts`: 134줄.
  - `monacoConfig.ts`: 72줄.
  - `index.ts`: 2줄.

## 검증

- `node --test tests/source-editor-templates.test.mjs`: 통과.
- `corepack pnpm --filter workspace-monitor test`: 통과, 98개.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm run desktop:package:run:internal`: 통과.
