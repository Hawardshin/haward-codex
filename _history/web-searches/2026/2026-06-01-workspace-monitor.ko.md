# 웹 검색 기록: Workspace Monitor

## 요청 요약

- 현재 저장소를 기반으로 히스토리, Markdown 문서, 에이전트/프로젝트 상태를 보기 쉽게 시각화하는 Next.js 모니터링 사이트를 새 프로젝트로 만들고 Vercel 배포가 가능하게 한다.

## 검색어

- `Next.js App Router official docs static export Vercel deployment`
- `Vercel Next.js deployment official documentation`
- `Next.js Markdown MDX official docs App Router`
- `lucide react official documentation npm license`

## 확인한 출처

| 출처 | 유형 | 확인일 | 사용한 이유 |
| --- | --- | --- | --- |
| Next.js Static Exports, `https://nextjs.org/docs/app/guides/static-exports` | official | 2026-06-01 | `output: 'export'`와 `next build`의 정적 HTML 산출물 근거 |
| Vercel Next.js docs, `https://vercel.com/docs/frameworks/full-stack/nextjs` | official | 2026-06-01 | Vercel의 Next.js framework 지원과 배포 방식 근거 |
| Next.js MDX Guide, `https://nextjs.org/docs/app/guides/mdx` | official | 2026-06-01 | Markdown/MDX를 앱에서 다루는 공식 방향 참고 |
| lucide-react npm, `https://www.npmjs.com/package/lucide-react` | package registry | 2026-06-01 | React icon dependency와 설치/라이선스 확인 |

## 계획에 반영한 내용

- Vercel public 배포를 쉽게 하기 위해 Next.js App Router와 static export를 사용한다.
- runtime file read 대신 build 전 snapshot을 생성해 정적 UI가 JSON만 읽게 한다.
- Markdown은 완전한 MDX 실행 대신 escaped HTML preview로 변환해 private 문서 노출과 raw HTML 실행 위험을 줄인다.
- lucide-react는 UI 버튼/탭 icon 용도로만 사용한다.

## 불확실성

- Vercel monorepo root 설정에서 parent repository 접근 방식이 바뀔 수 있다. 그래서 snapshot을 commit하고 `prebuild`는 best-effort로 동작하게 한다.
- public 전환 시 snapshot에 포함되는 원천 문서 범위는 사용자가 공개 기준에 맞게 검토해야 한다.

## 공개 판단 요약

- 이 앱은 저장소 전체를 server runtime에서 읽는 앱이 아니라, 정적 snapshot을 보여주는 dashboard로 설계해야 Vercel 배포와 public 전환이 단순해진다.

