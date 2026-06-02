# 질문 보류 성능 검증

## 검증 명령

- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run collect`
- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run perf:budget`
- `npm --prefix platform-desktop-app test`
- `npm --prefix platform-desktop-app run check`
- `rg` static token check
- `git diff --check`

## 제한

- Rust toolchain이 없어 native compile과 benchmark는 실행하지 못한다.
- Browser automation tool이 노출되지 않으면 static output check로 대체한다.
