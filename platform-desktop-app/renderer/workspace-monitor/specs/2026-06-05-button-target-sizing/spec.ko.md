# 스펙: 버튼 클릭 타깃 크기 정리

## 목표

- Workspace Monitor 데스크톱 제품 UI에서 반복 액션 버튼이 너무 작거나 영역별로 다르게 보이는 문제를 줄인다.
- 클릭 타깃은 일반 액션 44px, compact toolbar 40px, dense tree row 32px를 기본으로 한다.
- coarse pointer 또는 720px 이하 화면에서는 일반 액션 48px, compact 44px, dense 40px로 올린다.

## 범위

- `app/globals.css`의 공통 control token
- Source editor controls, command toolbar, workbench switcher, workspace explorer actions/tree rows
- task pipe, decision, search/agent action, segmented/chip/operator/command action 버튼

## 제외

- 상태 badge, icon-only decoration, data pill의 시각 크기
- 레이아웃 구조 또는 기능 흐름 변경
