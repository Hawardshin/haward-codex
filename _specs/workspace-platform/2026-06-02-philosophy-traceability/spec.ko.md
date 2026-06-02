# 스펙: 철학 원칙 실행 추적성

## 목적

철학 원칙이 문서에만 남지 않고, 정책/워크플로/설정/도구/평가로 실행되도록 추적 가능한 구조를 만든다.

## 요구사항

- `REQ-WS-076`을 따른다.
- 15개 핵심 철학 원칙은 stable id를 가진다.
- 각 원칙은 철학 원문 위치, 실행 대상, 검증 대상을 가진다.
- 실행 대상 path는 실제로 존재해야 한다.
- 설정 파일은 self-documenting config contract를 통과해야 한다.
- philosophy trace check는 workspace-health에 포함되어야 한다.

## 비범위

- 철학 원칙 자체의 대규모 재작성
- 원칙별 모든 검증 명령을 trace checker가 직접 실행하는 구조
- 제품 UI 변경
