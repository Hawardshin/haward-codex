# 오픈소스 설치 정책 평가

## 초기 지시

사용자가 "만약 필요하다면 오픈소스 설치도 필요해"라고 지시했다.

## 결과 요약

- 성숙한 오픈소스가 작업에 맞으면 설치까지 허용하는 정책을 추가했다.
- 설치는 project/tool-local scope를 기본으로 하고, 설치 명령, dependency 기록 파일, 보안 검토, 라이선스 검토, 검증, rollback 계획을 요구하도록 했다.
- `OpenSourceCandidate`와 `candidate-template.json`에 설치 준비 필드를 추가했다.
- `score-oss` 결과에 `installation_status`와 `installation_gaps`가 나오도록 했다.
- 지속 지시, AGENTS, README, platform operating model, coding research prompt/workflow, open-source integration docs, memory bootstrap manifest를 갱신했다.
- 한국어/영어 리서치 노트와 계획 히스토리를 저장했다.

## 확인한 레퍼런스

- [Python Packaging User Guide](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/)
- [OpenSSF Scorecard](https://openssf.org/scorecard/)
- [CISA Open Source Software Security](https://www.cisa.gov/opensource)
- [CISA Secure by Demand Guide](https://www.cisa.gov/resources-tools/resources/secure-demand-guide)
- `agent-platform/docs/open-source-integration.md`
- `agent-platform/configs/open-source/candidate-template.json`
- `AGENTS.md`

## 검증

- `python3 -m json.tool agent-platform/configs/open-source/candidate-template.json`: 통과
- `python3 -m json.tool agent-platform/configs/memory/bootstrap-manifest.json`: 통과
- `PYTHONPATH=src python3 -m unittest discover -s tests`: 45 tests OK
- `score-oss configs/open-source/candidate-template.json`: `installation_status=not_required`
- `check-memory-bootstrap`: `ready_to_bootstrap`
- `check-config-contract`: `self_documenting`
- `knowledge-skeptic-agent`: `ready_to_reference`
- `hallucination-guard-agent`: `ready_to_publish`
- `work-evaluator-agent`: `ready_to_close`, gaps 없음

## 평가 결과

초기 지시와 결과가 일치한다. 이제 오픈소스는 검토 대상에만 머무르지 않고, 필요하면 설치까지 진행할 수 있다. 단, 설치는 범위, 명령, dependency 기록, 보안/라이선스 검토, 검증, rollback과 함께 기록해야 한다.

## 개선 아이디어

프로젝트별 package manager가 정해지면 lock-file 생성이나 취약점 스캔 자동화를 추가할 수 있다.
