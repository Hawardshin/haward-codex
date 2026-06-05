# 네이티브 창 크롬 활용 계획

## 작업 순서

1. Tauri official config와 window customization 문서를 확인한다.
2. main window에 네이티브 투명 타이틀바와 launch background 계약을 추가한다.
3. capability에 window dragging permission을 추가한다.
4. Workspace Monitor titlebar에 drag region을 추가하고 조작 컨트롤은 no-drag로 분리한다.
5. renderer test와 desktop readiness gate를 갱신한다.
6. browser DOM/CSS 검증과 internal package build까지 실행한다.

## 리스크와 완화

- 리스크: 전체 header를 drag region으로 만들면 버튼 클릭이 뺏길 수 있다.
- 완화: 조작 가능한 action/search/context strip에 `data-tauri-drag-region="false"`와 `-webkit-app-region: no-drag`를 함께 둔다.

- 리스크: Tauri config schema가 창 옵션을 거부할 수 있다.
- 완화: `platform-desktop-app` test/check와 internal package build를 실행해 schema와 bundling을 검증한다.
