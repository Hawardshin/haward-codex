# 설치 감사 기록 강화 계획

## 초기 지시

사용자가 "특히 설치의 경우는 더"라고 지시했다. 이는 Codex가 무엇을 했는지 문서로 쉽게 알 수 있어야 하며, 설치 작업은 특히 더 자세히 추적해야 한다는 의미로 해석했다.

## 조사 먼저

- Python Packaging User Guide와 Python 공식 문서로 project-local venv, dependency file, system Python 설치 위험을 확인했다.
- npm package-lock 문서로 lock 파일이 동일한 dependency tree 재현과 변경 가시성을 제공한다는 점을 확인했다.
- OWASP Developer Guide와 CycloneDX로 dependency/SBOM 메타데이터의 필수 항목을 확인했다.
- OpenSSF Scorecard로 설치 전 오픈소스 보안 posture 검토 신호를 확인했다.

## 로컬 확인

- 기존 `_docs/open-source-installation-policy.*`에는 설치 명령, dependency 파일, 보안/라이선스, rollback 요구가 있었다.
- 하지만 설치별 상세 감사 기록 위치, 설치 registry, 평가 입력의 설치 기록 target은 없었다.
- `work-evaluator-agent`는 작업 요약 target은 검사하지만 설치 발생 여부와 설치 기록 target은 검사하지 않았다.

## 계획

1. `_ops/installations/registry.json`을 self-documenting 설치 registry로 추가한다.
2. `_history/installations/`에 설치별 상세 기록 규칙을 추가한다.
3. `_templates/installation-record/`에 한영 Markdown 템플릿과 JSON entry 템플릿을 만든다.
4. 설치 정책, 지속 지시, AGENTS, README, 운영 인덱스, close/evaluation workflow를 갱신한다.
5. `work-evaluator-agent`에 `installation_occurred`와 `installation_record_targets`를 추가한다.
6. 오픈소스 후보 평가에 설치 기록 path, 환경 path, version/lock 상태, post-install verification을 추가한다.
7. 리서치, 작업 요약, 평가 보고서를 남기고 검증 후 커밋/push한다.

## 적용 결정

- 실제 설치가 없을 때는 설치 기록을 요구하지 않는다.
- 실제 설치가 있으면 `installation_occurred=true`를 평가 입력에 명시하고, 기록 target이 없으면 blocking gap으로 처리한다.
- 설치 registry는 empty entries여도 유지한다. 아직 설치가 없다는 사실도 명시적인 상태이기 때문이다.
