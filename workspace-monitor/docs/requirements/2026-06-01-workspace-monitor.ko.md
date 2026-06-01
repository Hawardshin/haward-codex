# 요구사항: Workspace Monitor

## 상태

- 상태: `baseline`
- 기준일: 2026-06-01
- 소유 프로젝트: `workspace-monitor/`
- 출처 요청: `UR-2026-06-01-008`

## 요구사항

| ID | 요구사항 | 우선순위 | 검증 |
| --- | --- | --- | --- |
| REQ-WM-001 | Vercel에 배포 가능한 Next.js 프로젝트여야 한다. | must | `npm run build` 통과, `README.md`에 Vercel 설정 기록 |
| REQ-WM-002 | 저장소의 히스토리, 작업 요약, 요청 추적, 프로젝트, 에이전트/작업 상태, 요구사항, 스펙, 평가 문서를 한 화면에서 탐색할 수 있어야 한다. | must | 생성된 snapshot과 UI 섹션 확인 |
| REQ-WM-003 | Markdown 문서를 읽기 편한 HTML preview로 보여줄 수 있어야 한다. | must | snapshot 문서에 escaped HTML preview 포함 |
| REQ-WM-004 | 현재 private repository에서도 로컬로 쓸 수 있고, 나중에 public 전환 후 Vercel에 올릴 수 있어야 한다. | must | 정적 snapshot 기반 build, 배포 문서 확인 |
| REQ-WM-005 | 확장 가능한 구조여야 하며 문서 파싱, UI 컴포넌트, 데이터 모델, 배포 설정이 분리되어야 한다. | should | 폴더 구조와 타입 분리 검토 |
| REQ-WM-006 | public 배포 전 민감 정보가 snapshot에 들어가는지 검토할 수 있어야 한다. | must | README와 deployment docs에 공개 전 점검 절차 기록 |

## 범위

- Next.js UI
- repository snapshot 생성기
- 문서 요약, HTML preview, 프로젝트/히스토리/요구사항/평가 데이터 카드
- Vercel 배포 문서

## 제외 범위

- 인증, 로그인, 실시간 서버 monitoring
- GitHub API 연동
- 원격 DB 저장
- private secret 또는 원본 대화 전문 공개

