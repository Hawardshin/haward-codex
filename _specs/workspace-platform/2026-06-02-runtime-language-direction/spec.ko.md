# 스펙: 런타임/언어 방향

## 목적

`REQ-WS-051`을 반영해 플랫폼 컴포넌트별 언어/런타임 선택 기준을 저장소에 남긴다.

## 요구사항

- `REQ-WS-051`

## 동작 원칙

- Python, TypeScript/Next.js, Rust/Tauri, Go, Electron을 일괄 표준으로 삼지 않는다.
- 컴포넌트 경계와 측정 가능한 병목을 기준으로 선택한다.
- 현재 기본 방향은 Python agent layer, TypeScript/Next.js UI, Rust/Tauri desktop shell, Go local service/CLI, Electron fallback이다.
- Rust/Go 전환 전에는 prototype measurement와 rollback plan을 기록한다.

## 변경 대상

- `agent-platform/configs/runtime/language-decision-registry.json`
- `_docs/policies/runtime-language-selection-policy.*.md`
- `platform-desktop-app/configs/desktop-distribution-registry.json`
- `platform-desktop-app/docs/packaging-strategy.*.md`
- 요구사항, 스펙, 히스토리, 평가 기록

## 수용 기준

- 새 language decision registry가 self-documenting config contract를 통과한다.
- desktop distribution registry가 Go/Wails/local service 후보를 포함한다.
- 정책 문서는 한영 companion으로 존재한다.
- memory bootstrap이 런타임 언어 방향을 warm anchor로 포함한다.
- 웹 검색/조사/평가 기록이 근거와 한계를 남긴다.
