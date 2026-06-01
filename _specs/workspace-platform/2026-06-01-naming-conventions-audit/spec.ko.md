# 스펙: 네이밍 규칙과 감사

## 목표

저장소의 durable name을 네임스페이스별 규칙으로 관리하고, 기계적으로 검증 가능한 규칙은 audit 도구로 확인한다.

## 요구사항

- `REQ-WS-035`

## 범위

- `_ops/naming/naming-policy.json`
- `_docs/governance/naming-governance.ko.md`
- `_docs/governance/naming-governance.en.md`
- `_tools/naming-audit/`
- `workspace-health` governance check
- memory bootstrap/config contract 연결

## 동작

- naming policy는 project/tool/skill/docs/spec/history/config/source/commit namespace별 case style과 pattern을 설명한다.
- naming audit는 현재 저장소에서 검증 가능한 항목을 검사하고 gap이 있으면 non-zero exit한다.
- workspace-health는 governance category에서 naming audit를 실행한다.

## 제외

- 기존 durable path 대량 rename
- git history commit message 재작성
- 언어별 모든 symbol naming lint 도입
