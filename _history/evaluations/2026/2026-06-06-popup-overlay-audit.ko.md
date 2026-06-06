# Evaluation: Popup Overlay Audit

날짜: 2026-06-06

## 사용자 요구 대비 평가
- 요구: 팝업 같은 것을 전부 검토하고, 스크롤/잘림/불편한 기본 팝업 문제를 해결한다.
- 결과: 작은 menu류는 기존 Radix portal/collision 계약을 유지하고, 큰 modal/drawer류는 앱 root portal과 focus containment로 통합했다.

## 근거
- 설정, 명령 팔레트, 운영 센터는 `.desktop-app-root` portal 아래에서 backdrop이 viewport 전체를 덮고 surface가 1280x720 안에 남는다.
- 터미널 드로어는 root portal 아래에서 `top=64`, `bottom=720`, `opacity=1`, `transform=0`으로 확인했다.
- `useOverlayFocus`로 modal open initial focus, Tab 순환, Escape 닫기, focus restore를 공통 처리한다.
- 정적 테스트, TypeScript check, Next customer build, Tauri internal package, codesign, DMG verify, internal app open을 완료했다.

## 잔여 위험
- 공개 배포 readiness는 기존과 동일하게 Developer ID signing, notarization, updater, clean-machine smoke가 필요하다.
- native browser popover top layer로 전환하지는 않았다. 현재 변경은 기존 React/Radix 구조 안에서 clipping과 focus 문제를 해결하는 범위다.
