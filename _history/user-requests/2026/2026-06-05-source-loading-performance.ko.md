# 사용자 요청 요약: Source Loading Performance

## 요약

사용자는 코드 불러오기 쪽이 너무 느리다고 보고, 체감 성능 문제를 해결해 달라고 요청했다.

## 분류

- request_type: implementation_fix
- work_mode: ship_first
- affected_project: `platform-desktop-app/renderer/workspace-monitor`

## 해석

- "코드 불러오는 쪽"은 Workspace Monitor Source/desktop source editor의 파일 catalog와 코드 열기 경로로 해석했다.
- 실제 병목으로 확인한 source catalog scan timing, 중복 file list 렌더링, 기본 expanded tree 렌더링을 고쳤다.
