# 계획: Button Library Baseline

1. 공식 Button/Slot/CVA 레퍼런스와 현재 버튼 사용 밀도를 확인한다.
2. 설치 감사 초안을 작성하고 project-local exact dependency를 설치한다.
3. `components/ui/Button.tsx`를 추가하고 CSS token 기반 `ui-button` variant를 정의한다.
4. titlebar, task handoff, Tool Studio 대표 기본 액션을 Button으로 migration한다.
5. 정적 테스트, 요구사항, 설치 기록, 스펙/추적 문서를 갱신한다.
6. audit, test, typecheck, check, build, build:customer, perf budget, Browser smoke, diff check를 실행한다.
