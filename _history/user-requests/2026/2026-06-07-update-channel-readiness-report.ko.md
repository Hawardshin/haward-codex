# 2026-06-07 사용자 요청 요약: 이어서 기능 구현

## 요청 요약

- 직전 기능 이슈 구현 이후 계속해서 기능 구현을 이어 달라는 요청.

## 선택한 구현

- Service Readiness가 update-channel marker 존재 여부만 단순 경고로 보여주던 상태에서, 앱이 bundled updater marker/manifest를 구조화해 표시하도록 개선.

## 범위

- Rust runtime에서 service update channel report 생성.
- TypeScript Service Readiness report 타입 확장.
- Service Readiness UI에 update channel 상태, endpoint 수, public key hash, static manifest, signing key source, marker path 표시.
- readiness/test 계약 갱신.

## 비범위

- 실제 public updater endpoint 호출, 업데이트 다운로드/설치, Developer ID signing, notarization, clean-machine smoke.
