# 컨텍스트 아카이브 정책

## 목적

컨텍스트가 길어졌다고 판단되면 에이전트가 먼저 안정된 내용을 압축하고, 다음 작업은 채팅 기억이 아니라 저장소 문서를 기준으로 재개한다.

이 정책은 긴 대화 전체를 보존하려는 규칙이 아니다. 원문 채팅과 내부 추론을 복사하지 않고, 재개에 필요한 사실, 결정, 파일 위치, 검증 상태, 남은 작업을 짧은 `context archive packet`으로 남기는 규칙이다.

## 핵심 원칙

- 에이전트가 스스로 컨텍스트 포화 위험을 감지하면 작업을 멈추지 않고 먼저 압축/아카이빙한다.
- durable context는 `_history/context-archives/YYYY/`에 저장한다.
- 최신 작업 상태는 관련 프로젝트 `README.md`, `_history/YYYY/YYYY-MM-DD.md`, `_history/work-summaries/`, `_ops/coordination/`에도 반영한다.
- archive packet은 재개용 색인이다. 세부 근거는 관련 문서, 평가 보고서, 리서치 노트, 커밋을 링크한다.
- 내부 추론 원문, 불필요한 중간 로그, 민감 정보는 저장하지 않는다.
- 오래된 archive packet을 근거로 사용할 때는 `knowledge-skeptic-agent`로 현재성, 충돌, 누락 가능성을 확인한다.

## 컨텍스트 포화 신호

- 작업 지시, 결정, 파일 위치, 남은 일이 채팅에만 남아 있다.
- 최근 작업이 여러 개 누적되어 다음 세션이 어디서 시작할지 불명확하다.
- 응답 전에 이전 맥락을 반복해서 재구성해야 한다.
- 저장소 문서보다 채팅 내용이 더 정확한 상태가 되었다.
- 새 작업으로 넘어가기 전에 현재 상태를 정리하지 않으면 누락 위험이 크다.

## 표준 절차

1. 웹 검색 기록을 먼저 만든다. 단순 운영 규칙이라도 웹 검색 결과와 내부 문서 확인을 남긴다.
2. 최신 `memory-bootstrap-agent` 결과와 hot/warm anchor를 확인한다.
3. 안정된 사실, 결정, 변경 파일, 검증 결과, 남은 작업만 추출한다.
4. 관련 프로젝트 README와 운영 문서를 최신 상태로 만든다.
5. `_history/context-archives/YYYY/YYYY-MM-DD-<slug>.ko.md`와 필요하면 영어 companion을 만든다.
6. `_history/YYYY/YYYY-MM-DD.md`, `_history/work-summaries/`, `_ops/coordination/status.json`에 재개 경로를 연결한다.
7. 컨텍스트 아카이빙이 실제로 발생했다면 평가 입력에 `context_archiving_occurred=true`와 `context_archive_targets`를 넣는다.
8. 검증 후 커밋하고 push한다.

## 아카이브 패킷 필드

- 현재 작업 목표
- 현재 상태 요약
- 최근 완료한 결정과 변경
- 반드시 읽을 파일
- 남은 작업
- 검증 상태
- 웹 검색 기록, 계획 기록, 작업 요약, 평가 보고서, 커밋 링크
- 저장하지 않은 내용과 이유
- 재개 지침

## 관련 파일

- [_history/context-archives/README.ko.md](../_history/context-archives/README.ko.md)
- [_templates/context-archive/context-archive.ko.md](../_templates/context-archive/context-archive.ko.md)
- [_ops/prompts/50-compress-context.md](../_ops/prompts/50-compress-context.md)
- [_ops/workflows/45-context-archive.md](../_ops/workflows/45-context-archive.md)
- [_docs/context-management.md](context-management.md)
- [agent-platform/configs/memory/bootstrap-manifest.json](../agent-platform/configs/memory/bootstrap-manifest.json)
