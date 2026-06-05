# 평가: Workspace Monitor 탭 전환과 소스 편집 UX

## 결과

- 사용자 요청의 핵심인 탭 이동 렉, 사이드바 잘림감, 소스 편집 불편을 같은 Workspace Monitor 표면에서 처리했다.
- 탭 전환은 더 이상 `scheduleAfterFirstPaint`로 섹션 커밋을 미루지 않는다.
- 소스 편집 패널은 탭 이동 후에도 마운트가 유지되어 열린 드래프트와 편집 상태가 보존된다.
- 숨겨진 소스 패널의 런타임 side effect는 `surfaceActive`로 막았다.
- 구현 후 고객용 렌더러 빌드까지 실행했다.

## 검증

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`: 통과.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor check`: 통과.
- `corepack pnpm --dir platform-desktop-app run renderer:build`: 통과.
- 브라우저 스모크: `http://127.0.0.1:4173`, 소스 패널 마운트/표시 전환 확인, 가로 오버플로 없음, 콘솔 에러 없음.

## 남은 리스크

- 정적 customer snapshot에는 실제 소스 파일이 없어 Monaco 편집 본문까지 브라우저에서 확인하지 못했다. 실제 Tauri 런타임에서 파일 권한이 있는 상태의 수동 확인은 후속으로 유용하다.
- 전체 탭을 모두 상시 실행하는 방식은 리소스 중복 위험 때문에 적용하지 않았다. 이번 변경은 소스 편집 상태 보존과 모듈 선로딩에 집중했다.
