# 구현 계획

1. 브라우저에서 desktop runtime 화면을 확인해 가로 overflow와 세로로 찢기는 텍스트 원인을 찾는다.
2. `globals.css`에서 runtime workbench 패널과 form grid를 full-width, responsive layout으로 보강한다.
3. `SnapshotLoader`의 generated snapshot fallback import를 제거해 대형 snapshot chunk를 없앤다.
4. customer build, performance budget, bundle audit, tests, Browser smoke로 검증한다.
