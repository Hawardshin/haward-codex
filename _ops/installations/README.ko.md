# 설치 레지스트리

이 폴더는 오픈소스 도구, 라이브러리, 런타임, Codex skill/plugin처럼 환경을 바꾸는 설치 작업을 추적한다.

## 파일

- `registry.json`: 설치 기록 인덱스와 운영 규칙
- `agent-platform/configs/installations/install-mode-registry.json`: 사용자용 설치와 개발자용 설치 경로
- `_history/installations/YYYY/`: 설치별 상세 감사 기록
- `_templates/installation-record/`: 새 설치 기록 템플릿

## 핵심 규칙

- 실제 설치를 하기 전에 설치 기록 초안을 만든다.
- 설치 후에는 실제 설치 명령, 설치 범위, 버전/lock 상태, 변경된 dependency 파일, 검증 결과, rollback 방법을 업데이트한다.
- 전역 설치는 기본적으로 금지한다. 꼭 필요하면 이유, 설치 위치, 제거 방법, 권한 승인 여부를 기록한다.
- 설치 작업을 닫을 때 `work-evaluator-agent` 입력에 `installation_occurred=true`와 `installation_record_targets`를 포함한다.
- 설치 기록 없이 "설치 완료"라고 보고하지 않는다.
- 설치 전에 먼저 `install_mode`를 구분한다. 플랫폼 사용/보기/배포는 `user`, 플랫폼 개선/소스 수정/검증 harness 변경은 `developer`를 사용한다.
- `install_mode`는 환경 준비 범위이고, `work_mode`는 작업 close-out 강도다. 둘을 혼동하지 않는다.

## 읽는 방법

1. `registry.json`에서 설치 항목과 상세 기록 파일을 찾는다.
2. 상세 기록에서 설치 이유, 정확한 명령, dependency 파일, 검증, rollback을 확인한다.
3. 실제 변경은 연결된 커밋과 프로젝트 dependency 파일에서 확인한다.
4. 설치 경로를 고를 때는 `agent-platform/configs/installations/install-mode-registry.json`을 열고 `user` 또는 `developer` 모드를 선택한다.
