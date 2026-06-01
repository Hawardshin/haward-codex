# macOS 실행 구조 계획

## 작업 순서

1. 공식 문서 조사
   - Apple outside-App-Store distribution, hardened runtime, notarization, Gatekeeper launch testing을 확인한다.
   - Tauri macOS App Bundle, DMG, code signing, notarization, updater 문서를 확인한다.
   - Electron은 fallback 비교 근거로만 확인한다.

2. 구조 설정 작성
   - `macos-execution-profile.json`을 self-documenting config로 만든다.
   - 실행 레벨, 프로세스 모델, 권한, 배포 포맷, update strategy, smoke tests를 넣는다.

3. 문서와 요구사항 연결
   - 프로젝트 문서와 packaging strategy에 macOS profile을 연결한다.
   - 공유 요구사항 `REQ-WS-069`와 프로젝트 요구사항 `PDA-REQ-007`을 연결한다.

4. 검증
   - JSON parse와 config contract를 실행한다.
   - memory bootstrap, docs/naming/structure/workspace health, omission/grounding/evaluator를 실행한다.

## 결정

- 현재 구조 결정은 Tauri-first다.
- 실제 구현/설치는 추후 별도 spec과 installation audit에서 처리한다.

