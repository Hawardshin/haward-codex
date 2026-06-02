# 웹 검색 기록: Language Mode Selector

## 검색 일시

- 날짜: 2026-06-02
- 작업 모드: `governance`
- 관련 요청: `UR-2026-06-02-032`

## 검색어

- `Next.js internationalization routing locale official docs App Router`
- `Next.js static export unsupported features internationalized routing official docs`
- `W3C language tags BCP 47 official documentation`

## 확인한 강한 출처

| 출처 | 유형 | 확인 내용 | 반영 |
| --- | --- | --- | --- |
| Next.js Internationalization, https://nextjs.org/docs/app/building-your-application/routing/internationalization | official docs | App Router에서 locale 기반 routing을 구성할 수 있음을 확인했다. | 이 작업은 URL locale 전환이 아니라 repository snapshot 문서 언어 필터이므로 route i18n은 비범위로 두었다. |
| Next.js Static Exports, https://nextjs.org/docs/pages/guides/static-exports | official docs | 정적 export는 서버 요청 처리나 일부 동적 라우팅 기능과 제약이 있음을 확인했다. | Vercel/public 전환 가능 static monitor에는 collector가 만든 data lens가 더 단순하고 유지보수하기 쉽다고 판단했다. |
| W3C Understanding the New Language Tags, https://www.w3.org/International/articles/bcp47/index.en | standard reference | BCP 47 language tag vocabulary와 `ko`, `en` 같은 안정적인 언어 tag 사용 근거를 확인했다. | `language-mode-registry.json`의 supported language id를 `ko`, `en`으로 두었다. |

## 약한 출처 또는 제외한 출처

- 일반 블로그 i18n 예제는 Next.js 공식 문서와 중복되어 구현 근거로 쓰지 않았다.
- 라이브러리 기반 번역/locale 관리 글은 이 요청의 범위가 번역이 아니어서 제외했다.

## 계획 반영 인사이트

- `language_mode`는 문서 표시 렌즈이며 `view_mode`, `work_mode`, `install_mode`, 소스코드 언어 필터와 분리한다.
- 한국어만/영어만 모드는 파일 suffix에서 이미 감지되는 `ko`, `en` 문서만 보여준다.
- 언어 미확정 문서는 단일 언어 모드에서 숨기고 전체 모드에서만 보인다.
- static snapshot UI에서는 route-level locale보다 snapshot data filter가 현재 구조에 맞다.

## 남은 불확실성

- 실제 다국어 URL routing, 번역, 계정별 locale preference는 아직 구현하지 않았다.
- public 배포에서 특정 언어 문서 자체를 제외해야 하면 selector가 아니라 collector/redaction 정책에서 처리해야 한다.
