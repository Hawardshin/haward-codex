# 오픈소스 설치 정책

## 목적

성숙한 오픈소스가 작업에 맞고 유지보수 비용을 줄인다면 검토에 그치지 말고 설치해서 사용할 수 있다. 다만 설치는 재현 가능하고 되돌릴 수 있어야 하며, 라이선스와 보안 위험을 기록해야 한다.

## 기본 원칙

- 기능을 직접 만드는 것보다 성숙한 오픈소스가 더 적합하면 설치를 고려한다.
- 설치 전에는 웹 검색, 공식 문서, 저장소, release/activity, 라이선스, 보안 신호를 확인한다.
- Python 프로젝트는 기본적으로 project-local virtual environment 또는 project dependency file을 사용한다.
- 전역 설치는 피한다. 전역 도구나 Codex skill처럼 전역 설치가 필요하면 이유, 설치 위치, 제거 방법을 기록하고 필요한 권한 승인을 받는다.
- 설치 명령, dependency 기록 파일, lock 파일 여부, import/test 검증, rollback 방법을 남긴다.
- 실제 설치, 업그레이드, 제거, 전역 설정 변경은 `_ops/installations/registry.json`과 `_history/installations/YYYY/`에 반드시 남긴다.
- 설치 후에는 관련 테스트, CLI, smoke test 중 최소 하나를 실행한다.
- 보안이나 라이선스가 불명확하면 설치하지 않고 대안을 찾거나 사용자 확인을 받는다.
- 설치 기록 없이 최종 답변에서 "설치 완료"라고 말하지 않는다.

## 설치 기록 필드

오픈소스 후보를 설치하려면 `agent-platform/configs/open-source/candidate-template.json` 또는 프로젝트 문서에 다음을 기록한다.

- `install_needed`: 설치가 필요한지 여부
- `installation_scope`: `project`, `tool`, `adapter`, `global` 중 어디에 설치하는지
- `install_command`: 정확한 설치 명령
- `dependency_record_path`: `pyproject.toml`, lock 파일, package manifest 등 추적 파일
- `installation_record_path`: `_history/installations/YYYY/` 아래 상세 설치 기록
- `environment_path`: `.venv`, tool-local runtime, global install path 등 실제 설치 위치
- `version_or_lock_status`: pin, range, lock 파일, SBOM, 또는 해당 없음
- `post_install_verification`: import, CLI, test, smoke test 등 설치 후 검증
- `security_review`: 유지보수, 취약점, provenance, dependency risk 확인
- `license_review`: 라이선스 호환성과 attribution 의무
- `rollback_plan`: 제거 방법과 복구 검증

## 설치 감사 기록

- 설치 전: `_templates/installation-record/installation-record.ko.md`로 draft 기록을 만들고, 설치 이유와 조사 링크, 정확한 명령, 예상 변경 파일, rollback 계획을 적는다.
- 설치 중: 실제 실행한 명령과 승인 여부를 기록한다.
- 설치 후: 설치된 버전, lock/SBOM 상태, 변경된 파일, 검증 결과를 기록한다.
- 레지스트리: `_ops/installations/registry.json`에 상세 기록 파일, 설치 범위, dependency 기록 파일, 검증, 커밋을 인덱싱한다.
- 종료 평가: 설치가 실제로 발생하면 `work-evaluator-agent` 입력에 `installation_occurred=true`와 `installation_record_targets`를 포함한다.
- 삭제/업그레이드도 설치와 같은 수준으로 기록한다.

## Python 기본 방식

- 프로젝트별 dependency는 `pyproject.toml` 또는 프로젝트의 기존 package manager 설정에 기록한다.
- 임시 실험은 격리된 venv, temporary workspace, 또는 프로젝트-local tool runner를 사용한다.
- 시스템 Python이나 OS package manager 영역에 직접 설치하지 않는다.
- 설치 후 `python -c "import <package>"`, unit test, CLI help, smoke test 등으로 실제 동작을 확인한다.

## JavaScript/Node 기본 방식

- 프로젝트 dependency는 `package.json`과 lock 파일로 추적한다.
- `package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`처럼 재현 가능한 lock 파일이 생기거나 바뀌면 설치 기록에 적는다.
- `node_modules/`는 저장소에 넣지 않고, lock 파일과 install 명령으로 재현한다.

## 참고한 레퍼런스

- [Python Packaging User Guide: pip and virtual environments](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/)
- [Python documentation: Installing Python modules](https://docs.python.org/3/installing/index.html)
- [npm Docs: package-lock.json](https://docs.npmjs.com/cli/v6/configuring-npm/package-lock-json/)
- [OWASP Developer Guide: Dependencies](https://devguide.owasp.org/en/05-implementation/02-dependencies/)
- [OWASP CycloneDX](https://owasp.org/www-project-cyclonedx/)
- [OpenSSF Scorecard](https://openssf.org/scorecard/)
- [CISA Open Source Software Security](https://www.cisa.gov/opensource)
- [CISA Secure by Demand Guide](https://www.cisa.gov/resources-tools/resources/secure-demand-guide)
