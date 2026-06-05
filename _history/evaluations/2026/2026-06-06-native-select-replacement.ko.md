# 평가: Native Select 교체

날짜: 2026-06-06

## 결론

요청은 충족됐다. OS 기본 드롭다운을 유발하는 native `<select>`를 Workspace Monitor 컴포넌트에서 제거했고, 앱 스타일 선택 메뉴와 버튼 그룹으로 교체했다.

## 검증

- `workspace-monitor` 테스트 59개 통과.
- `workspace-monitor` 타입/스크롤/소스 컨트롤/히스토리 payload 체크 통과.
- `platform-desktop-app` 테스트 22개 통과.
- `platform-desktop-app` 내부 readiness 체크 통과.
- `package:internal` 통과. `.app`과 `.dmg` 산출물 생성 및 DMG verification 통과.

## 품질 판단

- 사용자 불만의 핵심인 OS native dropdown popup은 source 수준에서 제거됐다.
- 짧은 선택지는 바로 보이는 버튼으로 바뀌어 선택 가능성이 더 명확해졌다.
- 긴 목록은 앱 스타일 메뉴로 유지해 화면 밀도를 과하게 늘리지 않았다.
- 재발 방지 테스트가 추가되어 다시 `<select>`가 들어오면 실패한다.

## 남은 제한

- In-app Browser smoke는 본문이 `Loading workspace snapshot`을 벗어나지 못해 visual confirmation이 제한됐다.
- 공개 배포 readiness는 기존 public signing/notarization/updater/clean-machine smoke gate가 남아 있다.
