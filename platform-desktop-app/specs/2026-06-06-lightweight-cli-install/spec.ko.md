# Spec: Lightweight CLI Install

## 목표

`awp`라는 작은 companion CLI를 제공하고 `~/.local/bin/awp`로 user-local 설치한다.

## 언어/런타임 비교

- Python 표준 라이브러리: 외부 dependency 없음, 빠른 설치, macOS 기본 개발 환경에서 즉시 실행 가능. 단일 파일 CLI에 적합하다.
- Rust binary: 단일 실행 파일 배포가 가능하지만 Cargo binary target, cross-platform packaging, release artifact 관리가 추가된다.

선택: Python 표준 라이브러리. 이유는 이번 요구가 “가벼운 CLI 설치”이며 새 dependency나 binary release 표면을 늘릴 필요가 없기 때문이다.

## 폴더 구조 비교

- `platform-desktop-app/tools/awp/`: 프로젝트 전용 보조 CLI로 소유권이 분명하다.
- `_tools/awp/`: workspace-wide tool로 재사용성은 크지만 데스크톱 앱 사용 흐름과 멀어진다.

선택: `platform-desktop-app/tools/awp/`.

## 명령

- `awp doctor --json`
- `awp cli-check --json`
- `awp open [path]`
- `awp reveal [path]`
- `awp terminal [path]`

## 설치

- 설치 스크립트: `platform-desktop-app/scripts/install-awp-cli.mjs`
- 설치 명령: `pnpm --dir platform-desktop-app cli:install`
- 설치 위치: `~/.local/bin/awp`
- rollback: `rm ~/.local/bin/awp`
