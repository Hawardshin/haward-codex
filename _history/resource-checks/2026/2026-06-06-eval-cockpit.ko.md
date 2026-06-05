# 리소스 점검: AI EVAL cockpit

## 대상

- resident section panel cap 변경
- dynamic import/preload 대상 추가
- Browser smoke용 임시 정적 서버
- Tauri internal package build
- Tool Studio Three.js scene resource lifecycle

## 점검 결과

- EVAL은 `retainedResidentSections`에 포함했고 resident cap은 6으로 제한했다.
- Tool Studio Three.js scene은 기존 cleanup 경로를 유지하며 geometry/material/renderer dispose, observer disconnect, animation frame cancel을 계속 테스트한다.
- Browser smoke용 `http.server`는 포트 `4173` 기준으로 두 차례 실행 후 모두 종료했다.
- `package:internal`은 Rust test/build, Tauri app/dmg bundle, codesign verify, hdiutil verify까지 통과했다.
- 설치는 발생하지 않았다.

## 남은 리스크

- resident cap 증가로 메모리 사용량은 늘 수 있다. 사용자 요구가 탭 전환 지연 완화를 위해 메모리를 더 쓰는 방향이므로 의도된 trade-off다.
- token/cost structured fields는 아직 후속 schema 개선이 필요하다.
