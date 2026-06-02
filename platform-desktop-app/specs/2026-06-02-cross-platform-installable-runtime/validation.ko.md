# 검증 계획

## 자동 검증

```bash
npm --prefix platform-desktop-app run check
npm --prefix platform-desktop-app test
python3 -m json.tool platform-desktop-app/configs/desktop-distribution-registry.json
python3 -m json.tool platform-desktop-app/configs/macos-execution-profile.json
python3 -m json.tool platform-desktop-app/configs/windows-execution-profile.json
cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/desktop-distribution-registry.json ../platform-desktop-app/configs/macos-execution-profile.json ../platform-desktop-app/configs/windows-execution-profile.json
```

## 수동 검증

- README가 실제 상태를 과장하지 않는지 확인한다.
- public-ready 표현이 없는지 확인한다.
- Rust/Tauri dependency 설치가 실제로 발생하지 않았는지 확인한다.
- optional AI CLI가 필수 런타임으로 표현되지 않았는지 확인한다.

## 보류 검증

- `npm run tauri:dev`: Rust/Tauri dependency 설치 감사 후 실행.
- `npm run tauri:build`: Rust/Tauri dependency 설치, OS별 signing/build prerequisites 확인 후 실행.
- macOS notarization/Windows signed installer: credentials와 clean-machine test 환경 준비 후 실행.

