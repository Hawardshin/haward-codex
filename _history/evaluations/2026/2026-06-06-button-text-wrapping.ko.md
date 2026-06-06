# Evaluation: Button Text Wrapping

날짜: 2026-06-06

## 사용자 요구 대비 평가
- 요구: 텍스트 줄바꿈 때문에 버튼이 너무 길어지는 문제 수정.
- 결과: 액션/명령 버튼 라벨에 한 줄 ellipsis 계약을 추가했고, 주요 커스텀 버튼 영역의 `white-space: normal`/`overflow-wrap:anywhere` 예외를 제거했다.

## 근거
- Web 기준: MDN의 `text-overflow`/`white-space` 기준을 확인했다.
- 접근성 기준: DOM 텍스트는 유지하고 CSS 표시 방식만 truncation 처리했다.
- 정적 검증: workspace-monitor test/check 통과.
- Browser smoke: source command toolbar와 공용 버튼 라벨이 `nowrap`, `hidden`, `ellipsis`로 계산됐고 console error는 0건이었다.
- 앱 검증: platform-desktop-app test/check 통과.
- 패키징 검증: internal `.app`/`.dmg` build, `codesign --verify --deep --strict`, `hdiutil verify` 통과.

## 잔여 위험
- 일부 긴 설명형 버튼은 정보량이 줄어 보일 수 있다. 이번 변경은 액션 버튼의 레이아웃 안정성을 우선한다.
- 공개 배포 readiness는 기존과 동일하게 Developer ID signing, notarization, updater, clean-machine smoke가 필요하다.
