# 검증: Workspace Monitor 탭 전환과 소스 편집 UX

## 명령

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`: 통과, 53개 테스트.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor check`: 통과.
- `corepack pnpm --dir platform-desktop-app run renderer:build`: 통과, Next production build와 customer bundle audit 성공.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run collect -- --best-effort`: 빌드 후 개발용 public snapshot 정상화.

## 브라우저 스모크

- URL: `http://127.0.0.1:4173`
- 초기 상태: `activeSection=overview`, `data-section-content-ready=true`, 소스 패널 마운트됨, hidden 상태.
- 소스 탭 전환: `activeSection=source`, 소스 패널 hidden 해제, 가로 오버플로 없음.
- 반복 전환: tools -> source 후 소스 패널 계속 마운트됨, 가로 오버플로 없음.
- 콘솔 에러: 없음.

## 제한

- 정적 customer build에는 실제 소스 파일 목록이 없어 Monaco 편집 본문까지는 브라우저에서 확인하지 못했다. Monaco 기본값과 소스 편집 액션은 정적 테스트, 타입 체크, 빌드로 검증했다.
