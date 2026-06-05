# 사용자 요청 요약: 탭 전환이 아직 느림

## 요약

사용자가 현재 데스크톱 앱의 Workspace Monitor 탭 전환이 여전히 느리다고 보고했다. 이전의 전체 탭 resident/preload 구현 이후에도 체감 지연이 남아 있으므로 근본 원인을 다시 보고 성능 구조를 보정해야 한다.

## 요구사항 후보

- 탭 이동 시 hidden 탭의 불필요한 렌더 비용을 줄인다.
- 데스크톱 앱의 장점인 Rust/native resource warmup과 renderer memory preload는 유지한다.
- 구현 후 사용자가 직접 빌드하지 않아도 되도록 자동 build/package 검증을 수행한다.

## 결과 연결

- 요구사항: `platform-desktop-app/docs/requirements/2026-06-06-bounded-tab-resident-performance.ko.md`
- 스펙: `platform-desktop-app/specs/2026-06-06-bounded-tab-resident-performance/`
- 검증: `platform-desktop-app/specs/2026-06-06-bounded-tab-resident-performance/validation.ko.md`
