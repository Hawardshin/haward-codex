# 요구사항 변경: 네이밍 규칙과 감사

## 변경 요약

- 추가 요구사항: `REQ-WS-035`
- 출처 요청: `UR-2026-06-01-019`
- 작업 모드: `governance`

## 변경 내용

프로젝트, 도구, 스킬, 문서, 스펙, 히스토리, 설정, 소스 코드 이름을 네임스페이스별 규칙으로 관리한다. 사람이 읽는 기준은 `_docs/governance/naming-governance.ko.md`, 기계가 읽는 source of truth는 `_ops/naming/naming-policy.json`, 검증은 `_tools/naming-audit/`가 담당한다.

## 수용 기준

- naming policy config가 자기 설명 구조를 가진다.
- naming governance 문서가 한국어/영어로 존재한다.
- naming-audit가 현재 저장소에서 clean을 반환한다.
- workspace-health governance check에 naming audit가 포함된다.
- memory bootstrap과 config contract가 naming policy를 확인한다.
