# 외부 SVG 실제 수집 웹 검색 기록

## 요청

- 실제 SVG 파일을 많이 수집한다.

## 검색 시각

- 2026-06-02

## 검색어

- `Lucide icons GitHub license SVG official`
- `Heroicons GitHub license MIT official`
- `Bootstrap Icons GitHub license MIT SVG official`
- `Tabler Icons GitHub license MIT SVG official`

## 확인한 출처

| Source | URL | 확인 내용 | 반영 |
| --- | --- | --- | --- |
| Lucide GitHub | https://github.com/lucide-icons/lucide | 공식 repository, `LICENSE`, `icons/` source path | 800개 수집, commit `423afc6d03c1fb1b86090aa14b13f7f2fa6296e4` |
| Heroicons GitHub | https://github.com/tailwindlabs/heroicons | 공식 repository, `LICENSE`, `optimized/24/outline`, `optimized/24/solid` path | 648개 수집, commit `616b7a4dbbf3d011760af8066262cd5c6b3868f3` |
| Bootstrap Icons GitHub | https://github.com/twbs/icons | 공식 repository, `LICENSE`, `icons/` source path | 800개 수집, commit `66fd192fe2085a8255a11b58710f2d9e7f481d02` |
| Tabler Icons GitHub | https://github.com/tabler/tabler-icons | 공식 repository, `LICENSE`, `icons/outline/` source path | 800개 수집, commit `6d128ed935d4546607b1e4d5d08c8b27bdbe7758` |

## 추가 확인

- `git ls-remote --symref`로 기본 branch를 확인했다.
- GitHub codeload pinned commit archive를 사용해 moving branch가 아닌 재현 가능한 source를 사용했다.
- tarball path 목록을 확인해 docs/preview/build SVG가 수집되지 않도록 allowlist를 좁혔다.

## 약하게 본 출처

- third-party icon catalog, 검색 결과 요약, 블로그는 실제 수집 근거로 사용하지 않았다.

## 계획 반영

- 실제 수집 source는 4개 공식 repository로 제한한다.
- Google Material Symbols, OpenMoji, Font Awesome Free는 이번 실제 수집 범위에서 제외하고 후보 상태를 유지한다.
- source별 `LICENSE`, `SOURCE.json`, `resolved_commit`, `upstream_path`를 registry에 저장한다.

## 불확실성

- public 배포 전에는 각 source의 최신 license/attribution/trademark 조건을 다시 확인해야 한다.
- 이번 수집은 법률 자문이 아니라 provenance를 갖춘 기술적 수집 구조다.
