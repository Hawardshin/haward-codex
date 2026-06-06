# Plan: Runtime Customization Layer

## 옵션 비교

| 옵션 | 장점 | 단점 | 결정 |
| --- | --- | --- | --- |
| 기존 preferences JSON 확장 | 새 설치 없음, Tauri command와 Rust normalizer 재사용, 현재 앱 구조와 잘 맞음 | key-value store plugin보다 수동 schema 관리가 필요 | 선택 |
| `tauri-plugin-store` 도입 | 공식 persistent store API 사용 가능 | dependency/install audit 범위 증가, 현재 preferences와 중복 | 보류 |
| renderer localStorage 저장 | 구현이 작음 | 데스크톱 앱의 Rust 실행 경로와 불일치, native 실행에 연결하기 어려움 | 기각 |

## 실행 순서

1. preferences TypeScript/Rust schema에 runtime customization 추가.
2. 설정 UI에 실행 커스텀 섹션 추가.
3. provider 선택, provider task 실행, model catalog refresh에 커스텀 모델/base URL 연결.
4. native PTY 시작에 shell/startup command와 quick command override 연결.
5. 정적 테스트, TypeScript check, Rust check, package build로 검증.

## 리스크와 완화

- 잘못된 base URL이 provider 호출을 깨뜨릴 수 있다: http/https와 길이 제한으로 정규화한다.
- 기존 preferences 파일에 새 필드가 없을 수 있다: `serde(default)`와 renderer normalizer로 기본값을 채운다.
- UI만 바뀌고 실행 경로가 빠질 수 있다: 테스트에서 renderer state, PTY args, Rust endpoint 생성까지 확인한다.
