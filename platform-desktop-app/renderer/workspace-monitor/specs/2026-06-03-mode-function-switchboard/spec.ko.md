# 스펙: 모드와 기능 선택 위치 스위치보드

## 목적

워크스페이스 모니터는 view mode, language mode, work mode, install mode, 데스크톱 세션 모드, task pipe preset, CLI adapter, monitor section을 한 곳에서 보여줘야 한다. 사용자는 “어떤 모드가 있고 어디서 고르는지”를 Overview에서 바로 확인하고, 가능한 항목은 즉시 선택하거나 해당 위치로 이동할 수 있어야 한다.

## 기능 범위

- snapshot에 `modeFunctionCatalog`를 생성한다.
- catalog는 그룹, 옵션, 기본값, 선택 위치, 출처 파일, desktop runtime 여부를 포함한다.
- Overview에 `Mode & Function Switchboard` 패널을 추가한다.
- view/language 옵션은 패널에서 직접 선택한다.
- desktop session, task pipe, CLI adapter 옵션은 Desktop 섹션으로 이동한다.
- monitor section 옵션은 해당 섹션으로 이동한다.
- work/install 옵션은 선택 위치와 registry 출처를 명시한다.

## 비목표

- work/install mode를 브라우저 클라이언트 상태로 저장하지 않는다.
- CLI adapter를 자동 설치하지 않는다.
- client-side mode selection을 보안 경계로 취급하지 않는다.

## 수용 기준

- `workspace-snapshot.json`에 `modeFunctionCatalog.summary`와 8개 그룹이 포함된다.
- Overview에서 `Mode & Function Switchboard`와 `모드와 기능 선택 위치`가 렌더링된다.
- desktop readiness 테스트가 switchboard UI 토큰을 검사한다.
- `npm run collect`, `npm test`, `npm run check`, `npm run build`가 통과한다.
