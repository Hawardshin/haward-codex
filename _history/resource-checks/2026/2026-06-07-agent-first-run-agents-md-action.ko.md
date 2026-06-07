# Resource Check

- 리소스 위험 발생 여부: 낮음.
- 이유:
  - 새 장기 실행 프로세스, 타이머, worker, 네트워크 연결을 추가하지 않았다.
  - 기존 Tauri `read_workspace_text_file` 및 `write_workspace_text_file` 경계를 사용한다.
- 쓰기 위험:
  - 기존 `AGENTS.md`가 있으면 덮어쓰지 않고 연다.
  - 파일이 없을 때만 루트 `AGENTS.md`를 생성한다.
