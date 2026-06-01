# 계획 기록: 구조 거버넌스 감사

## 요청

- 현재 구조에서 모순되거나 관리가 불편한 부분이 있으면 정리하고, 폴더 구조와 관리 규칙을 개선한다.

## 작업 모드

- `governance`
- 이유: 루트 폴더 정책, 프로젝트 경계, 메모리 anchor, 운영 workflow를 바꾸는 durable repository rule 작업이다.

## 확인한 구조

- 등록된 프로젝트: `agent-platform/`, `presentation-agent/`, `workspace-monitor/`
- 공유 운영 폴더: `_docs/`, `_ops/`, `_history/`, `_requirements/`, `_specs/`, `_research/`, `_skills/`, `_templates/`, `_tools/`, `_philosophy/`, `_archive/`
- 로컬 전용 후보: `_private/`, `outputs/`
- 생성 산출물 후보: `workspace-monitor/.next/`, `workspace-monitor/out/`, `workspace-monitor/node_modules/`, `workspace-monitor/tsconfig.tsbuildinfo`

## 결정

- 프로젝트 폴더를 이동하지 않는다.
- `_private/`와 `outputs/`를 local-only ignored folder로 명시한다.
- root folder class를 `_ops/projects/root-structure-policy.json`에 둔다.
- deterministic audit는 `_tools/structure-audit/`로 만든다.
- `workspace-monitor`는 `_docs`와 `_philosophy`를 수집한다.

## 검증 계획

- structure audit와 단위 테스트
- self-documenting config contract
- memory bootstrap
- workspace monitor collect/test/check/build
- workspace index와 task board 재생성
- grounding과 work evaluation
