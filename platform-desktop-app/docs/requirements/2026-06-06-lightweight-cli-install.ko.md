# Requirement: Lightweight CLI Install

날짜: 2026-06-06

## 요구

플랫폼 데스크톱 앱을 보조하는 가벼운 CLI를 설치해, 터미널에서도 작업공간 상태 점검과 OS 기본 동작 실행을 빠르게 할 수 있어야 한다.

## 수용 기준

- 외부 런타임 의존성을 추가하지 않는 lightweight CLI를 제공한다.
- CLI는 user-local install 경로로 설치한다.
- CLI는 `doctor`, `cli-check`, `open`, `reveal`, `terminal` 명령을 제공한다.
- OS action 대상은 작업공간 내부로 제한하고 `_private/`, `outputs/`를 차단한다.
- 설치 스크립트는 dry-run과 충돌 방지를 제공한다.
- 설치 감사 기록과 rollback 경로를 남긴다.
