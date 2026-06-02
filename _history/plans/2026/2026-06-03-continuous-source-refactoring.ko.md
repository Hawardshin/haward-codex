# 계획 기록: 지속 소스 구조 리팩터링

## 요청

좋은 결과는 좋은 소스 구조에서 나오므로, 작업을 계속하면서 지속적으로 리팩터링한다.

## 선택한 모드

- `standard`
- 이유: 지속 지침 변경과 코드 리팩터링이 함께 있으므로 운영 기록과 검증이 필요하지만, 전체 플랫폼 재구조화는 아니다.

## 외부/내부 기준

- 외부 기준: Martin Fowler의 동작 보존 리팩터링, Node.js ESM 공식 모듈 경계.
- 내부 기준: `REQ-WM-005`, `REQ-WM-021`, 새 `REQ-WM-022`, 기존 intent map collector 테스트.

## 구조 결정

| 후보 | 판단 |
| --- | --- |
| collector 안의 함수 순서만 정리 | 파일 수는 줄지만 책임 경계가 개선되지 않아 기각 |
| `scripts/lib/intent-feature-map.mjs`로 추출 | 기능별 파서 책임이 명확해지고 기존 API를 유지할 수 있어 선택 |

## 실행 계획

1. persistent instruction에 소스 구조 품질 gate를 추가한다.
2. memory bootstrap manifest의 persistent instruction anchor를 갱신한다.
3. Intent Feature Map collector/parser를 별도 모듈로 분리한다.
4. 요구사항과 spec/traceability를 추가한다.
5. 테스트, collect, intent-map checker, type check, build, customer build, docs audit, config contract, memory bootstrap을 검증한다.

## 종료 기준

- 기존 collector 테스트가 통과한다.
- developer/customer snapshot intent-map checker가 통과한다.
- `workspace-monitor` build와 TypeScript check가 통과한다.
- `_docs`와 memory config 검증이 통과한다.
