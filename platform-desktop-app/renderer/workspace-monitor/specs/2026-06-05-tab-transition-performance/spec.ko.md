# 스펙: Tab Transition Performance

## 목표

- 주요 탭 이동 시 사용자가 첫 주 기능을 기다리는 시간을 줄인다.
- 닫힌 보조 기능군은 화면에 숨기는 수준이 아니라 실제 React 렌더 트리에서도 제외한다.
- 성능 최적화가 정보량 축소 원칙을 깨지 않도록, 열기 전에는 summary만 보이고 열면 기존 기능이 그대로 나타나야 한다.

## 요구사항

- Agents 탭의 블루프린트, 생성기, 학습 피드백, 협업판, 인벤토리, 런타임 표는 에이전트 세부 기능 disclosure가 열릴 때만 마운트한다.
- Desktop Runtime 탭의 운영 진단 패널과 실행 기록/결정함 패널은 각 disclosure가 열릴 때만 마운트한다.
- 섹션 전환은 낮은 우선순위 transition으로 미루지 않고, 선택 섹션과 최근 섹션 기록을 같은 사용자 입력 처리 안에서 갱신한다.
- 닫힌 disclosure 상태에서 관련 heavy panel DOM count는 0이어야 한다.
- disclosure를 열면 관련 패널이 나타나야 하며, 모바일 폭에서도 수평 overflow는 0이어야 한다.
- CPU throttle 6 정적 export audit에서 `overview`, `agents`, `desktop`, `source`, `intent` 주요 탭 이동 평균은 기존 기준보다 낮아야 한다.

## 제외

- Monaco editor 자체 초기 로딩 최적화
- 런타임 데이터 fetch 또는 Tauri command 실행 속도 개선
- 탭 구조나 섹션 라벨의 정보구조 재설계
