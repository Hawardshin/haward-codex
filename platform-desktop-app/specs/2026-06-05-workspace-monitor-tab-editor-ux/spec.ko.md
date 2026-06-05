# 스펙: Workspace Monitor 탭 전환과 소스 편집 UX

## 목표

Workspace Monitor에서 탭 이동 시 느린 로딩감을 줄이고, 소스 편집 화면의 상태 보존과 조작 직관성을 높인다.

## 설계 결정

- `readySection`과 `pendingSectionCommitRef` 기반의 섹션 지연 커밋을 제거한다.
- `@monaco-editor/react`와 `AgentCollaborationScene`은 브라우저 idle 시간에 동적 import로 선로딩한다.
- 소스 편집 패널은 `MountedSectionPanel`로 숨김 상태에서도 유지해 열린 드래프트와 에디터 상태가 탭 이동으로 사라지지 않게 한다.
- 숨겨진 소스 패널은 `surfaceActive`로 런타임 실행 요청 소비와 세션 폴링을 막는다.
- Monaco 기본값은 줄바꿈 켬, 미니맵 끔, 더 큰 글꼴과 높은 편집 영역으로 조정한다.
- 사이드바 확장 폭과 터미널 오프셋을 함께 조정한다.

## 수용 기준

- `data-section-content-ready`는 탭 이동 중 `false` 준비 상태로 떨어지지 않는다.
- 소스 패널 DOM은 초기부터 존재하고 비활성 탭에서는 `hidden`으로 숨겨진다.
- 소스 탭 활성화 시 가로 오버플로가 생기지 않는다.
- 고객용 렌더러 빌드가 성공한다.

## 근거

- React 공식 문서는 lazy 컴포넌트 코드가 처음 렌더 시점까지 지연될 수 있음을 설명한다: https://react.dev/reference/react/lazy
- React Suspense는 아직 로드되지 않은 콘텐츠 대신 fallback을 표시하는 패턴을 제공한다: https://react.dev/reference/react/Suspense
- MDN `content-visibility` 문서는 숨김/렌더링 비용 관리가 브라우저 렌더링과 연결됨을 설명한다: https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility
