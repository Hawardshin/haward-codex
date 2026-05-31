# 설정 계약 에이전트

`config-contract-agent`는 공유 JSON 설정 파일이 파일 내부에서 자기 설명을 충분히 하는지 확인한다.

## 확인 기준

- `reader_guide`: 파일을 읽는 법과 갱신 조건이 있는가
- `reference_links`: 참고 링크와 내부 문서가 있고, 각각 무엇을 위해 참고하는지 적혀 있는가
- `structure_rules`: 설정을 유지하는 구조 규칙이 있는가
- `field_guide`: 중요한 필드의 의미와 필수 여부가 적혀 있는가

## 명령

`agent-platform/`에서 실행한다.

```bash
PYTHONPATH=src python3 -m agent_platform.cli check-config-contract \
  configs/memory/bootstrap-manifest.json \
  configs/research/source-registry.json \
  configs/research/coding-research-profile.json
```

## 원칙

설정 파일은 값 저장소가 아니라 운영 계약이다. 사용자가 파일 하나만 열어도 참고 링크, 구조 규칙, 필드 의미를 이해할 수 있어야 한다.
