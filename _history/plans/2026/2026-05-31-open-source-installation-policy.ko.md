# 오픈소스 설치 정책 계획

## 초기 지시

사용자가 "만약 필요하다면 오픈소스 설치도 필요해"라고 지시했다.

## 목표

오픈소스를 단순히 검토하는 수준을 넘어, 필요하면 설치까지 진행하는 지속 규칙을 저장소 운영 정책과 agent-platform 검사 모델에 반영한다.

## 검색 질문

- Python 오픈소스 패키지는 어떤 방식으로 안전하게 설치해야 하는가?
- 오픈소스 dependency 채택 전에 어떤 보안/라이선스 신호를 확인해야 하는가?
- 이 저장소의 기존 오픈소스 평가 모델에 어떤 설치 필드를 추가해야 하는가?

## 사용한 검색 채널

- 웹 검색
- Python Packaging 공식 문서 확인
- OpenSSF/CISA 보안 자료 확인
- 저장소 검색

## 확인한 출처

- [Python Packaging User Guide](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/)
- [OpenSSF Scorecard](https://openssf.org/scorecard/)
- [CISA Open Source Software Security](https://www.cisa.gov/opensource)
- [CISA Secure by Demand Guide](https://www.cisa.gov/resources-tools/resources/secure-demand-guide)
- `agent-platform/docs/open-source-integration.md`
- `agent-platform/configs/open-source/candidate-template.json`
- `AGENTS.md`

## 계획 단계

1. 오픈소스 설치 정책 한국어/영어 문서를 추가한다.
2. 지속 지시, AGENTS, README, 운영 모델, coding research prompt/workflow에 설치 규칙을 반영한다.
3. `OpenSourceCandidate`에 설치 준비 필드를 추가하고 평가 결과에 installation status/gaps를 포함한다.
4. 후보 템플릿에 설치 scope, install command, dependency record path, security/license review, rollback plan을 추가한다.
5. 리서치 노트, 히스토리, 평가 보고서, 맵을 갱신한다.
6. 테스트와 CLI 검증 후 커밋하고 push한다.

## 검증 계획

- `agent-platform` unit tests
- `score-oss` CLI
- `check-memory-bootstrap`
- `check-config-contract`
- JSON syntax checks
- workspace/task board checks
- hallucination guard와 work evaluator

## 위험

- 실제 dependency 설치는 네트워크/권한이 필요할 수 있으므로, 필요한 경우 도구 권한 정책에 따라 승인 요청이 필요하다.
- 전역 설치는 재현성을 해칠 수 있으므로 예외로 둔다.
