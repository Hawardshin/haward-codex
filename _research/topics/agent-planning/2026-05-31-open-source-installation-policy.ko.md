# 오픈소스 설치 정책 리서치

## 목적

사용자가 "필요하다면 오픈소스 설치도 필요하다"고 지시했기 때문에, 오픈소스를 단순 검토에 그치지 않고 필요한 경우 설치까지 진행하는 기준을 정리한다.

## 확인한 출처

| 출처 | 유형 | 확인일 | 사용한 이유 |
| --- | --- | --- | --- |
| [Python Packaging User Guide: pip and virtual environments](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/) | 공식 문서 | 2026-05-31 | Python dependency는 venv 같은 격리 환경에서 설치하는 기본 기준 |
| [OpenSSF Scorecard](https://openssf.org/scorecard/) | 공식/오픈소스 보안 기준 | 2026-05-31 | 유지보수, 보안 정책, 취약점 관리 같은 오픈소스 위험 신호 확인 |
| [CISA Open Source Software Security](https://www.cisa.gov/opensource) | 공식 보안 기관 | 2026-05-31 | 오픈소스 사용 시 supply-chain 위험과 보안 고려 |
| [CISA Secure by Demand Guide](https://www.cisa.gov/resources-tools/resources/secure-demand-guide) | 공식 보안 가이드 | 2026-05-31 | software acquisition에서 보안 요구사항을 공급자와 사용자 책임으로 기록 |

## 도출한 인사이트

- 성숙한 오픈소스가 작업에 맞으면 설치를 피할 이유가 없다. 다만 설치는 dependency 관리와 검증까지 포함해야 한다.
- Python에서는 전역 설치보다 project-local venv 또는 dependency file 기반 설치가 기본이다.
- 보안 검토는 취약점만 보지 않고 유지보수 상태, provenance, 보안 정책, 릴리스 활동을 함께 본다.
- 설치 기록은 나중에 제거하거나 교체할 수 있도록 rollback 계획을 포함해야 한다.

## 플랫폼 반영

- `_docs/policies/open-source-installation-policy.ko.md`와 `.en.md`를 추가한다.
- `agent-platform/configs/open-source/candidate-template.json`에 설치 기록 필드를 추가한다.
- `OpenSourceCandidate` 평가에 설치 준비 상태를 추가한다.
- 지속 지시, AGENTS, README, coding research workflow에 설치 규칙을 반영한다.

## 남은 주의점

- 실제 설치 명령은 네트워크와 파일시스템 권한이 필요할 수 있으므로, 도구 권한 정책에 따라 필요한 경우 승인을 요청한다.
- 전역 설치는 workspace 재현성을 해치기 쉬우므로 예외로 둔다.
