# 스펙: 전체 Workspace Navigation/Health 개선

## 목표

전체 저장소를 볼 때 root folder의 역할과 출처를 더 명확히 하고, 핵심 감사와 테스트를 한 명령으로 실행할 수 있게 한다.

## 요구사항

- `REQ-WS-032`

## 범위

- `_tools/workspace-index/`
- `_tools/workspace-health/`
- `_ops/maps/repository-map.md`
- `_tools/README.md`

## 동작

- repository map은 root folder별 `Class`, `Purpose`, `Source`를 표시한다.
- root folder metadata는 `_ops/projects/root-structure-policy.json`과 `_ops/projects/registry.json`에서 우선 읽는다.
- workspace health command는 docs audit, structure audit, map/board freshness, memory bootstrap, config contract, project tests, tool tests, workspace-monitor checks를 실행한다.
- `--include-build`를 주면 workspace-monitor static build도 포함한다.

## 제외

- 루트 폴더 재배치
- 프로젝트 구조 대규모 리팩터링
- CI 설정 추가
