# 외부 SVG 실제 수집 계획

## 작업 모드

- `governance`

## 계획

1. 웹 검색과 공식 repository 확인으로 source와 license 후보를 확인한다.
2. GitHub 기본 branch와 resolved commit을 확인한다.
3. self-documenting collection policy를 작성한다.
4. pinned archive와 path allowlist 기반 collector를 작성한다.
5. dry-run으로 source별 수량과 샘플 경로를 확인한다.
6. 실제 SVG, `LICENSE`, `SOURCE.json`, external registry를 생성한다.
7. `asset_browser.py`를 external registry에도 동작하도록 확장하고 gallery를 생성한다.
8. 문서, 요구사항, 스펙, 히스토리, 평가를 갱신한다.
9. 테스트, config contract, memory bootstrap, workspace health, browser smoke를 실행한다.
10. 커밋하고 push한다.
