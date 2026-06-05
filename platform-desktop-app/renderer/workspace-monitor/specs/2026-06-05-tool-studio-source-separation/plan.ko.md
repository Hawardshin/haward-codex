# Tool Studio Source Separation 계획

1. 기존 대형 파일의 책임을 확인한다.
2. 타입과 정적 데이터를 새 하위 모듈로 이동한다.
3. 기존 import 계약을 깨지 않도록 `ToolStudioPanel.tsx`에서 type re-export를 유지한다.
4. 테스트를 새 source boundary를 확인하도록 갱신한다.
5. 전체 검증을 실행한다.
