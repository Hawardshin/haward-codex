# 2026-06-07 소스코드 중심 구현 요청

## 요청 요약

- 사용자는 “소스코드 위주로” 계속 구현하고, 큰 소스와 중복 구조를 실제 코드 중심으로 정리해 달라고 요청했다.

## 이번 슬라이스

- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`에서 소스 에디터 템플릿, 프로파일 라우팅, Monaco 에디터 설정을 분리했다.
- UI 동작 변경 없이 정적 설정과 소스 에디터 헬퍼를 `components/workbench/source-editor/` 모듈로 이동했다.

## 수용 기준

- `MonitorShell.tsx`가 소스 에디터 템플릿/Monaco 정적 설정을 직접 소유하지 않는다.
- 새 모듈 구조를 테스트로 고정한다.
- Workspace Monitor 테스트와 타입/계약 체크가 통과한다.
