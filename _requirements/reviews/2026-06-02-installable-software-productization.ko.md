# 설치형 소프트웨어 제품화 요구사항 검토

## 검토 대상

- `REQ-WS-050`
- `PDA-REQ-001`부터 `PDA-REQ-006`

## 검토 결과

- 상태: accepted
- 이유: 사용자의 요청은 기존 설치 모드보다 넓은 end-user productization 문제다. 기존 `agent-platform`에 넣으면 repository setup과 desktop distribution이 섞이므로 별도 루트 프로젝트가 적합하다.

## 리스크

- 아직 Tauri/Electron 중 final decision을 하지 않았다.
- 실제 installer 구현은 하지 않았다.
- signing certificate, notarization account, Windows signing 체계는 준비되지 않았다.

## 보완

- registry와 policy에 release gate와 dependency audit 조건을 먼저 고정했다.
- 실제 dependency 설치는 다음 단계로 넘겼고, 설치가 발생하면 감사 기록을 요구한다.
