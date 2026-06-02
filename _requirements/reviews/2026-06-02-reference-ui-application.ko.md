# 요구사항 검토: 레퍼런스 UI 적용

## 검토 대상

- `PDA-REQ-024`
- `PDA-UX-017`

## 사용자 의도 적합성

- 레퍼런스를 단순 문서로 남기지 않고 실제 Desktop 탭의 작업 surface로 반영한다.
- 특정 CLI나 에디터 clone이 아니라 다중 CLI supervisor의 `run`, `lane`, `decision`, `artifact`, `evidence`, `capability` 중심 구조를 강화한다.
- 새 dependency 설치 없이 현재 가능한 UI/정보구조를 적용하고, 설치 감사가 필요한 xterm.js/Monaco/PTY는 후속 gate로 남긴다.

## 검토 결과

- 상태: 승인
- 이유: 기존 optional CLI adapter, bounded pipe session, human decision inbox, source backup 계약과 충돌하지 않는다.

## 검증 기준

- Workspace Monitor check/test/build/perf budget 통과
- platform-desktop-app readiness/test 통과
- Playwright desktop/mobile smoke에서 핵심 섹션 표시와 가로 overflow 없음
