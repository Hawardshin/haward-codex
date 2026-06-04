# Tool Builder Workbench 스펙

## 요구사항

- REQ-WM-050: Tool Studio의 `툴 만들기` 화면은 새 툴 제작 전용 작업대를 제공해야 한다.

## 사용자 결과

- 사용자는 `툴 만들기` 모드에서 Python CLI Tool, MCP Wrapper, Automation Tool template를 선택한다.
- 선택 template에 따라 manifest, source path, input schema, run validation command, package preflight command, output contract가 즉시 바뀐다.
- 주요 액션은 `소스 열기`, `Smoke 실행`, `배포 점검`, `명세 복사`로 분리된다.
- 860px 이하 화면에서는 template, canvas, action 영역이 한 열로 접혀 수평 overflow를 만들지 않는다.

## 비목표

- 실제 파일 생성
- package 실행 또는 배포 실행
- 외부 MCP connector 인증
