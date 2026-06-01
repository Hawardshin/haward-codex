# 런타임/언어 선택 정책

## 목적

플랫폼의 각 구성요소를 무조건 하나의 언어로 통일하지 않는다. 에이전트 로직, 웹 UI, 설치형 데스크톱 shell, 로컬 서비스, 고성능 네이티브 모듈은 요구 품질이 다르므로 언어 선택도 다르게 한다.

## 기본 방향

- Python: 에이전트 계획, 조사, 평가, 문서 처리, 설정 검증의 기본값이다.
- TypeScript/Next.js: `workspace-monitor`, 대시보드, HTML 산출물, Vercel 배포형 UI의 기본값이다.
- Rust/Tauri: 설치형 데스크톱 shell, 작은 네이티브 command bridge, 보안 민감 native operation, 안정된 성능 hot path의 1차 후보이다.
- Go: 장시간 실행되는 local daemon, 파일 watcher, 네트워크/알림 bridge, 운영 CLI, 단순 cross-platform binary의 1차 후보이다.
- Electron/Node: JavaScript 생태계와 Chromium 일관성이 더 중요하고 번들 크기/메모리 비용을 감수할 때의 fallback이다.

## 선택 규칙

1. 먼저 컴포넌트 경계를 정한다: UI, agent logic, local service, desktop shell, native command, hot loop 중 무엇인지 분류한다.
2. 성능 때문에 언어를 바꾸려면 병목 수치를 먼저 기록한다. 측정 없이 Rust/Go로 옮기지 않는다.
3. 설치형 데스크톱 제품은 `platform-desktop-app/`의 배포 gate를 따른다.
4. Rust/Go/Electron 의존성을 실제 설치하면 설치 감사 기록과 rollback 계획을 남긴다.
5. 커뮤니티 반응, GitHub star, Reddit 의견은 채택/위험 신호로만 보고, 공식 문서와 로컬 prototype 측정으로 결정한다.

## 조사와 설계 절차

런타임 선택은 조사에서 끝나지 않고 설계 기록으로 이어져야 한다.

1. `agent-platform/configs/runtime/language-decision-registry.json`의 `research_design_process`를 따른다.
2. 공식 문서, architecture/ADR 참고, 유지보수되는 오픈소스 구현, 이슈/토론 신호, 반대 사례를 분리해 조사한다.
3. 의미 있는 blast radius가 있으면 최소 두 후보 설계를 비교한다.
4. `_templates/runtime-language-decision/` 템플릿으로 ADR-style 결정 기록을 남긴다.
5. 성능이나 packaging이 선택 이유라면 prototype measurement plan을 작성한 뒤 구현 또는 설치로 넘어간다.
6. 실제 dependency 설치가 발생하면 설치 감사 기록을 먼저 만든다.

## 현재 추천

현재 플랫폼에는 hybrid 구조가 맞다.

- Core platform: Python 유지
- Monitor/web UI: TypeScript/Next.js 유지
- Desktop productization: Tauri-first prototype 유지
- Local background service가 필요해지면: Go 우선 검토
- 안정된 indexing/search/parser hot path가 병목이면: Rust 모듈 우선 검토

## 검증

새 컴포넌트나 런타임 변경 전에는 `agent-platform/configs/runtime/language-decision-registry.json`의 `decision_gates`와 `prototype_measurements`를 채운다.
