# 외부 SVG 실제 수집 계획 기록

## 요청 요약

- 생성 SVG나 후보 링크가 아니라 실제로 사용할 수 있는 외부 SVG 파일을 많이 수집한다.

## 계획 근거

- 직전 작업은 내부 생성 SVG 600개와 외부 후보 source를 만들었지만, 사용자가 요청한 것은 실제 수집 파일이었다.
- 실제 파일을 저장하면 라이선스, source URL, commit, upstream path, local path, 검증 결과가 함께 남아야 한다.
- 공신력 있는 출처를 우선하기 위해 공식 GitHub repository만 첫 수집 대상으로 사용했다.

## 실행 계획

1. 공식 source와 license path를 웹 검색 및 `git ls-remote`로 확인한다.
2. moving branch가 아니라 pinned commit tarball을 사용한다.
3. source별 allowlist path를 정해 docs/preview/build SVG가 섞이지 않게 한다.
4. collector를 작성해 SVG 파일, source별 `LICENSE`, `SOURCE.json`, registry를 생성한다.
5. `asset_browser.py`가 generated registry와 external registry를 모두 검색, snippet, gallery 생성에 사용할 수 있게 한다.
6. 문서, 요구사항, 스펙, history, memory bootstrap, project boundary를 갱신한다.
7. 단위 테스트, XML parse 검사, config contract, browser smoke, workspace health, omission/grounding/evaluation을 수행한다.

## 병목 예상

- 수천 개 SVG가 들어오면 workspace index와 health check 시간이 늘어난다.
- public 전환 전 라이선스/상표/attribution 재검토가 필요하다.
- source가 늘수록 registry 검색과 gallery 필터가 중요해진다.
