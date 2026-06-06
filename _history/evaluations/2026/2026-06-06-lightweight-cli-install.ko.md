# Evaluation: Lightweight CLI Install

날짜: 2026-06-06

## 사용자 요구 대비

요구: CLI도 가벼운 CLI 설치를 도와준다.

결과: `awp` lightweight CLI를 구현하고 `/Users/shinjoungeun/.local/bin/awp`로 설치했다. `doctor`, `cli-check`, `open`, `reveal`, `terminal` 명령을 제공한다.

## 설치 평가

- 외부 dependency 설치 없음.
- Python 표준 라이브러리만 사용한다.
- user-local symlink 설치로 rollback이 단순하다.
- `~/.local/bin`은 현재 PATH에 없으므로 shell 설정 자동 수정은 하지 않았다.

## 검증

초기 CLI 실행, 실제 설치, package test, registry contract, desktop check, internal package 검증이 통과했다.

- `pnpm --dir platform-desktop-app test`: 통과
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../_ops/installations/registry.json`: 통과
- `pnpm --dir platform-desktop-app check`: 통과. 기존 public release gate 경고는 유지된다.
- `pnpm --dir platform-desktop-app package:internal`: 통과. 내부 `.app`과 DMG 생성 및 검증 완료.
