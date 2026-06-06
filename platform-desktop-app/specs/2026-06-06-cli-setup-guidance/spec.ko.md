# CLI 설정 안내 스펙

## 목표

사용자가 CLI 문법을 몰라도 앱 안에서 선택한 CLI의 설치, 로그인/키, 검증, 실행 흐름을 따라갈 수 있게 한다.

## 범위

- `workspace-monitor` 설정 모달의 `execution > adapter` 서브섹션
- `DesktopRuntimePanel`의 Agent CLI Cockpit
- 정적 계약 테스트와 스타일

## 제외

- 실제 CLI 자동 설치
- 새로운 외부 CLI 의존성 설치
- provider secret 저장 방식 변경
- 멀티프로세스 실행 엔진 변경

## 기능

- `AdapterSetupGuide`에 로그인/키 힌트, 첫 실행 명령, 기대 결과를 추가한다.
- 기본 CLI 어댑터 설정을 단계형 카드와 명령 복사 행으로 바꾼다.
- Cockpit 카드마다 준비 단계 ladder와 복사 가능한 명령 버튼을 추가한다.
- 계정 연결 상태는 `providerAuthStatusForAdapter`와 별도 boolean helper로 반영한다.

## 성공 조건

- CLI 설정이 텍스트 설명만이 아니라 선택 가능한 단계와 명령 후보로 보인다.
- 누락 CLI는 `설치 필요`, `계정 필요`, `검증 필요`처럼 다음 행동을 드러낸다.
- 설치/검증/첫 실행 명령 복사는 실제 실행과 분리된다.
