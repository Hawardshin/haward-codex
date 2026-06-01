# 프로젝트 인덱스

원본 데이터: [registry.json](registry.json)

| 프로젝트 | 상태 | 유형 | 목적 | 경계 |
| --- | --- | --- | --- | --- |
| `agent-platform/` | active | core-platform | 에이전트 구축 플랫폼 중심 프로젝트 | 플랫폼 공통 기능은 여기, 도메인 실험은 별도 루트 프로젝트 |
| `presentation-agent/` | active | domain-agent-project | 발표 자료와 발표 스킬을 위한 전용 프로젝트 | 발표 레퍼런스, 에셋, 변환 도구, 산출물은 이 프로젝트 안에 둔다 |
| `workspace-monitor/` | active | repository-monitoring-site | 저장소 히스토리, 프로젝트, 에이전트, 요구사항, 문서를 시각화하는 Next.js 모니터링 사이트 | UI, snapshot 생성기, 배포 설정은 이 프로젝트 안에 두고 원천 문서는 공유 폴더에서 읽는다 |

## 운영 규칙

- 새 관심사가 독립 목적과 산출물을 가지면 새 루트 프로젝트로 만든다.
- 프로젝트 전용 파일은 해당 프로젝트 폴더 안에 둔다.
- 여러 프로젝트에서 재사용될 때만 `_tools/`, `_templates/`, `_docs/`, `_ops/`로 승격한다.
- 프로젝트를 만들거나 상태가 바뀌면 이 인덱스와 `registry.json`을 업데이트한다.
