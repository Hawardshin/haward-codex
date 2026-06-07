# 2026-06-07 소스 에디터 순수 로직 분리 작업 요약

## 변경 사항

- `sourceDiff.ts`를 추가해 소스 diff summary 계산을 분리했다.
- `sourceLanguage.ts`를 추가해 Monaco language 매핑을 분리했다.
- `source-editor/index.ts`가 `monacoConfig`, `sourceTemplates`, `sourceDiff`, `sourceLanguage`를 모두 export하도록 정리했다.
- `MonitorShell.tsx`에서 해당 함수 구현을 제거하고 import로 바꿨다.
- `source-editor-templates.test.mjs`에 diff 계산과 language mapping이 `MonitorShell` 밖에 있는지 확인하는 테스트를 추가했다.

## 코드 크기

- `MonitorShell.tsx`: 14,417줄.
- `sourceDiff.ts`: 41줄.
- `sourceLanguage.ts`: 35줄.

## 검증

- `node --test tests/source-editor-templates.test.mjs`: 통과, 5개.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter workspace-monitor test`: 통과, 100개.
- `corepack pnpm run desktop:package:run:internal`: 통과.
