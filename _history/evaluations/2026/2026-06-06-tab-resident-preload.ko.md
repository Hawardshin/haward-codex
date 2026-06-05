# 평가: 탭 상주 선마운트 최적화

## 결론

구현은 사용자 요구와 맞다. 탭 클릭 시점의 조건부 mount를 줄이고, 시작 후 idle 시간에 주요 탭을 renderer 메모리에 resident로 올리는 구조로 바꿨다.

## 확인한 점

- 주요 탭 condition이 `section === ...` 직접 mount gate에서 `shouldRenderSection(...)`로 전환됐다.
- 숨겨진 탭은 `MountedSectionPanel`로 state를 유지한다.
- desktop/source 런타임 표면은 active section일 때만 launch request와 active flag를 받는다.
- workspace-monitor 테스트와 체크가 통과했다.
- 전체 desktop app 테스트와 체크가 통과했다.
- 내부 패키징 빌드가 `.app`와 `.dmg`를 생성했고 codesign/hdiutil 검증도 통과했다.

## 남은 위험

in-app Browser 스모크는 로컬 snapshot endpoint가 200 OK임을 확인했지만 화면이 `Loading workspace snapshot` 상태에 머물러 resident DOM count를 직접 확인하지 못했다. 코드 계약과 production/package 검증은 통과했으나, 실제 실행 앱에서 체감 탭 전환 시간은 사용자가 확인해야 한다.
