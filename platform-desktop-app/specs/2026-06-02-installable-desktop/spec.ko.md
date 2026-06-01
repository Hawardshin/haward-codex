# 설치형 데스크톱 앱 구조 스펙

## 목표

플랫폼을 설치형 소프트웨어로 만들기 위한 독립 프로젝트와 기본 배포 판단 구조를 만든다.

## 범위

- 새 루트 프로젝트 `platform-desktop-app/`
- self-documenting desktop distribution registry
- 제품 경계 문서
- 패키징 전략 문서
- project-local requirements/specs
- 공유 운영 정책, router, history, evaluation 연결

## 비범위

- Tauri/Electron 설치
- 실제 desktop app 구현
- signing certificate 준비
- 배포 파이프라인 구현

## 결정

첫 방향은 Tauri-first desktop shell이다. 다만 최종 결정은 아직 잠그지 않는다. Electron과 native packaging-only 경로를 비교 후보로 유지한다.

## 성공 기준

- 프로젝트가 `_ops/projects/registry.json`에 등록된다.
- desktop distribution registry가 `reader_guide`, `reference_links`, `structure_rules`, `field_guide`를 포함한다.
- `install_mode`와 installer packaging의 차이가 문서에 명확히 남는다.
- release gate가 macOS/Windows/Linux를 고려한다.
- 실제 설치가 없었다는 점이 기록된다.
