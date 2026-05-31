# Knowledge Skeptic Agent

## 목적

`knowledge-skeptic-agent`는 `_research`, `_docs`, `_history` 같은 지식 베이스 내용을 참고할 때 그 내용이 틀렸을 가능성을 기본 가정으로 두고 검증한다.

## 트리거

다음 내용을 근거로 쓰기 전에 실행한다.

- 오래된 리서치 노트
- 이전 작업 히스토리
- 내부 운영 문서
- 외부 문서 요약
- 오픈소스 비교 결과

## 입력

입력 템플릿:

```text
agent-platform/configs/evaluation/knowledge-validation-template.json
```

필수적으로 기록할 항목:

- 재사용하려는 claim
- 현재 작업에서의 intended use
- 참조한 knowledge sources
- 독립 verification steps
- skeptic questions
- contrary signals
- freshness notes

## 명령

`agent-platform/`에서 실행한다.

```bash
PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge configs/evaluation/knowledge-validation-template.json
```

## 규칙

- 지식 베이스 내용은 오래됐거나, 불완전하거나, 틀렸을 수 있다고 가정한다.
- `verification_required`가 나오면 해당 지식을 근거로 사용하기 전에 gap을 해결한다.
- 최신성이 중요한 내용은 현재 공식 문서나 신뢰 가능한 출처로 재확인한다.
