# 플랫폼 발표 팩 사용 가이드

- 날짜: 2026-06-01
- 소유 프로젝트: `presentation-agent`
- 발표 대상: 현재 개인 에이전트 플랫폼을 이해하거나, 이후 프로젝트별 deep dive를 이어갈 사용자/검토자
- 산출 범위: 전체 플랫폼 HTML 덱 1개, 등록 루트 프로젝트별 HTML 덱 3개, 발표자 노트 포함

## 추천 발표 순서

1. `workspace-platform-overview.html`
   - 전체 플랫폼 철학과 운영 루프를 먼저 설명한다.
   - 15장 구성으로 약 25-35분 발표를 기준으로 한다.
2. `project-agent-platform.html`
   - 에이전트 구축, 조사, 평가, grounding, memory, config contract를 설명한다.
   - 약 10-15분 deep dive로 사용한다.
3. `project-workspace-monitor.html`
   - 히스토리와 문서 기반 운영 상태를 UI로 보는 방식을 설명한다.
   - 약 8-12분 deep dive로 사용한다.
4. `project-presentation-agent.html`
   - 발표 제작 루프, 레퍼런스 우선 정책, deck-spec, HTML/PPTX 경로를 설명한다.
   - 약 10-15분 deep dive로 사용한다.

전체 발표를 모두 이어서 하면 55-75분 분량이다. 짧은 소개가 필요하면 전체 플랫폼 덱만 사용하고, 질문이 생긴 프로젝트 덱을 선택적으로 이어간다.

## 발표 산출물

| 구분 | 파일 | 설명 |
| --- | --- | --- |
| 인덱스 | `presentation-agent/artifacts/html/platform-presentation-pack-index.html` | 네 개 HTML 발표 자료를 한 곳에서 여는 시작 화면 |
| 전체 플랫폼 | `presentation-agent/artifacts/html/workspace-platform-overview.html` | 플랫폼 철학, 작업 OS, 운영 루프, 공통 폴더, 품질 게이트 |
| agent-platform | `presentation-agent/artifacts/html/project-agent-platform.html` | 에이전트 엔진과 CLI/평가/설정 구조 |
| workspace-monitor | `presentation-agent/artifacts/html/project-workspace-monitor.html` | Next.js 기반 저장소 모니터링 UI |
| presentation-agent | `presentation-agent/artifacts/html/project-presentation-agent.html` | 발표 제작 에이전트와 HTML 덱 생성 루프 |

## 발표 스크립트 운영 방식

- 각 슬라이드의 `speaker_notes`가 실제 발표 대본의 기본선이다.
- HTML 덱 오른쪽 노트 패널을 열어 발표 흐름을 확인한다.
- 발표자가 말할 때는 슬라이드 문장을 그대로 읽지 말고, 노트의 `근거 문서`를 기준으로 판단 흐름을 설명한다.
- 외부 발표용으로 공개하기 전에는 `workspace-monitor`와 동일하게 private 정보, 로컬 경로, 비공개 히스토리 노출 여부를 별도 점검한다.

## 다음 개선 후보

- 같은 deck-spec에서 10분 요약본과 60분 deep dive를 자동 파생한다.
- 각 프로젝트 덱에 실제 화면 캡처나 다이어그램 이미지를 추가한다.
- `artifact_pptx.py`와 Presentations skill을 연결해 editable PPTX 산출물을 정식 생성한다.
