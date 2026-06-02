# 디자인 에셋 사용성 확장 계획 기록

## 요청 요약

- 디자인 에셋을 계속 많이 모으고, 사용자가 쉽게 쓸 수 있는 구조로 확장한다.

## 계획 근거

- 기존 자산 라이브러리는 내부 생성 SVG와 provenance registry가 있었지만, 사용자가 빠르게 훑고 선택하는 도구가 부족했다.
- 외부 오픈소스 SVG는 후보로만 기록하고 실제 파일은 license review 후 저장해야 한다.

## 실행 계획

1. 공식 출처 중심으로 외부 후보를 확인한다.
2. 내부 생성 SVG를 motif x palette 전체 조합으로 늘린다.
3. registry에 600개 생성 자산과 추가 후보를 기록한다.
4. `asset_browser.py`로 `families`, `search`, `snippet`, `gallery` 명령을 제공한다.
5. 정적 `gallery.html`을 생성한다.
6. 문서와 발표 에이전트 사용 흐름을 갱신한다.
7. 테스트, config, memory, workspace health, 평가를 실행한다.

## 병목 예상

- registry와 SVG 파일 수가 커져 workspace indexing 시간이 늘 수 있다.
- 외부 후보 license는 최종 해석이 아니라 저장 전 재검토 대상이다.
