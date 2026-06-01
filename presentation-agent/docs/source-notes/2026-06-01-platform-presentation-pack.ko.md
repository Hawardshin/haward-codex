# 플랫폼 발표 팩 출처 노트

- 날짜: 2026-06-01
- 목적: 플랫폼 발표 팩에서 사용한 내부/외부 근거를 다음 발표 준비자가 빠르게 검토할 수 있게 남긴다.

## 외부 발표 구조 참고

| 출처 | URL | 이번 작업에서 사용한 역할 |
| --- | --- | --- |
| Duarte Presentation Formula | https://www.duarte.com/training/presentation-formula/ | 청중을 현재 상태에서 원하는 미래 상태로 이동시키는 발표 구조 참고 |
| Duarte story techniques | https://www.duarte.com/blog/move-presentation-audience-with-story-techniques-in-presentations/ | 문제-전환-결론 흐름과 감정적 전환 참고 |
| Harvard Catalyst slide guidance | https://catalyst.harvard.edu/writing-communication-center/visualize-science/slides/ | 한 슬라이드에 하나의 핵심 메시지를 두는 원칙 참고 |
| MIT AeroAstro slide design | https://mitcommlab.mit.edu/aeroastro/commkit/slide-design/ | 기술 발표 슬라이드의 명확성, 대비, 시각 계층 참고 |
| Pitch presentation structure guide | https://pitch.com/guides/presentation/structure-your-presentation | 발표 흐름을 hook, 문제, 근거, 행동으로 조직하는 방식 참고 |

## 내부 근거

| 영역 | 내부 파일 | 발표에서 사용한 내용 |
| --- | --- | --- |
| 플랫폼 정체성 | `_docs/operating-models/platform-identity-operating-model.ko.md` | 개인 에이전트 작업 OS, 축적되는 작업 구조 |
| 프로젝트 등록 | `_ops/projects/registry.json` | 등록된 active root project 3개 |
| 운영 루프 | `_ops/workflows/00-start-here.md`, `_ops/workflows/05-web-first-intake.md`, `_ops/workflows/40-evaluate-and-rework.md` | 웹 우선, memory bootstrap, 평가-재작업 루프 |
| 요구사항/스펙 | `_requirements/`, `_specs/`, `presentation-agent/specs/2026-06-01-platform-presentation-pack/` | spec-driven 진행 방식 |
| 조사 설정 | `agent-platform/configs/research/research-agent-profile.json`, `agent-platform/configs/research/source-discovery-registry.json` | answer-engine 단계와 출처 수집 정책 |
| 품질 게이트 | `agent-platform/src/agent_platform/evaluation/` | work evaluator, hallucination guard, knowledge skeptic |
| 발표 에이전트 | `presentation-agent/src/presentation_agent/html_deck.py`, `presentation-agent/data/reference-index/starter-reference-catalog.json` | deck-spec 기반 HTML 렌더링과 출처 카탈로그 |
| 모니터링 | `workspace-monitor/README.md`, `workspace-monitor/scripts/collect-workspace.mjs`, `workspace-monitor/components/MonitorShell.tsx` | 저장소 snapshot과 Next.js UI |

## 신뢰도 메모

- 외부 자료는 발표 구조와 슬라이드 설계 참고로 사용했으며, 이 저장소의 내부 사실을 증명하는 근거로 사용하지 않았다.
- 내부 사실은 저장소 파일과 생성된 산출물 상태를 기준으로 검증한다.
- 커뮤니티 신호나 디자인 갤러리는 이번 발표에서 직접 사실 근거로 쓰지 않았다.
- 공개 발표 전에는 최신 파일 상태와 private 정보 노출 여부를 다시 확인해야 한다.
