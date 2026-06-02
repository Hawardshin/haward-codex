# Workspace Platform Philosophy 발표 스펙

- 날짜: 2026-06-02
- 소유 프로젝트: `presentation-agent`
- 작업 모드: `standard`
- 산출물: 30분 발표 스크립트, HTML 발표 덱, 근거/검증 기록

## 목적

지금까지의 대화, 히스토리, 철학 문서를 바탕으로 이 저장소가 어떤 문제를 해결하려고 시작됐는지, 어떤 설계 철학과 핵심 원칙으로 플랫폼화되고 있는지 설명하는 30분 발표 자료를 만든다.

## 범위

- 먼저 한국어 발표 스크립트를 완성한다.
- 이후 같은 구조를 `deck-spec` JSON으로 옮겨 HTML 발표 자료를 생성한다.
- 발표의 중심 근거는 저장소 내부 철학/운영/히스토리 문서다.
- 외부 근거는 에이전트 단순성, tracing, guardrail, AI 위험관리, 인간중심 AI 관점을 보강하는 용도로만 사용한다.
- 이번 작업은 PPTX 파일 생성이 아니라 HTML 발표 자료 생성을 완료 범위로 한다.

## 요구사항

- `REQ-PRES-010`: 플랫폼의 시작 문제, 원인, 설계 철학, 핵심 원칙을 빠뜨리지 않고 설명한다.
- `REQ-PRES-011`: 약 30분 발표를 전제로 슬라이드별 발표 스크립트를 먼저 완성한다.
- `REQ-PRES-012`: 완성된 스크립트를 기반으로 HTML 발표 덱을 생성한다.
- `REQ-PRES-013`: 저장소 내부 출처와 외부 출처를 분리해 출처 노트를 남긴다.
- `REQ-PRES-014`: 생성 HTML은 기존 `presentation-agent` 브라우저 검증 흐름으로 확인한다.

## 비범위

- 고해상도 이미지 생성.
- 외부 공개용 개인정보/로컬 경로 redaction 완전 자동화.
- editable PPTX 산출물.
- 새로운 발표 렌더러 개발.

## 성공 기준

- 발표 스크립트가 별도 문서로 존재한다.
- `workspace-platform-philosophy.ko.json` deck spec이 생성된다.
- `workspace-platform-philosophy.html`이 생성되고 browser validation 대상에 포함된다.
- 근거 기록, 계획 기록, 누락 방지 기록, grounding 기록, 평가 기록이 남는다.
