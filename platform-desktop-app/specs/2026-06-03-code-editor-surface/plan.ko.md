# Monaco 코드 편집 surface 구현 계획

1. `MonitorShell.tsx`에 Monaco dynamic import, language mapper, clipboard helper를 추가한다.
2. Source viewer header에 copy 버튼과 notice를 추가한다.
3. `DesktopRuntimePanel`의 source editor textarea를 Monaco editor로 교체한다.
4. editor toolbar에 Copy Current를 추가하고 상태 notice를 표시한다.
5. CSS에 Monaco container, loading, copy notice 스타일을 추가한다.
6. check/test/build와 Browser static preview 검증을 수행한다.
