# 설치형 소프트웨어 제품화 웹 검색 기록

## 요청

플랫폼을 Visual Studio 같은 설치형 소프트웨어 구조로 만드는 방향을 검토해달라는 요청.

## 검색어

- `Electron application distribution official docs installer code signing notarization`
- `Tauri distribution bundler official docs macOS Windows Linux installer`
- `Microsoft MSIX desktop app packaging official docs installer`
- `Apple notarizing macOS software before distribution official documentation`

## 확인한 출처

| 출처 | 유형 | 사용한 이유 |
| --- | --- | --- |
| Electron Application Packaging | official docs | Electron 기반 desktop packaging 후보 |
| Electron Forge Makers | official docs | OS별 installer maker 후보 |
| Tauri Distribute | official docs | Tauri 기반 desktop distribution 후보 |
| Tauri Windows Installer | official docs | Windows MSI/NSIS 후보 |
| Microsoft MSIX docs | official docs | Windows packaging format |
| Apple notarization docs | official docs | macOS outside-App-Store trust gate |

## 제외한 약한 출처

- Reddit notarization/MSIX 토론은 실제 운영 이슈를 발견하는 데는 유용하지만, 이번 구조 결정의 사실 근거로는 공식 문서보다 약하므로 보조 신호로만 보았다.
- Wikipedia류 개요 문서는 최신 배포 요구사항 근거로 쓰지 않았다.

## 계획 반영 인사이트

- 설치형 제품화는 `install_mode`보다 상위의 end-user distribution 문제다.
- 별도 루트 프로젝트가 필요하다.
- Tauri-first prototype을 추천하되, Electron과 native packaging-only를 비교 후보로 유지해야 한다.
- macOS/Windows/Linux별 release gate를 설정 파일에 명시해야 한다.
- 실제 dependency 설치는 이번 작업에서 하지 않고, 다음 구현 단계에서 설치 감사와 함께 검토해야 한다.

## 남은 불확실성

- 최종 desktop framework 선택은 native API, updater, Python sidecar/local service, OS 우선순위가 확정된 뒤 결정해야 한다.
- signing certificate와 notarization account 상태는 아직 확인하지 않았다.
