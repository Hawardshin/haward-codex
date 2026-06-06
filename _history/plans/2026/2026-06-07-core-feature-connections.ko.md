# Work Plan: Core Feature Connections

날짜: 2026-06-07

## 모드

- `standard`
- 이유: Desktop app renderer의 의미 있는 UI navigation 동작 변경이며 테스트, 빌드, 브라우저 smoke가 필요하다.

## 단계

1. 웹 우선 intake와 기존 홈/task-intent 구조 확인.
2. 요구사항/spec/trace 기준 작성.
3. CoreFeatureDrilldown connection contract 추가.
4. MonitorShell의 주요 기능 run/connection을 실제 intent step으로 연결.
5. CSS와 static tests 추가.
6. renderer test/check, collect/build/platform check 실행.
7. Browser smoke로 DOM 연결 확인.
8. omission/resource/evaluation guard 실행.
9. commit/push.
