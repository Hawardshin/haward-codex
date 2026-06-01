# Plan Evidence: Positive Vision Agent

## 요구 해석

사용자는 “어떻게든 해내라고 긍정적인 비전을 제시하는 전문가”를 요청했다. 이는 플랫폼의 신규 reusable domain agent로 해석했다.

## 결정

- agent name: `positive-vision-agent`
- boundary: `agent-platform` 공통 에이전트
- work mode: `governance`
- output: positive execution brief

## 근거 기반 설계

- Hope Theory → `agency`, `pathways`
- Implementation intentions → 장애물별 `if-then` 계획
- Goal-setting theory → 구체적이고 도전적인 목표, 피드백, commitment
- Psychological safety → 위험/반대 의견을 묵살하지 않는 긍정성

## 다른 선택지

- `motivator-agent`: 너무 감정적 응원에 가까워 보일 위험이 있어 제외했다.
- `resilience-agent`: 회복탄력성 중심으로 좁아져 “비전 제시”와 실행 경로 생성이 약해질 수 있어 제외했다.
- `positive-vision-agent`: 사용자의 표현을 살리면서도 실행 brief와 연결하기 쉬워 선택했다.

## 예상 검증

- agent spec이 `inspect-agent`로 읽혀야 한다.
- `list-agents`에 포함되어야 한다.
- orchestration registry check가 깨지지 않아야 한다.
- docs, requirements, specs, history, evaluation이 연결되어야 한다.
