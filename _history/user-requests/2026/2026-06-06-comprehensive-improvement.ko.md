# 2026-06-06 사용자 요청 요약

## 요약

사용자는 누적된 성능, UI, 기능, 사용성, 디자인, 네이티브 자원 활용, EVAL, 오픈소스 참고, 기록 기반 개선 요구를 종합해 전체 개선을 요청했다.

## 해석

- 전 저장소 무차별 변경이 아니라, 실제 제품에서 종합 개선을 계속 판단하고 우선순위를 정할 수 있는 구조가 필요하다.
- 기존 `platform-desktop-app`의 EVAL 탭이 현재 작업, 히스토리, 토큰/툴, 오픈소스 EVAL 후보를 이미 모으므로 첫 구현 slice로 적합하다.

## 적용 범위

- `platform-desktop-app/renderer/workspace-monitor` EVAL surface.
- 정적 계약 검사, 테스트, snapshot, build/package 검증.
