# 계획: 설치형 앱 UI/기능 레퍼런스 적용

## 제품 판단

우리 앱은 특정 CLI, 에디터, 터미널, Git GUI, 런처 중 하나가 아니다. 레퍼런스의 UI 패턴은 다음 6개 1급 객체를 더 잘 다루기 위해 가져온다.

- `run`: 하나의 사용자 목표와 실행 기록
- `lane`: CLI/agent별 독립 실행 단위
- `decision`: 사용자 판단이 필요한 질문과 보류 상태
- `artifact`: 생성물, 파일 변경, 리포트, 로그 요약
- `evidence`: claim을 뒷받침하는 source/output/diff/validation
- `capability`: CLI, prompt, workflow, skill, validator, tool

## 화면 우선순위

1. Home: active runs, blocked decisions, capability health, recent artifacts를 압축해서 보여준다.
2. Runs: lane card, terminal output, process graph, timeline을 중심으로 다중 CLI 실행 상태를 보여준다.
3. Decisions: 질문을 묶고 impact/default/resume action을 보여준다.
4. Source: agent가 만든 변경을 GitHub Desktop식 file list/diff/review flow로 보여준다.
5. Capabilities: CLI adapter와 prompt/workflow/skill/tool을 Docker/Raycast식 capability card로 관리한다.
6. Knowledge: 반복 작업과 좋은 결과를 reusable asset으로 승격하는 inbox를 둔다.

## 바로 구현할 순서

1. Capability Center를 카드형 상태/설정 UI로 개선한다.
2. Run Board v1을 만들어 existing pipe session을 lane card로 보여준다.
3. xterm.js terminal lane POC를 하되, full PTY write는 별도 승인 게이트 뒤로 둔다.
4. Decision Inbox v2에서 grouped decisions, answer/resume, replay를 구현한다.
5. Source Review v1에서 file list, diff preview, backup/restore, validation linkage를 구현한다.
6. Run record schema와 process graph schema를 고정한다.
7. Monaco editor는 Source Review의 editor surface로 점진 도입한다.

## 채택하지 않을 방향

- VS Code 전체 clone
- 단일 CLI 전용 브랜딩
- raw terminal log 중심 지식 축적
- 빠른 action이 검증/기록을 우회하는 UX
- provider credential을 앱이 직접 소유하는 구조

## 후속 검증

- 실제 제품별 screenshot benchmark
- macOS Tauri WebView에서 terminal/editor rendering smoke
- xterm.js/Monaco 설치 감사와 dependency/license/security record
- terminal lane lifecycle/resource leak check
- decision resume replay 기록 검증
