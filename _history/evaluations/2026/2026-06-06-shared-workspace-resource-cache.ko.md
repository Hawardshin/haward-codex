# Shared Workspace Resource Cache 평가

## 결과

- 구현 완료.
- 내부 패키징 완료.
- commit/push 예정.

## 변경 요약

- `desktop`과 `source` resident surface가 동시에 같은 runtime panel을 유지할 때 `warm_workspace_os_resources` 호출을 공유한다.
- source catalog 준비도 `prepare_workspace_os_resources` shared in-flight/cache 경로를 사용한다.
- force refresh와 fallback `list_workspace_text_files` semantics는 유지했다.
- product feature registry와 readiness/test contract에 resident resource sharing을 추가했다.

## 검증

- TypeScript: 통과.
- Workspace Monitor collect/check/test: 통과, renderer test 68개.
- Platform test/check: 통과, root test 24개.
- Product feature registry config contract: 통과.
- Browser smoke: 통과, built static app에서 주요 레일 전환 확인.
- Section latency audit: 통과, `settleP95Ms=735.7`, `longTaskMaxMs=548`.
- `package:internal`: 통과, 내부 `.app`/`.dmg`, codesign verify, DMG verify 완료.

## 리스크

- 이번 변경은 native Rust cache 자체가 아니라 React renderer의 중복 요청 경계를 줄인다.
- TTL cache는 module-level 단일 result cache라 메모리 증가 위험은 낮지만, 장기적으로 runtime workspace state store로 옮기면 더 명확해질 수 있다.
- public release readiness warning은 기존 외부 credential/update blocker이며 이번 내부 package의 blocker는 아니다.

## 판단

사용자의 탭 이동 지연 지적 중 “resident panel이 동시에 올라와 같은 native 준비 작업을 반복하는 비용”에 해당하는 부분을 실제로 줄였다. 전체 구조 혁신까지 한 번에 끝낸 것은 아니지만, 현재 코드에서 확인 가능한 중복 OS 작업 경계에 대해서는 작동하는 구현과 검증을 완료했다.
