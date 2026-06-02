# 웹 검색 기록: 구조 명료화 Overview

## 질의

- `monorepo repository structure best practices official documentation workspace navigation`
- `information architecture navigation usability guidelines official documentation`
- `React application folder structure official docs feature structure`
- `site:nx.dev folder structure monorepo official docs`
- `site:design.va.gov information architecture navigation labeling official`

## 확인한 출처

- VA.gov Design System, Information Architecture: https://design.va.gov/ia/
- Nx, Folder Structure: https://nx.dev/docs/concepts/decisions/folder-structure
- React, Understanding Your UI as a Tree: https://react.dev/learn/understanding-your-ui-as-a-tree

## 판단 요약

- 구조 개선은 폴더를 많이 옮기는 것보다 먼저 조직, 라벨, 현재 위치, 다음 이동 경로를 명확히 해야 한다.
- 모노레포는 완벽한 단일 구조보다 scope별 grouping과 명확한 ownership 설명이 중요하다.
- React UI는 component/module tree로 이해되므로, 사용자가 먼저 보는 화면도 정보 계층을 트리/계층으로 보여줘야 한다.

## 계획 영향

- 이번 slice는 루트 폴더 대규모 이동이 아니라 `structureOverview`와 Structure 탭 재배치로 제한했다.
- Structure 탭은 root folder table보다 Architecture Backbone, Boundary Rules, Pressure를 먼저 보여주게 했다.
- source hotspot은 대규모 파일 분리 후보로 표시하되 이번 변경에서 전면 refactor는 하지 않았다.
