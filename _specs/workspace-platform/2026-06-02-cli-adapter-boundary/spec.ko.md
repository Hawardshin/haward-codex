# 스펙: CLI 어댑터 경계

## 목적

설치형 플랫폼이 특정 CLI에 종속되지 않으면서 다양한 CLI를 활용할 수 있는 공통 경계를 만든다.

## 요구사항

- `REQ-WS-053`

## 범위

- CLI adapter registry 추가
- CLI adapter policy 추가
- installable desktop product boundary와 runtime strategy 보강
- routing workflow/prompt 추가
- memory bootstrap anchor 연결
- 요구사항, 히스토리, 평가, 타이밍 기록 연결

## 비범위

- 실제 CLI 실행기 구현
- Codex/Claude/Cursor/GitHub/Vercel 등 특정 CLI dependency 설치
- desktop shell에서 실제 로컬 명령 실행

## 성공 기준

- CLI는 플랫폼 본체가 아니라 optional attached capability로 정의된다.
- missing CLI는 전체 실패가 아니라 `capability_missing`으로 처리된다.
- required/bundled/global CLI 승격 전 설치 감사와 rollback이 요구된다.
- 새 registry가 self-documenting config contract를 통과한다.
