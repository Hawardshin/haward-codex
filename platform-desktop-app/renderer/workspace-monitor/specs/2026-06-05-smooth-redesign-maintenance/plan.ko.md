# 계획: Smooth Redesign Maintenance

1. 공식 UI/performance 참고와 local 구조를 확인한다.
2. `MonitorShell`에 누적된 motion helper를 분리하고 테스트 계약을 옮긴다.
3. motion token, keyframes, dialog/menu/dropdown/detail transition을 통일한다.
4. 여러 탭을 Playwright로 열어 작은 버튼, overflow, clipped text를 찾고 수정한다.
5. collector의 history preview 정책을 bounded admin summary로 변경하고 payload check를 추가한다.
6. 한국어 고노출 문구를 정리한다.
7. test, check, build, customer build, perf, Playwright smoke로 검증한다.

## 결정

- 새 dependency는 추가하지 않는다. 기존 React/Next/Radix/Playwright와 로컬 Chrome만 사용한다.
- history 원문은 삭제하지 않고 path/source metadata로 추적한다.
- UI animation은 장식보다 반응 상태 확인에 집중한다.
