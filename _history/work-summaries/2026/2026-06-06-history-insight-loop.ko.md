# 작업 요약: 히스토리 인사이트 루프

## 변경

- Workspace Monitor collector에 `historyInsightLoop`를 추가했다.
- 히스토리 반복 패턴 6개를 deterministic rule로 감지한다.
- Product Structure 화면에 `히스토리 인사이트 루프` 보드를 추가했다.
- customer snapshot에서는 내부 evidence path를 제거한다.
- product feature registry의 Learning & Evaluation Loop에 새 asset/signal을 연결했다.

## 검증

- `workspace-monitor test`: 통과, 64 tests.
- `workspace-monitor tsc --noEmit`: 통과.
- `platform-desktop-app test`: 통과, 24 tests.
- `workspace-monitor collect && check`: 통과.
- Browser static smoke: 통과, Product Structure에서 보드 visible, 4 cards visible, overflow false.
- `desktop:package:internal`: 통과, `.app`/`.dmg` 생성 및 검증 완료.
