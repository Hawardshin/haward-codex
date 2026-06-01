# `_docs` 카테고리와 누락 방지 계획

## 계획

1. 웹에서 문서 정보 구조와 taxonomy 근거를 확인한다.
2. 현재 `_docs/` 파일을 문서 종류별로 분류한다.
3. registry와 README index를 추가해 사람이 경로를 빠르게 찾게 한다.
4. docs-audit 도구로 누락과 misplaced 문서를 검사한다.
5. 운영 규칙, 메모리 부트스트랩, 요구사항, 히스토리, 평가를 연결한다.
6. docs-audit, config contract, memory bootstrap, 구조 검증, 테스트를 실행한다.

## 근거

- Diataxis: 문서 목적과 사용자 니즈 기반 구조화.
- GitLab topic types: 문서 topic type 분리.
- Google Developer Style Guide: 기술 문서 스타일과 조직화 참고.

## 리스크와 제어

- 리스크: 옛 `_docs/<file>` 경로가 남아 링크가 깨질 수 있다.
- 제어: `rg`로 옛 경로를 검색하고 workspace index를 재생성한다.
- 리스크: docs-audit가 과하게 엄격해 정상 문서를 막을 수 있다.
- 제어: category include pattern과 required document list를 registry에 명시한다.
