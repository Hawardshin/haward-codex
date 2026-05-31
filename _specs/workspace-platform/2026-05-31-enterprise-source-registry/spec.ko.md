# 스펙: 대기업/고신뢰 출처 registry

## 목적

대기업 엔지니어링 블로그, 공식 연구소, architecture center, 고신뢰 독립 자료의 사이트 목록을 일반 source taxonomy와 분리해 관리한다.

## 요구사항 연결

- `UR-2026-05-31-040`
- `REQ-WS-016`

## 범위

- `agent-platform/configs/research/enterprise-source-registry.json` 생성
- `_research/source-lists/enterprise-high-quality-sites.*.md` 생성
- 출처 수집 정책, 리서치 설정 README, research/coding workflow, prompts, memory bootstrap 연결
- 작업 히스토리, 요청 요약, 요청-결과 추적, 평가 파일 갱신

## 제외 범위

- 모든 고품질 사이트의 완전한 크롤링
- 사이트별 RSS 자동 수집기 구현
- 개별 claim을 목록만으로 사실 검증하는 기능

## 성공 기준

- 별도 registry가 self-documenting config 계약을 통과한다.
- 사람이 읽는 source list가 존재한다.
- 향후 research/coding 작업에서 registry를 `research_profile_paths` 또는 `reference_config_paths`로 기록할 수 있다.
- 메모리 부트스트랩에서 registry가 발견 가능하다.
