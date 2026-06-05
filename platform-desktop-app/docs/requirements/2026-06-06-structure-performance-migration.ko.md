# 요구사항: 구조/메모리/성능 마이그레이션

## 사용자 요구

전체 구조에 근본적인 혁신이 필요한지, 메모리 및 성능 측면에서 비효율적인 지점을 냉정하게 평가하고, 마이그레이션 계획을 세운 뒤 구현한다.

## 냉정한 평가

- 근본 혁신은 필요하다. 다만 “한 번에 전면 재작성”이 아니라 runtime authority와 UI state boundary를 단계적으로 분리해야 한다.
- `MonitorShell.tsx`는 13,000 lines 이상으로 navigation, runtime process state, source editor, provider state, admin/state visualization이 한 컴포넌트에 공존한다. 이 구조는 작은 입력 변경도 큰 React subtree를 다시 평가하게 만들기 쉽다.
- `app/globals.css`는 16,000 lines 이상이라 스타일 소유권과 삭제 가능성이 불명확하다. CSS parse/maintainability 측면에서 장기 리스크다.
- `src-tauri/src/lib.rs`는 9,500 lines 이상으로 runtime command, filesystem, git, provider, cache 기능이 섞여 있다. Rust compile boundary와 테스트 단위가 커진다.
- developer snapshot은 source file full content를 인라인으로 싣고 있었다. 이건 WebView 초기 JSON parse/memory 비용과 source privacy surface를 동시에 키운다.
- Monaco editor onChange가 매 키 입력마다 React state를 갱신했다. 큰 runtime panel 전체가 source draft 입력과 결합되는 구조라 코드 편집 체감 성능을 해칠 수 있다.

## 이번 수용 기준

- developer snapshot은 source file full content를 싣지 않고 metadata/preview만 싣는다.
- preview payload에는 명시적 budget gate를 둔다.
- Monaco draft 입력은 매 키 입력마다 전체 React state를 즉시 갱신하지 않는다.
- 저장/복사/템플릿 삽입은 throttled UI state가 아니라 editor buffer의 최신 값을 사용한다.
- 구현 후 전체 test/check와 내부 패키징 빌드를 실행한다.

## 다음 단계 요구

- `MonitorShell.tsx`를 domain panel 단위로 분해한다.
- source editor state를 `SourceWorkspacePanel` 또는 external store boundary로 분리한다.
- `globals.css`를 feature CSS module 또는 component-scoped style 파일로 나눈다.
- `src-tauri/src/lib.rs`를 command domain module로 분리한다.
