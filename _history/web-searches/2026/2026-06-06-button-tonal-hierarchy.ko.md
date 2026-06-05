# 웹 검색 기록

## 쿼리

- `Apple Human Interface Guidelines buttons visual hierarchy controls macOS settings choices`
- `Material Design buttons elevation tonal buttons visual hierarchy choices`
- `WAI ARIA button listbox radio group selectable options visual state accessibility`
- `Nielsen Norman Group button design visual hierarchy contrast UI`

## 확인한 기준

- Apple HIG와 Material Design은 버튼의 계층, 강조, 선택 상태를 시각적으로 구분하도록 권장한다.
- Material Design의 elevation/tonal button 개념은 같은 표면에 묻히는 버튼을 구분하는 근거가 된다.
- WAI-ARIA APG는 선택형 control에 상태를 명확히 노출하는 패턴을 제공한다.
- NN/g 계열 자료는 사용자가 클릭 가능한 항목과 현재 선택 상태를 빠르게 구분해야 한다는 사용성 기준을 제공한다.

## 계획 영향

전체 테마 변경 대신 선택/검색 표면 토큰을 추가하고, compact 버튼과 active 버튼의 visual hierarchy를 CSS로 보강했다.
