# 누락 방지 점검: 소스 워크벤치 하위 컴포넌트 분리

- 포함:
  - `SourceWorkbenchPanel.tsx` 조합자 축소
  - `SourceEditorFrame.tsx`로 Monaco editor/diff editor 이동
  - 파일 선택, 명령 툴바, 탭, 파일 브라우저, 저장 결과, 상태 스트립 분리
  - source registry/test/design 검사 갱신
- 제외:
  - 기존 mixed dirty worktree 정리
  - 공개 배포용 signing/notarization/updater 입력값 구성

