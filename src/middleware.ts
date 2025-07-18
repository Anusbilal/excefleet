import { NextRequest, NextResponse } from 'next/server';
import { requireRole } from '@/utils/middleware/roleGuard';
import { verifyToken } from '@/utils/middleware/auth';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const publicPaths = [
    '/api/admin/sign-in',
    '/api/driver/sign-in',
    '/api/driver/verify-otp',
    '/api/employee/sign-in',
    '/api/employee/verify-otp',
  ];

  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  else if (pathname.startsWith('/api/admin')) {
    const auth = await requireRole(req, ["admin", "super_admin"]);
    if (auth instanceof NextResponse) return auth;
  } else if (pathname.startsWith('/api/employee') || pathname.startsWith('/api/driver')) {
    const tokenCheck = await verifyToken(req);
    if (tokenCheck instanceof NextResponse) return tokenCheck;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
