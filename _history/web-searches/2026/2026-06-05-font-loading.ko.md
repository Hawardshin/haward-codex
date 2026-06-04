# 웹 검색 기록: Workspace Monitor 폰트 개선

- 날짜: 2026-06-05
- 요청: `폰트 개선`
- 목적: 한글 UI에 적합한 self-hosted Pretendard 적용 방식과 Next.js 전역 폰트 로딩 기준 확인

## 검색어

- `Fontsource Pretendard variable package usage official`
- `Pretendard font official GitHub web font variable Korean UI`
- `Next.js font optimization self-host local font official docs`
- `WCAG text readability line height letter spacing font family guidance`

## 확인한 출처

- Fontsource Pretendard: `https://fontsource.org/fonts/pretendard`
- Pretendard 공식 GitHub: `https://github.com/orioncactus/pretendard`
- Next.js Font Optimization 문서: `https://nextjs.org/docs/app/getting-started/fonts`
- WCAG 2.2 Text Spacing 이해 문서: `https://www.w3.org/WAI/WCAG22/Understanding/text-spacing`
- npm metadata: `npm view @fontsource/pretendard ...`, `npm view pretendard ...`

## 판단

- Fontsource는 npm metadata와 local package inspection으로 `@fontsource/pretendard@5.2.5`가 Latin subset만 제공함을 확인했다. 한글 UI 개선 목적에는 부적합해 최종 의존성에서 제외한다.
- 공식 `pretendard@1.3.9`는 variable web CSS와 dynamic subset woff2 파일을 포함하므로 한글 UI에 맞는 self-hosted 적용 대상이다.
- Next.js 전역 layout import 방식으로 app-wide CSS font-face를 로딩한다.
- WCAG text spacing 기준은 사용자 설정이 line-height 1.5까지 확장되어도 콘텐츠가 깨지지 않아야 함을 시사한다. 본문 기본값을 1.5로 맞추고 기존 role-based scale을 유지한다.

## 계획 영향

- `app/layout.tsx`에 `pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css`를 import한다.
- `globals.css` font stack은 `Pretendard Variable` 우선 순서를 유지한다.
- 회귀 테스트에서 dynamic subset CSS의 `unicode-range`와 variable weight 범위를 확인한다.
