# Evaluation: Popup Scroll Clipping

날짜: 2026-06-06

## 사용자 요구 대비 평가
- 요구: 스크롤 때문에 팝업이 보이지 않는 현상 수정.
- 결과: 대표 dropdown/context/file picker 팝업이 portal layer, collision padding, viewport available-height, 내부 scroll 계약을 갖게 되어 스크롤 컨테이너 clipping과 화면 밖 확장을 줄였다.

## 근거
- Web 기준: overflow clipping과 portal/floating positioning reference를 확인했다.
- 정적 테스트: 팝업 레이어 token, Radix portal/collision, bounded internal scroll 계약을 추가했다.
- Browser 실측: Tool Studio menu와 source file picker가 900x520 viewport에서 화면 안에 표시되고 `z-index=140`, `overflowY=auto`, `portalWrapped=true`로 확인됐다.
- 자동 검증: workspace-monitor test/check/source smoke, platform-desktop-app test/check, internal package build, codesign verify, hdiutil verify가 통과했다.

## 잔여 위험
- Tauri webview별 스크롤 physics는 preview와 다를 수 있으므로 내부 패키지 smoke를 계속 유지해야 한다.
- app choice menu는 동일 CSS/Content 계약으로 정적 검증했고, Browser 실측은 Tool Studio menu와 source file picker 중심으로 수행했다.
- 공개 배포 readiness는 Developer ID signing, notarization, updater, clean-machine smoke가 여전히 gate다.
