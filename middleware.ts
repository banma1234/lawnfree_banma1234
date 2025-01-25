import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const postId = request.nextUrl.searchParams.get("postid") || "";
  const title = request.nextUrl.searchParams.get("title") || "";

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-path-postid", postId);
  requestHeaders.set("x-path-title", title);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set("x-path-postid", postId);
  response.headers.set("x-path-title", title);
  return response;
}

export const config = {
  matcher: ["/write/:path*"],
};
