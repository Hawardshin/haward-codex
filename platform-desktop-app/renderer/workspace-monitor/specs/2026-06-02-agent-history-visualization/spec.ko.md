# 에이전트와 히스토리 시각화 스펙

## 목표

Workspace Monitor에서 어떤 에이전트가 있는지와 히스토리가 어떻게 쌓이고 있는지 더 직관적으로 볼 수 있게 한다.

## 범위

- `agent-platform/configs/agents/*.json`에서 에이전트 정의를 수집한다.
- coordination runtime 상태와 task 연결을 agent catalog에 합친다.
- Agents 섹션에 에이전트 구성 맵, runtime/status 막대, task status lane을 추가한다.
- Overview와 History 섹션에 히스토리 밀도 차트와 유형별 막대를 추가한다.
- 정적 snapshot 구조와 Vercel export 구조를 유지한다.

## 비범위

- 실시간 agent process tracing
- 외부 observability backend 연동
- 새 chart library 설치
- 인증/권한 관리

## 설계 결정

- 언어/런타임: 기존 Next.js/TypeScript/Node collector 유지
- 시각화 방식: 새 dependency 없이 CSS 기반 bar/density chart
- 데이터 출처: `agent-platform/configs/agents/`, `_ops/coordination/status.json`, `_history/`
- 유지보수 이유: snapshot JSON에 필요한 데이터만 추가하고 UI는 순수 React 컴포넌트로 표현한다.

## 근거

- Grafana state timeline/annotations 문서는 상태와 이벤트를 시간 축에서 해석하기 쉽게 하는 패턴을 제공한다.
- OpenTelemetry observability 문서는 traces/metrics/logs 같은 관측 단위의 분리를 강조한다.
- Datadog dashboard docs는 event timeline/overlays처럼 이벤트를 대시보드 맥락에 올리는 방식을 참고할 수 있다.
