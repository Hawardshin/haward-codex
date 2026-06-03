# 계획: 모드와 기능 선택 위치 스위치보드

## 선택한 접근

1. 기존 registry와 UI 프리셋을 snapshot 수집 단계에서 정규화한다.
2. React UI는 snapshot만 읽어 그룹과 옵션을 렌더링한다.
3. 직접 선택 가능한 모드는 UI 상태에 연결하고, 위치 안내가 필요한 항목은 섹션 이동 또는 출처 표시로 처리한다.
4. collector/unit/readiness/build 검증으로 회귀를 막는다.

## 근거

- Apple HIG와 Fluent는 navigation 및 segmented controls를 명확한 현재 위치/선택 표면으로 쓰는 방식을 권장한다.
- WAI-ARIA tabs/landmarks 패턴은 탐색 구조와 현재 영역을 명확히 드러내야 함을 보여준다.
- 이 저장소는 이미 view/language/work/install/CLI registry를 분리하고 있으므로 새 런타임보다 catalog 조합이 더 작고 유지보수 가능하다.

## 위험과 완화

- 위험: work/install mode를 UI에서 실제 런타임 상태처럼 오해할 수 있다.
- 완화: selector location과 source path를 표시하고, 브라우저 상태로 저장하지 않는다.
- 위험: 모드 옵션이 긴 설명/경로로 UI를 깨뜨릴 수 있다.
- 완화: responsive grid와 `overflow-wrap`을 적용한다.
