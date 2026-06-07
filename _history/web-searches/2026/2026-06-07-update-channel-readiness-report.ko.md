# 2026-06-07 update channel readiness report 웹 검색 기록

## 검색 목적

- Tauri updater와 bundle resource 동작을 앱 Service Readiness 기능에 연결하기 전, 공식 문서에서 updater와 resource embedding 경계를 확인했다.

## 확인한 출처

- Tauri 공식 문서, Updater: https://v2.tauri.app/ko/plugin/updater/
- Tauri 공식 문서, Embedding Additional Files: https://v2.tauri.app/develop/resources/
- Node.js 공식 문서, File system: https://nodejs.org/api/fs.html

## 계획 영향

- Tauri updater는 public key, endpoint, signed artifact가 있어야 실제 업데이트 체크/설치가 가능하므로 public-ready로 주장하지 않는다.
- 앱이 bundled resource를 읽어 update-channel marker 상태를 보여주는 기능은 외부 secret 없이 구현 가능하므로 이번 slice로 처리했다.
- marker path와 public key hash는 표시하되 private updater key나 Apple credential은 다루지 않는다.

## 약한 출처

- Reddit, Q&A, 블로그는 이번 구현 근거로 사용하지 않았다.

## 불확실성

- 실제 updater 네트워크 체크와 설치 플로우는 public signing/updater endpoint/clean-machine smoke가 필요해 이번 범위 밖이다.
