import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(
  request: NextRequest
) {
  const token =
    request.cookies.get('token');

  const pathname =
    request.nextUrl.pathname;

  // not logged in
  if (
    !token &&
    pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(
      new URL('/login', request.url)
    );
  }

  // already logged in
  if (
    token &&
    pathname === '/login'
  ) {
    return NextResponse.redirect(
      new URL('/dashboard', request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
  ],
};