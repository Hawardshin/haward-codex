# 스펙: 비정형 데이터 정형화

## 요구사항

- `REQ-WS-054`

## 목표

AI의 강점인 비정형/반정형 입력 정형화를 플랫폼 공통 capability로 명시한다.

## 범위

- structuring profile 추가
- 정책, workflow, prompt 추가
- 철학, identity, persistent instruction 반영
- memory bootstrap anchor 반영
- 웹 검색, 연구 메모, 히스토리, 평가 기록 작성

## 비범위

- OCR, LLM extractor, 데이터 파이프라인 구현
- 외부 패키지 설치
- 실제 대량 데이터 변환 실행

## 성공 기준

- 정형화 작업은 target schema를 먼저 가진다.
- 추출값은 source provenance를 가진다.
- 모호함, 누락, 충돌, 추론은 명시적으로 표시한다.
- downstream 사용 전 schema validation과 sample/source audit를 요구한다.
