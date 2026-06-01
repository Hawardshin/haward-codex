# 구현 계획

## 단계

1. 웹 검색으로 build-time file reading, static export, code viewer 선택지를 확인한다.
2. 고급 dependency 없는 plain source viewer와 Monaco/Shiki 후보를 비교한다.
3. `collect-workspace.mjs`에 안전한 source root 기반 `sourceFiles` catalog를 추가한다.
4. snapshot 타입에 `WorkspaceSourceFile`을 추가한다.
5. `MonitorShell`에 Source 탭과 필터/코드 뷰어를 추가한다.
6. view mode registry에서 `source` 섹션을 developer/superadmin에만 허용한다.
7. README, 요구사항, 설치형 앱 사용자 플로우 문서를 갱신한다.
8. 테스트, 타입 검사, 빌드, workspace health, evaluator로 검증한다.

## 옵션 비교

| 옵션 | 장점 | 단점 | 결정 |
| --- | --- | --- | --- |
| Plain `<pre><code>` viewer | 의존성 없음, 정적 export와 잘 맞음, 빠른 구현, 보안 표면 작음 | 고급 하이라이팅 없음 | 현재 선택 |
| Shiki | 정적 하이라이팅 품질 좋음 | dependency와 build 비용 증가 | 후속 후보 |
| Monaco Editor | 강력한 코드 탐색/편집 UX | 무겁고 편집 기능/보안/번들 고려 필요 | 현재 비범위 |

## 소스 수집 기준

- 포함: root project의 `src`, `tests`, `app`, `components`, `lib`, `scripts`; `_tools/*/src`, `_tools/*/tests`, `_tools/*/scripts`
- 제외: `.git`, `.next`, `node_modules`, `out`, `src/generated`, `public`, lock/build cache, 큰 파일
