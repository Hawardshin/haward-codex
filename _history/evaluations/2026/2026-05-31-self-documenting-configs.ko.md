# 작업 평가 보고서: 자가 설명형 설정 파일

## 초기 지시

- "세팅파일로 한다는게 참고하는 링크라던가 뭔가 구조적인 규칙은 내가 그 파일만 봐도 알 수 있는게 필요하다는거지"

## 결과 요약

- `config-contract-agent`를 추가했다.
- `check-config-contract` CLI와 Python 검사기를 추가했다.
- `agent-platform/configs/memory/bootstrap-manifest.json`, `agent-platform/configs/research/source-registry.json`, `agent-platform/configs/research/coding-research-profile.json`에 `reader_guide`, `reference_links`, `structure_rules`, `field_guide`를 추가했다.
- `coding-research-profile.json`에서 이미 허용하던 `news` 출처 유형을 `source-registry.json`에도 설명해 설정 간 불일치를 줄였다.
- 자가 설명형 설정 파일 정책 한국어/영어 문서를 추가했다.
- 관련 리서치 노트, 계획 히스토리, persistent instructions, AGENTS, README, platform docs, operations index, memory manifest를 갱신했다.

## References Checked

- JSON Schema Annotations: https://json-schema.org/understanding-json-schema/reference/annotations
- Azure App Configuration best practices: https://learn.microsoft.com/en-us/azure/azure-app-configuration/howto-best-practices
- The Twelve-Factor App Config: https://www.12factor.net/config
- 기존 memory manifest: `agent-platform/configs/memory/bootstrap-manifest.json`
- 기존 source registry: `agent-platform/configs/research/source-registry.json`
- 기존 coding research profile: `agent-platform/configs/research/coding-research-profile.json`

## Grounding Checks

- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge /private/tmp/self-documenting-configs-knowledge.json`
- 결과: `ready_to_reference`
- gaps: 없음
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding /private/tmp/self-documenting-configs-grounding.json`
- 결과: `ready_to_publish`
- gaps: 없음

## 검증

- `PYTHONPATH=src python3 -m unittest discover -s tests` from `agent-platform/`: 38개 테스트 통과
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/memory/bootstrap-manifest.json configs/research/source-registry.json configs/research/coding-research-profile.json`: `self_documenting`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`: `ready_to_bootstrap`
- `PYTHONPATH=src python3 -m agent_platform.cli list-agents --registry configs/agents`: `config-contract-agent` 표시됨
- `python3 -m json.tool` on edited JSON files: valid JSON
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/self-documenting-configs-evaluation.json`: `ready_to_close`

일부 Python 명령에서 Homebrew shellenv의 `/bin/ps: Operation not permitted` 경고가 출력됐지만, 명령 결과 자체는 성공했다.

## Alignment

- Status: `ready_to_close`
- Requires rework: `false`
- 초기 지시 반영: 설정 파일 내부에 참고 링크와 구조 규칙을 직접 넣었고, 사용자가 파일 하나만 열어도 읽는 법과 필드 의미를 확인할 수 있게 했다.

## Gaps

- 없음

## Improvements

- 이후 Python checker와 별도로 formal JSON Schema를 추가할 수 있다.
- agent spec JSON이 더 사용자-facing 설정이 되면 같은 자기 설명 계약을 적용할 수 있다.

## Follow-Up Actions

- 현재 blocking follow-up은 없다.

## Report File

- Path: `_history/evaluations/2026/2026-05-31-self-documenting-configs.ko.md`
- Created: 2026-05-31
