# Plan: 미뤄둔 구현 큐 폐쇄

1. 현재 deferred queue와 Git submodule 상태를 확인한다.
2. 공식 자료로 submodule, Electron security, package lock, Tauri signing/notarization 기준을 확인한다.
3. `platform-desktop-app`에 managed Git workspace 생성 command와 UI action을 추가한다.
4. workspace monitor static smoke helper를 추가해 projects topology가 렌더링되는지 검증한다.
5. `workspace-history-ledger`에 compatibility index builder와 shadow copy batch를 추가한다.
6. `agent-tool-desktop-app`에 developer Electron desktop shell을 구현하고 dependency audit를 기록한다.
7. deferred queue, installation registry, 요구사항/spec/history/evaluation 기록을 업데이트한다.
8. 각 project repository를 commit/push한 뒤 root superproject gitlink와 운영 기록을 commit/push한다.
