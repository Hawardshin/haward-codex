# 구현 계획

1. 웹 검색으로 Electron, Tauri, MSIX, Apple notarization 공식 문서를 확인한다.
2. 기존 `install_mode` 구조와 프로젝트 등록부를 읽어 제품 경계를 정한다.
3. `platform-desktop-app/` 프로젝트 skeleton을 만든다.
4. desktop distribution registry와 제품 경계/패키징 문서를 작성한다.
5. 공유 정책, workflow, prompt, index, router, memory bootstrap을 갱신한다.
6. 요구사항, 히스토리, 검색 기록, trace, 평가 기록을 남긴다.
7. JSON/config/docs/structure/name/map/board/evaluator 검증을 실행한다.
8. 변경 사항을 커밋하고 push한다.

## 선택한 작업 모드

- `governance`
- 이유: 새 루트 프로젝트, durable policy, requirements/spec/history/evaluation 변경이 포함된다.

## 설치 여부

- 실제 설치 없음.
- Tauri/Electron dependency는 다음 구현 단계에서 별도 설치 감사와 함께 검토한다.
