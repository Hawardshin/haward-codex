# Evaluation: IntelliJ Shell Separation

## 평가 기준

- side rail과 main viewport가 같은 평면처럼 보이지 않는가.
- IntelliJ-style tool-window/editor 분리 의도가 코드와 테스트에 남았는가.
- titlebar가 메인 영역의 상단 경계를 명확히 형성하는가.
- bounded scroll, no-mobile shell, Tauri drag region, 기존 기능을 깨뜨리지 않는가.
- 테스트와 내부 패키지 빌드가 완료됐는가.

## 평가 결과

- `activity-rail`은 tool-window stripe zone으로 명시됐고, 별도 배경/경계/활성 indicator/shadow를 갖는다.
- `desktop-viewport`는 editor plane zone으로 명시됐고, 별도 background와 좌측 separator shadow를 갖는다.
- `desktop-titlebar`는 full-bleed margin/padding 구조로 메인 영역의 상단 chrome을 만든다.
- 정적 테스트가 separation token과 CSS rule을 확인한다.
- Browser computed-style check에서 rail width와 viewport/titlebar alignment가 확인됐다.
- renderer/desktop test/check와 internal package build가 통과했다.

## 잔여 리스크

- 실제 사용자 선호에 따라 rail 폭 자체를 더 넓히거나 별도 tool-window panel을 추가하는 후속 개선은 가능하지만, 이번 요청은 메인/사이드 분리 시각 구조에 집중했다.
- public release readiness의 기존 signing, notarization, updater, clean-machine smoke test 경고는 별도 범위다.
