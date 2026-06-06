# Web Search: Lightweight CLI Install

날짜: 2026-06-06

## 질의

- Python argparse official documentation command line interface
- Python console_scripts entry points official packaging documentation
- Rust clap official documentation command line parser

## 확인한 출처

- Python argparse 공식 문서: Python 표준 라이브러리 CLI parser로 subcommand/error handling을 제공한다. https://docs.python.org/3.12/library/argparse.html
- Python Packaging entry points: 설치 후 shell command를 만드는 console script 개념 확인. https://packaging.python.org/en/latest/specifications/entry-points/
- Python Packaging pyproject spec: `[project.scripts]`가 console scripts와 연결된다는 공식 설명 확인. https://packaging.python.org/en/latest/specifications/pyproject-toml/
- Rust clap 공개 repo/docs: Rust CLI parser 옵션으로 비교했으나 이번 요구에는 dependency/build 표면이 더 크다고 판단. https://github.com/clap-rs/clap

## 계획 영향

새 패키지 설치 없이 Python 표준 라이브러리 `argparse` 기반 단일 파일 CLI를 선택했다. 설치는 package entry point가 아니라 user-local symlink 방식으로 단순화했다.
