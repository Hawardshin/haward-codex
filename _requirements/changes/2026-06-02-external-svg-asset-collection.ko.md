# 외부 SVG 실제 수집 요구사항 변경

## 변경 ID

- `REQ-WS-083`
- `DAL-REQ-006`

## 사용자 의도

- 단순 후보가 아니라 실제로 사용할 수 있는 SVG 파일을 많이 수집해 달라는 요청이다.

## 변경 내용

- 공식 오픈소스 repository에서 실제 SVG 파일을 수집한다.
- source별 pinned commit, license URL, local `LICENSE`, local `SOURCE.json`, upstream path를 기록한다.
- 수집 경로는 path allowlist로 제한한다.
- 실제 수집 registry는 `data/external-asset-registry.json`으로 생성 자산 registry와 분리한다.
- 첫 수집 tranche는 Lucide, Heroicons, Bootstrap Icons, Tabler Icons에서 총 3,048개 SVG로 구성한다.

## 근거

- 사용자는 “실제로 수집해 많이”라고 요청했다.
- 이전 구조는 외부 source를 후보로만 기록했으므로, 실제 파일 사용성 요구를 충족하지 못했다.
- 실제 수집은 license-sensitive 하므로 source provenance와 local license 보존이 필수다.
