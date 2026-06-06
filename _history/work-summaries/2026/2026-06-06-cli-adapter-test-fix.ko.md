# Work Summary: CLI Adapter Test Fix

## 완료 내용

- 붙여넣은 로그의 실패 지점인 `tests/tool-studio.test.mjs`의 CLI adapter setup assertion을 수정했다.
- `authHint`, `firstRunCommand`, `expectedResult` 기대 타입을 `string`에서 `LocalizedText`로 맞췄다.
- 소스 구현은 이미 localized setup guide를 사용하고 있어 런타임 코드는 변경하지 않았다.

## 변경 파일 중심

- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`

## 검증

- `pnpm --dir platform-desktop-app/renderer/workspace-monitor test`: 통과.
- `pnpm --dir platform-desktop-app package:internal`: 통과.
