# 메모리 부트스트랩 정책

## 목적

AI가 다음 세션에서 저장소의 중요한 세팅을 잊지 않도록, 시작 시 로드할 핵심 문서와 필요 시 검색할 문서를 manifest로 관리한다.

## 원칙

- 채팅 기억에 의존하지 않는다.
- 모든 새 지시는 웹 검색 후 메모리 부트스트랩을 확인한다.
- `agent-platform/configs/memory/bootstrap-manifest.json`을 boot memory contract로 본다.
- hot anchor는 항상 먼저 읽는 작고 중요한 문서로 제한한다.
- warm/cold anchor는 필요할 때 찾아 읽는다.
- 지속 지시, 프로젝트 경계, 출처 설정, 프롬프트/워크플로, 평가 루프가 바뀌면 manifest도 같은 변경 단위에서 갱신한다.

## 명령

`agent-platform/`에서 실행한다.

```bash
PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json
```

## 티어

- `hot`: AGENTS, persistent instructions, ops index, prompt router, start workflow, web-first workflow, memory bootstrap workflow, source configs처럼 새 세션에서 먼저 읽어야 하는 파일
- `warm`: 작업 종류에 따라 필요한 정책, 워크플로, 최근 히스토리
- `cold`: 맵, 긴 히스토리, 상세 문서처럼 검색해서 가져올 파일

## 갱신 규칙

- 새 durable rule이 생기면 `AGENTS.md`, `_docs/instructions/persistent-instructions.md`, 관련 정책 문서, manifest를 함께 갱신한다.
- 새 공통 설정 파일이 생기면 manifest의 hot 또는 warm anchor로 추가한다.
- hot anchor가 많아지면 우선순위가 낮은 항목을 warm으로 내린다.
- manifest check가 실패하면 작업을 진행하기 전에 gap을 해결한다.
