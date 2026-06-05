# 웹 검색 기록: Tool Studio Source Separation

## 검색

- React official docs lazy loading component code splitting
- Next.js official docs dynamic imports lazy loading client components
- TypeScript official modules handbook export import

## 확인한 출처

- React `lazy`: 컴포넌트 코드를 처음 렌더링할 때까지 지연 로드할 수 있다는 공식 설명을 확인했다. 이번 작업은 lazy split이 아니라 다음 단계 lazy split을 쉽게 하는 source boundary 정리로 적용했다.
- Next.js Lazy Loading guide: `next/dynamic`과 lazy loading이 route initial JavaScript를 줄이는 데 쓰인다는 공식 설명을 확인했다. 현재는 기존 export 호환을 유지하는 정적 모듈 분리로 제한했다.
- TypeScript Modules handbook: top-level import/export가 있는 파일이 module이라는 기준을 확인했다. Tool Studio 타입과 catalog data를 ESM 모듈로 분리하는 근거로 사용했다.

## 계획 영향

- UI 동작 변경 없이 public type module과 static data module을 먼저 분리한다.
- 기존 `ToolStudioPanel` import 계약은 re-export로 유지한다.
- `MonitorShell.tsx` 대분해와 실제 lazy-loaded pane 분리는 후속 slice로 남긴다.
