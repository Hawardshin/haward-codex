# 요구사항 변경: 미뤄둔 구현 큐 폐쇄

- 날짜: 2026-06-08
- 변경 유형: product split / desktop runtime / Git workspace management / deferred queue closure

## 요구사항

사용자가 미뤄둔 구현을 다시 지시했으므로, 이전 구조 개편에서 후속으로 남겨둔 항목을 실제 동작 가능한 범위까지 구현하고 추적 기록을 닫는다.

## 승인 기준

- 프로젝트 관리 데스크톱 앱은 기존 Git 저장소 import/clone뿐 아니라 새 Git workspace 생성도 런타임 명령으로 지원한다.
- 프로젝트 관리 화면은 분리된 release unit과 managed workspace topology를 보여주고 정적 smoke test로 검증된다.
- 작업 히스토리 ledger는 기존 workspace history와 호환되는 색인과 첫 shadow copy batch를 가진다.
- agent/tool/Ollama/provider 관리 기능은 별도 데스크톱 앱에서 developer shell로 실행 가능해야 한다.
- 설치가 발생한 오픈소스 의존성은 설치 audit와 registry에 기록한다.
- public release signing/notarization은 외부 자격 증명과 배포 계정이 필요한 gate로 분리해 false readiness를 주장하지 않는다.
- 각 분리된 project repository와 root superproject를 각각 commit/push한다.

## 비범위

- macOS public distribution notarization, Developer ID signing, auto-update channel 운영은 이번 구현에서 완료로 주장하지 않는다.
- agent-tool desktop app은 end-user public release가 아니라 developer-local shell로 한정한다.
- root repository history rewrite는 수행하지 않는다.
