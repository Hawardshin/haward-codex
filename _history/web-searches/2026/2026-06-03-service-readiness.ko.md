# 웹 검색 기록: 실제 서비스 준비도 표면

## 메타

- 날짜: 2026-06-03
- 요청: `UR-2026-06-03-012`
- 소유 프로젝트: `platform-desktop-app/`
- 목적: 설치형 데스크톱 앱을 실제 서비스로 보기 위해 필요한 release/update/privacy/support/onboarding gate 확인

## 쿼리

- `Tauri production app security guide updater logging crash reporting official documentation`
- `Tauri v2 updater plugin official documentation production desktop app`
- `Apple Developer notarizing macOS software hardened runtime distribution official`
- `OWASP MASVS privacy data storage logging mobile desktop app production readiness`

## 확인한 출처

| 출처 | 신뢰도 | 확인 내용 | 계획 영향 |
| --- | --- | --- | --- |
| Tauri v2 Updater Plugin | 높음 | Tauri updater는 update server 또는 static JSON을 쓰며, update artifact signature 검증이 필요하고 production endpoint는 TLS를 전제한다. | signed updater channel을 public release blocker로 기록했다. |
| Tauri Distribute | 높음 | Tauri 배포는 OS별 packaging/signing 문서와 연결된다. | service readiness group에 signed distribution과 update/recovery를 분리했다. |
| Apple Developer Notarization | 높음 | macOS public distribution은 Developer ID signing, hardened runtime, notarization/stapling 검증이 필요하다. | public signing/notarization을 internal check와 분리한 public blocker로 유지했다. |
| OWASP MASVS-STORAGE | 높음 | 민감 데이터 저장/로그/diagnostic export는 보안 및 privacy 관점에서 별도 관리되어야 한다. | support diagnostic redaction, runtime data boundary, raw private content exclusion을 service readiness group으로 만들었다. |

## 약한 출처 및 제외

- 일반 블로그의 SaaS launch checklist는 제품 운영 신호로만 참고하고 구현 근거로 사용하지 않았다.
- 유료 배포 서비스 문서는 특정 vendor lock-in 가능성이 있어 이번 slice에서는 제외했다.

## 공개 결정 요약

- public release ready라고 주장하지 않는다.
- internal readiness는 통과 가능하되 public blocker를 숨기지 않는다.
- signed updater, Developer ID signing/notarization, clean-machine smoke, runtime workspace chooser enforcement를 후속 release gate로 남긴다.
