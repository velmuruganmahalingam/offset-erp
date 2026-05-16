import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;

  const isAuthRoute = pathname === '/login' || pathname === '/register';
  const isDashboardRoute = pathname.startsWith('/dashboard');

  // Not logged in → trying to access protected route
  if (!token && isDashboardRoute) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirectTo', pathname); // 👈 preserve intended destination
    return NextResponse.redirect(loginUrl);
  }

  // Logged in → trying to access auth pages
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Add cache control headers to prevent stale auth state on back/forward
  const response = NextResponse.next();

  if (isDashboardRoute) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    return response
  }

  return response;
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register',
  ],
};