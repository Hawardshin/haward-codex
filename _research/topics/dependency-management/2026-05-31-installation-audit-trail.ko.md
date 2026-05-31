# 설치 감사 기록 정책

## 목적

설치 작업은 파일 변경뿐 아니라 dependency tree, lock 파일, 로컬/전역 환경 상태를 바꾸기 때문에 일반 작업 요약보다 더 강한 기록이 필요하다.

## 확인한 자료

| 자료 | 유형 | 확인일 | 참고한 점 |
| --- | --- | --- | --- |
| [Python Packaging User Guide: pip and virtual environments](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/) | 공식 문서 | 2026-05-31 | Python 패키지는 project-local virtual environment와 requirements/dependency file로 격리·재현하는 방식을 참고했다. |
| [Python documentation: Installing Python modules](https://docs.python.org/3/installing/index.html) | 공식 문서 | 2026-05-31 | 시스템 Python에 직접 설치하면 OS package manager나 다른 구성 요소와 충돌할 수 있다는 위험을 참고했다. |
| [npm Docs: package-lock.json](https://docs.npmjs.com/cli/v6/configuring-npm/package-lock-json/) | 공식 문서 | 2026-05-31 | lock 파일이 동일한 dependency tree 재현과 변경 가시성을 제공한다는 점을 참고했다. |
| [OWASP Developer Guide: Dependencies](https://devguide.owasp.org/en/05-implementation/02-dependencies/) | 보안 가이드 | 2026-05-31 | dependency의 사용 위치, 버전, 라이선스, source, 지원/유지보수 상태를 기록해야 한다는 SBOM 관점을 참고했다. |
| [OWASP CycloneDX](https://owasp.org/www-project-cyclonedx/) | SBOM 표준 | 2026-05-31 | SBOM, SaaSBOM, OBOM 등 supply-chain 투명성 표준을 참고했다. |
| [OpenSSF Scorecard](https://openssf.org/scorecard/) | 보안 신호 | 2026-05-31 | 오픈소스 프로젝트의 trust/risk/security posture를 설치 전 검토 신호로 활용한다. |

## 적용한 인사이트

- 설치는 "어떤 파일을 바꿨는지"보다 "무엇이 어디에 설치됐고 어떻게 되돌리는지"가 더 중요하다.
- 설치 전 계획과 설치 후 실제 결과가 다를 수 있으므로 draft 기록과 post-install 기록을 분리해야 한다.
- Python은 project-local venv/dependency file을 우선하고, system Python이나 전역 설치는 예외로 둔다.
- Node 계열은 lock 파일을 dependency tree의 재현 가능한 기록으로 다룬다.
- dependency 보안은 단일 popularity 신호가 아니라 유지보수, 출처, license, vulnerability, rollback 가능성을 함께 본다.

## 저장소 반영

- `_ops/installations/registry.json`을 설치 감사 인덱스로 추가했다.
- `_history/installations/YYYY/`를 설치별 상세 기록 위치로 추가했다.
- `_templates/installation-record/`에 한영 설치 기록 템플릿과 JSON entry 템플릿을 추가했다.
- `work-evaluator-agent`는 `installation_occurred=true`일 때 `installation_record_targets` 누락을 blocking gap으로 처리한다.
