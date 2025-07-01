// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  // Allow access to homepage always
  if (request.nextUrl.pathname === '/') {
    return NextResponse.next();
  }

  // Allow access only if token exists
  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|favicon.svg|logo.png|$).*)',
  ],
};
