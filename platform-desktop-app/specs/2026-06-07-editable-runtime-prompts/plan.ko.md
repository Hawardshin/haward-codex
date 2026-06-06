# Plan: Editable Runtime Prompts

날짜: 2026-06-07

## 단계

1. 웹 우선 확인
   - 공식 문서에서 프롬프트 파일, custom instruction, agent instruction/tool 구성, frontend-native 연결 기준을 확인한다.
2. 현재 코드 확인
   - `MonitorShell`, `RuntimeTerminalDrawer`, runtime preferences 정규화, renderer tests를 확인한다.
3. 프런트엔드 구현
   - prompt override 타입과 default state를 추가한다.
   - 세션/작업 파이프라인 prompt choice에 key, default value, customized 상태를 추가한다.
   - 저장/기본값 액션과 CSS를 추가한다.
4. 네이티브 정규화 구현
   - Rust preferences 구조체에 prompt customization을 추가한다.
   - 허용 key whitelist와 빈 값 제거 테스트를 추가한다.
5. 검증
   - TypeScript/check, renderer tests, Rust unit test를 실행한다.
   - collect, renderer build, platform check를 실행한다.
   - Browser smoke로 실제 편집 UI가 렌더링되고 선택 프롬프트 저장 상태가 표시되는지 확인한다.
   - omission/resource/evaluator guard를 실행한다.

## 결정

- 별도 프롬프트 파일 편집기를 만들지 않고, 기존 Desktop Runtime의 선택지와 textarea에 저장/초기화 액션을 붙인다.
- 프롬프트 key whitelist를 Rust에 둔다. 사용자가 로컬 preferences를 직접 수정하더라도 알 수 없는 key가 실행 설정으로 남지 않게 하기 위해서다.
- 외부 dependency 설치는 하지 않는다. 현재 기능은 React state, preferences serialize, Tauri command boundary만으로 충분하다.
