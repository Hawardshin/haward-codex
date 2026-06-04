# 2026-06-05 Safe Section Location Web Search

## Trigger

- 사용자 지시: 버그 찾아서 개선.
- 목적: URL hash/query decoding 실패와 React effect 초기화 경계의 공식 기준을 확인한다.

## Queries

- `MDN decodeURIComponent URIError malformed URI sequence`
- `URLSearchParams get MDN decode percent encoding`
- `React useEffect error handling cleanup official docs`
- `Node.js test runner official docs`

## Checked Sources

- MDN URIError/decodeURIComponent examples: https://developer.mozilla.org/
- MDN URLSearchParams: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
- React `useEffect`: https://react.dev/reference/react/useEffect
- Node.js test runner: https://nodejs.org/api/test.html

## Decision Impact

- `decodeURIComponent`는 malformed percent encoding에서 `URIError`를 던질 수 있으므로 URL hash를 직접 디코딩하지 않는다.
- Query string은 `URLSearchParams`를 사용하되, hash와 같은 normalization 함수를 거치게 한다.
- React effect가 location 변경을 동기화하는 중 malformed hash 때문에 throw하지 않도록 safe decode helper를 둔다.
- Node test runner로 malformed hash 회귀 테스트를 추가한다.

## Weak Or Unused Sources

- 일반 블로그와 Stack Overflow는 공식 문서보다 신뢰도가 낮아 구현 근거로 쓰지 않았다.

## Public Summary

- Workspace Monitor section routing이 깨진 percent-encoding hash를 만나도 화면을 깨뜨리지 않게 한다.
