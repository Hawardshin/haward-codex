# 2026-06-03 Monaco 코드 편집 surface 계획

## 작업 모드

- `work_mode`: `standard`
- `view_mode`: `superadmin_developer`
- `install_mode`: `developer`
- 설치 여부: 실제 신규 설치 없음. `workspace-monitor`에는 이미 `@monaco-editor/react@4.7.0`과 `monaco-editor@0.55.1`이 등록되어 있다.

## 코딩 조사 요약

### 기술 스택

- TypeScript / React 19 / Next.js 16
- Tauri 2 command bridge
- Monaco Editor 0.55.1
- `@monaco-editor/react` 4.7.0

### 언어/런타임 옵션

- 옵션 A: 기존 TypeScript/React UI에 Monaco editor를 연결한다.
- 옵션 B: Code OSS 또는 VSCodium 계열을 별도 앱/iframe/프로세스로 붙인다.
- 옵션 C: CodeMirror 6로 가볍게 구현한다.
- 선택: 옵션 A.
- 결정 이유: 현재 앱은 Tauri가 `workspace-monitor`를 임베드한다. Monaco는 VS Code 계열 editor surface를 앱 안에 넣는 가장 작은 단위이고, 기존 Tauri read/write/backup gate를 보존한다. Code OSS 전체 복제는 product/trademark/marketplace/runtime 이식 비용이 크고, CodeMirror는 VS Code 계열 요구와 덜 직접적으로 맞는다.

### 아키텍처 옵션

- 옵션 A: `DesktopRuntimePanel`의 기존 scoped editor 상태와 Tauri commands는 유지하고 `<textarea>`만 Monaco workbench로 교체한다.
- 옵션 B: 별도 `CodeEditorPanel` component와 router-level section을 새로 만든다.
- 선택: 옵션 A.
- 결정 이유: 이미 source draft queue, diff summary, save all, backup write gate가 구현되어 있어 editor surface만 교체하면 blast radius가 작다.

### 폴더 구조 옵션

- 옵션 A: `workspace-monitor/components/MonitorShell.tsx`와 `workspace-monitor/app/globals.css`만 수정한다.
- 옵션 B: `workspace-monitor/components/CodeEditorWorkbench.tsx`를 새로 분리한다.
- 선택: 옵션 A.
- 결정 이유: 이번 변경은 기존 editor UI 교체가 핵심이다. `MonitorShell` 분리는 다음 유지보수 작업에서 전체 desktop shell과 함께 하는 편이 낫다.

### 설치/라이선스 검토

- 신규 설치 명령: 없음.
- 기존 dependency 확인: `corepack pnpm --filter workspace-monitor why @monaco-editor/react monaco-editor`
- 라이선스: Monaco Editor MIT, `@monaco-editor/react` MIT, Code OSS source MIT. Visual Studio Code 제품 배포판은 별도 Microsoft product license.
- rollback: Monaco editor 렌더를 제거하고 기존 `<textarea>` editor로 되돌리면 Tauri read/write 기능은 그대로 유지된다.

## 구현 범위

- Monaco editor dynamic import와 language mapping을 추가한다.
- source draft textarea를 Monaco editor로 바꾼다.
- current draft copy 버튼과 copy notice를 추가한다.
- Source read-only browser에도 선택 파일 copy 버튼을 추가한다.
- CSS를 desktop workbench editor 높이, toolbar, fallback loading 상태에 맞춘다.

## 검증 계획

- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run build`
- Browser static preview에서 desktop runtime editor panel이 비어 있지 않은지 확인
- customer snapshot 검사를 다시 실행해 source/editor 내부 데이터 경계를 확인
