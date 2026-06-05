# 스펙: Tool Studio Depth Navigation

## 목표

- Tool Studio의 세부 기능을 한 줄에 모두 펼치지 않고 parent flow 아래로 한 단계 깊게 묶는다.
- 사용자는 먼저 `제작 준비` 또는 `출시 관리`를 선택하고, 그 안에서 현재 필요한 세부 모드만 본다.
- 단축키, dropdown, Overview task flow처럼 세부 모드로 직접 들어오는 경로도 parent flow 상태와 동기화한다.

## 요구사항

- Tool Studio는 `create`, `ship` parent stage를 가져야 한다.
- `build`, `environment`는 `create` stage에 속한다.
- `deploy`, `registry`는 `ship` stage에 속한다.
- parent stage rail은 `data-tool-stage-rail`, stage button은 `data-tool-stage-button`을 제공해야 한다.
- detail mode rail은 `currentStageModes`만 렌더링하고 `data-tool-mode-depth`로 현재 parent stage를 노출해야 한다.
- `selectMode`는 세부 mode뿐 아니라 해당 mode의 parent stage도 함께 갱신해야 한다.
- 860px 이하에서는 parent rail이 한 열로 접혀 수평 overflow를 만들지 않아야 한다.

## 제외

- Tool Studio 개별 workbench의 입력 폼 구조 변경
- registry 데이터 모델 또는 실제 배포 실행 로직 변경
- 상위 activity rail 목적지 구조 변경
