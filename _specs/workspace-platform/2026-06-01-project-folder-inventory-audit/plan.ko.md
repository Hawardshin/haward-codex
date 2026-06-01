# 프로젝트 폴더 인벤토리 감사 계획

## 작업 모드

- `governance`

## 근거

- 루트 구조 감사는 통과했지만 프로젝트 내부 top-level folder 설명까지는 확인하지 못했다.
- 외부 참고 자료는 폴더 소유권과 문서 구조를 명확히 하는 방향을 지지했다.

## 순서

1. 현재 구조 감사와 프로젝트 등록부를 확인한다.
2. `structure-audit`에 project inventory와 generated output ignore 검증을 추가한다.
3. 실제 존재하는 durable top-level folder를 registry에 반영한다.
4. 정책/문서/요구사항/히스토리를 갱신한다.
5. 테스트, 구조 감사, 설정 계약, workspace monitor build를 실행한다.
6. 평가 후 commit/push한다.

