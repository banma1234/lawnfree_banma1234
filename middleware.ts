import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * 서버컴포넌트에서 `쿼리스트링` 주고받을 수 있는 middleware
 * @param request 서버 `request`
 * @returns 서버 `response`
 */
export function middleware(request: NextRequest) {
  const postId = request.nextUrl.searchParams.get("postid") || "";
  const title = request.nextUrl.searchParams.get("title") || "";

  // `request` 헤더에 쿼리스트링 저장
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-path-postid", postId);
  requestHeaders.set("x-path-title", title);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // `response` 헤더에 쿼리스트링 저장
  response.headers.set("x-path-postid", postId);
  response.headers.set("x-path-title", title);
  return response;
}

/**
 * `/write` 페이지에서만 구동됨
 */
export const config = {
  matcher: ["/write/:path*"],
};
