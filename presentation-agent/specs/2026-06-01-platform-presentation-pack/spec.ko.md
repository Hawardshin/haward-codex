# 스펙: 플랫폼 발표 팩

## 목적

`presentation-agent`를 사용해 현재 workspace platform을 설명하는 발표 자료를 준비한다. 전체 플랫폼 발표와 등록된 루트 프로젝트별 발표를 별도 산출물로 만든다.

## 요구사항

- `REQ-PA-006`: 스크립트 협업형 HTML 덱
- `REQ-PA-007`: 레퍼런스 기반 디자인 적용
- `REQ-PA-010`: 플랫폼/프로젝트 발표 팩

## 범위

- 전체 플랫폼 발표 deck-spec 및 HTML
- `agent-platform` 프로젝트 발표 deck-spec 및 HTML
- `workspace-monitor` 프로젝트 발표 deck-spec 및 HTML
- `presentation-agent` 프로젝트 발표 deck-spec 및 HTML
- 발표 순서와 스크립트 사용 가이드
- 작업별 source notes

## 비범위

- 외부 이미지나 로고 다운로드
- 새로운 발표 디자인 템플릿 대량 수집
- artifact-tool PPTX 최종 export

## 수용 기준

- 4개 deck-spec이 `html_deck` validator를 통과한다.
- 4개 HTML 발표 산출물이 생성된다.
- 각 덱은 발표자 노트와 `script_beat`를 포함한다.
- 전체 덱은 플랫폼 철학, 운영 루프, 프로젝트 구조, 리서치/요구사항/스펙/평가/히스토리/도구화 구조를 다룬다.
- 프로젝트별 덱은 등록된 3개 루트 프로젝트를 각각 다룬다.
