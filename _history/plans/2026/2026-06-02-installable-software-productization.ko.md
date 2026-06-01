# 설치형 소프트웨어 제품화 계획

## 작업 모드

- `governance`

## 목표

플랫폼을 사용자가 설치하는 소프트웨어로 만들기 위한 별도 프로젝트와 운영 기준을 만든다.

## 계획

1. 웹 검색으로 desktop packaging 공식 문서를 확인한다.
2. 기존 `install_mode`와 end-user installer packaging을 분리한다.
3. 새 루트 프로젝트 `platform-desktop-app/`를 만든다.
4. desktop distribution registry, 제품 경계, 패키징 전략, 프로젝트 요구사항/스펙을 작성한다.
5. 공유 정책, workflow, prompt, router, index, memory bootstrap, persistent instructions를 갱신한다.
6. 요구사항 기준선, 변경/검토 기록, 히스토리, trace, evaluation을 남긴다.
7. 검증 후 commit/push한다.

## 결정

- 이번 턴은 구조화와 제품화 기준 수립까지만 수행한다.
- 실제 Tauri/Electron 설치와 prototype 구현은 하지 않는다.
- 첫 추천은 Tauri-first prototype이지만 final decision은 다음 조사/구현 단계로 남긴다.
