# VS Code 하드 포크 워크스페이스 웹 우선 확인

날짜: 2026-06-06

## 쿼리

- `microsoft vscode GitHub repository license build from source official`
- `Visual Studio Code build from source official wiki`
- `microsoft vscode product.json nameShort nameLong build source`
- `site:github.com/microsoft/vscode/issues product.json Code - OSS applicationName hard fork`
- `site:github.com/microsoft/vscode/issues built-in extension gulpfile.extensions tsconfig compile-extensions`
- `site:github.com/microsoft/vscode/discussions build Code - OSS from source product.json`

## 확인한 소스

| 소스 | 유형 | 사용 |
| --- | --- | --- |
| https://github.com/microsoft/vscode | 공식 저장소 | Code - OSS 원본, MIT 라이선스, build/run from source entrypoint |
| https://github.com/microsoft/vscode/wiki/How-to-Contribute | 공식 wiki | source build와 개발 workflow 확인 |
| https://github.com/microsoft/vscode/wiki/Differences-between-the-repository-and-Visual-Studio-Code | 공식 wiki | Code - OSS와 Microsoft Visual Studio Code 배포판의 경계 확인 |
| https://github.com/microsoft/vscode/wiki/source-code-organization | 공식 wiki | source organization, extension/workbench boundary 확인 |
| https://github.com/microsoft/vscode/issues/246466 | upstream issue | npm 11 관련 OSS build warning이 알려진 이슈임을 확인 |

## 계획 영향

- Microsoft Visual Studio Code 배포판이 아니라 Code - OSS repository를 하드 포크 기준으로 삼았다.
- 제품 정체성은 `product.json`에서 시작하고, 작업공간 기능은 내장 extension surface로 시작하는 쪽을 선택했다.
- npm 11 경고는 upstream에서도 논의된 환경 경고로 보되, audit 경고는 별도 리스크로 기록했다.
- public redistribution은 별도 법무/상표/signing/service endpoint gate로 분리했다.

## 불확실성

- upstream monthly changes로 인해 rebase 충돌 가능성이 높다.
- 이번 조사는 첫 구현 slice에 필요한 공식/고신뢰 소스 중심이며, marketplace/service endpoint와 public branding은 별도 조사가 필요하다.
