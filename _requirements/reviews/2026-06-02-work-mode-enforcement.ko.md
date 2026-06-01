# 요구사항 검토: 작업 모드 강제화

## 결정

- 승인: `REQ-WS-055`는 workspace/platform 공통 요구사항으로 적합하다.

## 이유

- 사용자가 작업 모드의 자유도보다 설계 강제력을 명시적으로 요구했다.
- 기존 구조는 evaluator target policy가 있었지만, mode selection record와 registry/evaluator drift check가 충분히 명시적이지 않았다.
- 강제화는 프롬프트 문구보다 설정 파일, CLI 검사, evaluator gap, 평가 보고서가 함께 있을 때 더 재현 가능하다.

## 비범위

- 모든 작업을 `governance`로 강제하지 않는다.
- `quick` 모드는 작은 reversible work를 위해 advisory로 남긴다.

## 후속 검증

- `check-work-modes`
- `evaluate-work`
- `python3 -m unittest discover -s tests`
