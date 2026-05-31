# 지식 베이스 검증 정책

## 목적

저장소의 지식 베이스는 시간이 지날수록 커진다. `_research`, `_docs`, `_history`, 프로젝트 문서의 내용은 유용하지만 항상 맞다고 가정하면 안 된다. 지식 베이스를 근거로 사용할 때는 `knowledge-skeptic-agent`가 오류 가능성을 의심하고 검증한다.

## 기본 원칙

- 지식 베이스 내용은 오래됐거나, 불완전하거나, 틀렸을 수 있다.
- 중요한 판단에 쓰기 전 독립 검증 단계를 남긴다.
- 현재성이 중요한 정보는 최신 공식 문서나 신뢰 가능한 출처로 재확인한다.
- 모순 신호가 있으면 해결하기 전까지 근거로 사용하지 않는다.
- 검증 결과는 평가 보고서나 관련 문서에 남긴다.

## 언제 실행할까

- 리서치 노트를 현재 작업의 근거로 사용할 때
- 오래된 히스토리나 이전 결정에 의존할 때
- 오픈소스 선택, 기술 판단, 아키텍처 판단을 할 때
- 외부 정보를 요약한 문서를 다시 사용할 때
- 지식 베이스 내용이 최신인지 확신할 수 없을 때

## 명령

`agent-platform/`에서 실행한다.

```bash
PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge configs/evaluation/knowledge-validation-template.json
```

## 종료 조건

- `ready_to_reference`: 현재 작업에서 근거로 사용할 수 있다.
- `verification_required`: gap을 해결하기 전까지 근거로 사용하지 않는다.
