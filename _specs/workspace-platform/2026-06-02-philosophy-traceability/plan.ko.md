# 계획: 철학 원칙 실행 추적성

## 작업 모드

- `governance`

## 근거

- 웹 검색 결과 ADR와 요구사항 추적성 실무는 중요한 원칙과 결정이 source, rationale, consequence, verification link를 가져야 유지보수 가능하다는 방향을 제시했다.
- 기존 `_philosophy/agent-operating-philosophy.ko.md`는 원칙을 담고 있지만, 원칙별 실행 대상과 검증 대상을 한 번에 점검하는 구조가 없었다.

## 단계

1. 철학 문서와 memory bootstrap 현재 연결 확인
2. `philosophy-traceability.json` 작성
3. `check-philosophy-trace` CLI와 테스트 추가
4. 철학 거버넌스 문서, 워크플로, 프롬프트 추가
5. memory bootstrap, workspace-health, docs registry, operations navigation 연결
6. 요구사항/스펙/히스토리/평가 기록
7. 전체 검증 후 커밋/푸시
