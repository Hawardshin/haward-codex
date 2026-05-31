# 설치 감사 기록 강화 평가

## 초기 지시

사용자가 "특히 설치의 경우는 더"라고 지시했다.

## 결과 요약

- `_ops/installations/registry.json`을 self-documenting 설치 registry로 추가했다.
- `_history/installations/`를 설치별 상세 감사 기록 위치로 추가했다.
- `_templates/installation-record/`에 한국어/영어 Markdown 템플릿과 JSON entry 템플릿을 추가했다.
- `_ops/prompts/58-installation-record.md`와 `_ops/workflows/58-installation-record.md`를 추가했다.
- 설치 정책, 지속 지시, README, AGENTS, 운영 인덱스, close/evaluation workflow, coding research 문서를 갱신했다.
- `work-evaluator-agent`에 `installation_occurred`와 `installation_record_targets`를 추가했다.
- 오픈소스 후보 평가에 `installation_record_path`, `environment_path`, `version_or_lock_status`, `post_install_verification` 필드를 추가했다.
- memory bootstrap manifest에 설치 registry를 warm required anchor로 추가했다.

## 확인한 레퍼런스

- [Python Packaging User Guide: pip and virtual environments](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/)
- [Python documentation: Installing Python modules](https://docs.python.org/3/installing/index.html)
- [npm Docs: package-lock.json](https://docs.npmjs.com/cli/v6/configuring-npm/package-lock-json/)
- [OWASP Developer Guide: Dependencies](https://devguide.owasp.org/en/05-implementation/02-dependencies/)
- [OWASP CycloneDX](https://owasp.org/www-project-cyclonedx/)
- [OpenSSF Scorecard](https://openssf.org/scorecard/)
- `_docs/open-source-installation-policy.ko.md`
- `agent-platform/docs/open-source-integration.md`

## 검증

- `PYTHONPATH=src python3 -m unittest discover -s tests`: 48 tests OK
- `python3 -m json.tool configs/open-source/candidate-template.json`: 통과
- `python3 -m json.tool configs/evaluation/work-evaluation-template.json`: 통과
- `python3 -m json.tool ../_ops/installations/registry.json`: 통과
- `check-memory-bootstrap`: `ready_to_bootstrap`
- `check-config-contract`: `self_documenting`
- `score-oss configs/open-source/candidate-template.json`: `installation_status=not_required`
- `workspace-index`: maps regenerated
- `task-board`: coordination boards regenerated
- `workspace-index --check`: 통과
- `task-board --check`: 통과
- `git diff --check`: 통과
- `knowledge-skeptic-agent`: `ready_to_reference`
- `hallucination-guard-agent`: `ready_to_publish`
- `work-evaluator-agent`: `ready_to_close`, gaps 없음

## 평가 결과

초기 지시와 결과가 일치한다. 이제 실제 설치, 업그레이드, 제거, 전역 환경 변경이 발생한 작업은 일반 작업 요약 외에 `_history/installations/YYYY/` 상세 기록과 `_ops/installations/registry.json` 인덱스를 남겨야 한다. 이 변경 자체에서는 실제 dependency 설치가 발생하지 않았다.

## 개선 아이디어

나중에 설치 기록이 늘어나면 `_ops/installations/registry.json`의 `entry_required_fields`를 실제 entries에 대해 검증하는 Python 도구를 추가할 수 있다.
