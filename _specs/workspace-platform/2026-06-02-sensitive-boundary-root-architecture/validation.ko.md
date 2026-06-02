# 검증

## 필수 검증

- `check-config-contract` for `sensitive-file-boundary.json`
- `privacy-audit --check`
- `structure-audit --check`
- `docs-audit --check`
- `naming-audit --check`
- `check-memory-bootstrap`
- `check-config-contract` for core settings
- `workspace-index`
- `workspace-monitor npm run collect`
- `workspace-monitor npm run build`
- `check-omissions`
- `check-grounding`
- `evaluate-work`

## 수용 기준

- `_private/` 내부 경로가 repository map과 monitor snapshot에 나타나지 않는다.
- `_private/`는 존재가 보이지만 내용은 기본적으로 AI 작업 컨텍스트가 아니다.
- 최상위 폴더가 논리 계층으로 설명된다.
