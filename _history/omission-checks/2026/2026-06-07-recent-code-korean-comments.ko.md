# 2026-06-07 누락 점검: 최근 코드 한국어 주석

## 사용자 요구 대응

- 한국어 주석: 새 주석은 모두 한국어로 작성했다.
- 최근 구현 코드: 앱 셸, 앱 업데이트, DMG cleanup/recovery, pipeline wrapper, readiness source aggregate에 반영했다.
- 과잉 주석 방지: 단순한 값 대입이나 함수 호출을 설명하는 주석은 추가하지 않았다.
- 검증: Node syntax, Rust check/test, readiness/runtime contract, package/run을 확인한다.

## 남은 범위

저장소 전체 모든 코드에 대한 라인별 주석은 적용하지 않았다. 이는 의도 설명보다 중복 설명을 늘려 유지보수성을 낮추는 변경이기 때문이다.
