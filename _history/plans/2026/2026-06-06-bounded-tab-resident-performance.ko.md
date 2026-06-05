# 작업 계획 기록: bounded tab resident 성능 보정

## 모드 선택

- work_mode: `standard`
- 선택 이유: UI 성능 구현, resource lifecycle, build/package verification이 포함된 의미 있는 변경이다.
- view_mode: `superadmin_developer`
- install_mode: `developer`

## hot anchors

- `agent-platform/configs/memory/bootstrap-manifest.json`
- `agent-platform/configs/workflows/work-mode-registry.json`
- `_ops/workflows/05-web-first-intake.md`
- `_ops/workflows/68-omission-prevention.md`
- `_ops/workflows/69-resource-leak-prevention.md`

## 계획 요약

1. React/Next 성능 공식 문서를 확인한다.
2. 기존 resident preload 구현에서 hidden mounted section 누적 비용을 찾는다.
3. resident section을 bounded cap으로 바꾸고 source state를 보존한다.
4. module/data/native prewarm은 유지한다.
5. 성능 감사와 build/package 검증을 실행한다.
