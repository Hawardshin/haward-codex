# Request Trace: Native Select 교체

날짜: 2026-06-06

## 요청

OS 기본 드롭다운처럼 보이는 선택 버튼이 앱과 어울리지 않으므로 개선.

## 결과

- native `<select>` 제거.
- 앱 스타일 메뉴/버튼 선택지 도입.
- 재발 방지 테스트 추가.
- 내부 패키징 빌드 완료.

## 주요 산출물

- `platform-desktop-app/docs/requirements/2026-06-06-native-select-replacement.ko.md`
- `platform-desktop-app/specs/2026-06-06-native-select-replacement/spec.ko.md`
- `platform-desktop-app/specs/2026-06-06-native-select-replacement/validation.ko.md`
- `_history/evaluations/2026/2026-06-06-native-select-replacement.ko.md`

## 구현 파일

- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`

## 검증 링크

- Validation: `platform-desktop-app/specs/2026-06-06-native-select-replacement/validation.ko.md`
- Omission: `_history/omission-checks/2026/2026-06-06-native-select-replacement.json`
- Resource: `_history/resource-checks/2026/2026-06-06-native-select-replacement.json`
