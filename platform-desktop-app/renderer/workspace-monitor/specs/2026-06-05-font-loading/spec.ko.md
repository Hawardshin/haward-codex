# Workspace Monitor 폰트 로딩 개선 Spec

## 목적

Workspace Monitor의 한글 UI가 시스템 폰트 우연성에 의존하지 않고, 앱 번들에 포함된 Pretendard Variable을 우선 사용하게 한다.

## 요구사항

- REQ-WM-035: self-hosted `Pretendard Variable` 우선 폰트 스택과 역할 기반 typography scale을 유지한다.
- REQ-WM-014: 운영 대시보드의 조용하고 신뢰 가능한 visual tone을 유지한다.

## 설계 결정

- `pretendard@1.3.9` 공식 패키지를 프로젝트 로컬 dependency로 고정한다.
- `pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css`를 `app/layout.tsx`에서 전역 import한다.
- `@fontsource/pretendard@5.2.5`는 local package inspection 결과 `latin` subset만 제공해 한글 UI 목적에 맞지 않으므로 최종 의존성에서 제외한다.
- 기본 body line-height는 1.5로 맞추고, 폰트 smoothing을 명시해 운영 UI 텍스트의 균일한 가독성을 높인다.

## 비범위

- 전체 컴포넌트 typography scale 재설계는 기존 Typography Scale 작업 범위로 유지한다.
- 폰트 subset 생성 파이프라인을 새로 만들지 않는다.
