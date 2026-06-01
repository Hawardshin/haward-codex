# 스펙: 구조 거버넌스 감사

## 요구사항

- `REQ-WS-026`

## 문제

루트 폴더가 늘어나면서 등록된 프로젝트, 공통 운영 폴더, 로컬 전용 scratch, 생성 산출물의 경계가 문서마다 다르게 해석될 수 있다. 특히 `_private/`와 `outputs/`는 현재 구조에서 보이지만 durable knowledge인지 local-only인지 명확하지 않다.

## 목표

- root folder class를 self-documenting config로 정의한다.
- deterministic audit tool로 현재 root 구조를 검증한다.
- 프로젝트 경계 문서와 workflow가 local-only folder와 generated output을 분리해서 설명한다.
- `workspace-monitor`에서 구조 규칙 문서도 탐색할 수 있게 한다.

## 비목표

- 기존 프로젝트 폴더를 이동하거나 이름을 바꾸지 않는다.
- 기존 히스토리나 요구사항 파일을 새 위치로 대량 이동하지 않는다.
- root `outputs/`를 durable artifact 저장소로 승격하지 않는다.

## 수용 기준

- `_ops/projects/root-structure-policy.json`이 존재하고 self-documenting config contract를 통과한다.
- `_tools/structure-audit/`가 등록되지 않은 root folder와 README 없는 project를 gap으로 판정한다.
- 현재 저장소에서 `python3 _tools/structure-audit/src/structure_audit.py --check`가 통과한다.
- 관련 운영 문서, workflow, memory bootstrap manifest가 갱신된다.
- `workspace-monitor` snapshot에 `_docs`와 `_philosophy` category가 포함된다.
