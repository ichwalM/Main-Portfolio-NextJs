import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const maintenanceMode = process.env.MAINTENANCE_MODE === 'true';
  const { pathname } = request.nextUrl;

  // Izinkan akses ke halaman maintenance itu sendiri dan aset statis
  if (
    pathname === '/maintenance' ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // file statis seperti favicon.ico, images, dll
  ) {
    return NextResponse.next();
  }

  if (maintenanceMode) {
    // Redirect ke halaman maintenance
    return NextResponse.redirect(new URL('/maintenance', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Jalankan middleware pada semua rute kecuali yang dikecualikan di atas
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
