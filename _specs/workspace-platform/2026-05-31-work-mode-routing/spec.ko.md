# 작업 모드 라우팅 스펙

## 범위

매번 전체 운영 루프를 강제하지 않도록 작업 시작 시 모드를 선택하고, 완료 평가에서 모드별 필수 산출물을 다르게 판정한다.

## 요구사항

- `REQ-WS-020`

## 사용자 문제

현재 구조는 작은 작업, 긴급 수정, 순수 조사에도 요구사항/스펙/히스토리/evaluator target을 거의 항상 요구해 느려질 수 있다.

## 기능 요구

- 작업 모드는 `quick`, `standard`, `ship_first`, `research`, `governance`로 둔다.
- 모드 선택 기준은 self-documenting JSON 설정으로 관리한다.
- evaluator 입력은 `work_mode`를 받는다.
- `standard` 기본값은 기존 엄격한 동작을 유지한다.
- `quick`은 전체 루프 target 누락을 비차단 개선으로 둔다.
- `ship_first`는 reference와 web-search record를 요구하고, 개선 아이디어가 있으면 deferred target을 요구한다.
- `research`는 출처와 계획 근거를 blocking으로 둔다.
- `governance`는 기존 전체 루프를 유지한다.

## 비기능 요구

- 기존 evaluator 테스트는 깨지지 않아야 한다.
- 새 공유 설정 파일은 `reader_guide`, `reference_links`, `structure_rules`, `field_guide`를 포함해야 한다.
- 작업 모드는 웹-first intake와 git/push 규칙을 우회하지 않는다.

## 제외 범위

- 실제 사용자 UI를 별도로 만들지는 않는다.
- 새 외부 패키지는 설치하지 않는다.
