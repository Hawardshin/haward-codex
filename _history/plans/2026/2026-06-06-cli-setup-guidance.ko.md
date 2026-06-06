# 계획 기록: CLI 설정 안내 개선

- 날짜: 2026-06-06
- 작업 모드: `standard`
- view_mode: `superadmin_developer`
- install_mode: `developer`

## 결정

- 설정 모달과 Agent CLI Cockpit을 동시에 개선한다.
- 실제 CLI 자동 설치는 하지 않는다.
- 명령 복사와 실제 실행은 분리한다.
- 새 장기 실행 리소스는 만들지 않는다.

## 근거

- Fluent 2 온보딩은 맥락형 안내, 선택 가능한 단계, 예상 결과 표시를 권장한다.
- Microsoft command guidance는 관련 명령을 작업 대상 가까이에 배치하는 방향과 맞다.
- 기존 CLI adapter registry는 optional CLI 누락 시 graceful degrade를 요구한다.
