# 계획 기록: 전체 워크스페이스 완성도 감사

## 모드

- 선택 모드: `governance`
- 이유: 전체 레포 품질 게이트, 요구사항, 스펙, 히스토리, 평가 정책을 변경한다.

## 실행 계획

1. 웹 검색과 memory bootstrap으로 기준을 확인한다.
2. 기존 audit/test/build를 실행해 실제 실패를 찾는다.
3. 실패한 structure audit false positive를 수정한다.
4. `workspace-health`가 최신 핵심 설정과 프로젝트 검증을 포함하도록 확장한다.
5. spec 문서의 미완처럼 보이는 신호를 정리한다.
6. health report와 평가 기록을 남긴다.
7. 최종 검증 후 commit/push한다.

## 발견

- 루트 `.pytest_cache/`는 policy의 generated output이지만 structure-audit가 unknown root로 오판했다.
- `workspace-health`는 최근 추가된 privacy, presentation browser, desktop readiness, 최신 config contract를 충분히 포함하지 않았다.
- 일부 spec validation heading과 commit/push checkbox가 미완처럼 보였다.
