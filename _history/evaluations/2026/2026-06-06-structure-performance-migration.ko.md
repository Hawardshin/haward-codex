# 평가: 구조/메모리/성능 마이그레이션

## 판정

부분 충족이 아니라, 이번 범위는 충족. 다만 전체 구조의 근본 문제는 한 번의 slice로 끝나지 않는다. 지금 당장 효과가 큰 source snapshot payload와 editor input state churn은 개선했고, 더 큰 분해는 다음 migration으로 남겼다.

## 냉정한 결론

- `MonitorShell.tsx` 13k lines는 유지보수와 렌더 성능 양쪽에서 좋지 않다.
- `globals.css` 16k lines는 스타일 소유권이 약하다.
- `src-tauri/src/lib.rs` 9.5k lines는 Rust command domain 분리가 필요하다.
- static snapshot에 source content를 넣는 구조는 desktop runtime이 생긴 뒤에는 맞지 않는다.
- Monaco 입력을 React state에 매번 밀어 넣는 구조는 코드 편집 UX와 맞지 않는다.

## 구현 증거

- source snapshot `content` 제거, `preview`/`previewBytes` 전환.
- preview total budget 220KB gate 추가.
- Monaco input 180ms throttled state sync.
- save/copy/save-all 최신 editor buffer 사용.

## 검증

- developer snapshot size: 약 3.60MB에서 약 2.77MB.
- source content entries: 0.
- source preview bytes: 135,688.
- workspace-monitor test/check 통과.
- platform-desktop-app test/check 통과.
- `corepack pnpm --dir platform-desktop-app run package:internal` 통과. `.app`/`.dmg`, codesign verify, hdiutil verify 완료.

## 남은 리스크

- 큰 컴포넌트/스타일/Rust 파일 분해는 아직 남아 있다.
- 실제 사용자 입력 latency는 앱에서 Playwright 또는 native telemetry로 더 측정할 필요가 있다.
