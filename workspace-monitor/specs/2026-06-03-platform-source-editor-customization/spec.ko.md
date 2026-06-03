# 스펙: 플랫폼 소스 에디터 커스터마이징

## 목적

데스크톱 Source Review는 범용 웹 코드 뷰어가 아니라 이 플랫폼을 구축하는 개발자/슈퍼어드민 작업면이어야 한다. 사용자는 요구사항, 스펙, 검증 기록, Tauri command, agent config, decision item 같은 반복 작업을 에디터 안에서 바로 시작하고, 현재 드래프트를 에이전트에게 넘길 수 있는 패치 컨텍스트로 복사할 수 있어야 한다.

## 기능 범위

- Monaco editor를 기존 편집 엔진으로 유지한다.
- 데스크톱 source editor에 플랫폼 템플릿 selector와 `Insert Template` action을 추가한다.
- 현재 파일 경로를 기준으로 Requirements, Spec Work, Runtime Command, Platform Config, Validation, Source Patch 프로필을 추천한다.
- 패치 컨텍스트 복사는 경로, 프로필, 템플릿, dirty 상태, diff 요약, backup gate, 드래프트 본문을 포함한다.
- Monaco theme와 editor option은 데스크톱 workbench tone, bracket/ruler/sticky-scroll 같은 개발자 기본값을 제공한다.

## 비목표

- VS Code 전체를 임베드하거나 별도 오픈소스 앱을 클론하지 않는다.
- Tauri scoped write와 backup gate 없는 순수 브라우저 저장 기능을 만들지 않는다.
- 언어 서버, Git diff stage, multi-cursor 고급 자동화까지 이번 범위에서 구현하지 않는다.

## 수용 기준

- Runtime Source Review 패널에 `source-customization-bar`가 표시된다.
- 열린 파일 경로에 따라 추천 템플릿과 프로필이 바뀐다.
- 템플릿 삽입은 Monaco selection 또는 드래프트 끝에 반영되고 dirty diff에 잡힌다.
- 패치 컨텍스트 복사는 에이전트 handoff에 필요한 메타데이터를 포함한다.
- `pnpm run check`, `pnpm run build:customer`, `pnpm run perf:budget`, `pnpm test`, desktop check/test, Browser smoke가 통과한다.
