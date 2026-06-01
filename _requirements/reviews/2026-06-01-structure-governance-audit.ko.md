# 요구사항 검토: 구조 거버넌스 감사

## 검토 대상

- `REQ-WS-026`

## 검토 결과

- 상태: 승인
- 작업 모드: `governance`
- 범위: workspace root, `_ops/projects/`, `_tools/structure-audit/`, `workspace-monitor/`

## 검토 메모

- 사용자는 전체 구조에서 모순이나 관리 불편이 있으면 개선해도 된다고 요청했다.
- 현재 저장소는 이미 많은 공통 운영 폴더와 프로젝트를 갖고 있으므로, 대규모 이동보다 root folder class와 deterministic audit를 추가하는 편이 안전하다.
- `_private/`와 `outputs/`는 추적 가능한 지식이 아니라 local-only 예외로 명시한다.
- `workspace-monitor`는 구조 이해에 필요한 `_docs`와 `_philosophy`까지 볼 수 있어야 한다.

## 승인된 수용 기준

- root folder classification policy가 존재한다.
- structure audit tool과 테스트가 존재한다.
- 현재 root 구조가 audit를 통과한다.
- 관련 운영 문서, workflow, memory bootstrap anchor가 갱신된다.
