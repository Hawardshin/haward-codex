# 설치형 앱 사용자 플로우 스펙

## 목표

설치형 에이전트 플랫폼을 사용자가 처음 실행했을 때 워크스페이스를 열고, 현재 상태를 보고, 작업을 시작하고, 막힌 질문과 결과를 추적할 수 있는 제품 흐름을 정의한다.

## 범위

- 사용자 플로우 설정 파일
- 첫 실행 온보딩
- 홈 정보 구조
- 작업 실행 timeline
- decision inbox
- 개발자/슈퍼어드민 보기
- 실패 복구
- HTML 플로우 맵

## 비범위

- Tauri/Electron 실제 설치
- native installer 빌드
- signing/notarization/update 구현
- 실제 subprocess runner 구현
- secret storage 구현

## 결정

- 첫 가치 기준은 “전체 설정 완료”가 아니라 “워크스페이스 대시보드 도착”이다.
- 기본 사용자는 `user` view mode를 사용한다.
- 선택 CLI, 알림, 브라우저 자동화, 고급 검증은 capability card로 보류 가능해야 한다.
- 슈퍼어드민 개발자 흐름은 raw config, validator, release gate, source provenance를 볼 수 있어야 한다.

## 성공 기준

- `platform-desktop-app/configs/user-flow-registry.json`이 self-documenting config 형식으로 존재한다.
- 첫 실행 흐름이 열기/만들기/데모, 워크스페이스 범위 확인, 보기 모드, readiness scan, dashboard 도착을 포함한다.
- 작업 실행 흐름이 단계, 시간, 에이전트, 산출물, 결정, 근거, 검증, 커밋/푸시 상태를 포함한다.
- 실패 복구가 워크스페이스, 선택 CLI, 사용자 결정, 스냅샷, 업데이트 문제를 포함한다.
- 한국어/영어 문서와 HTML 플로우 맵이 존재한다.
