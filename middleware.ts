// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// middleware.ts
export function middleware(request: NextRequest) {
    // Obtener la cookie con el token
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    // Redirigir al login si el token no está presente y la ruta comienza con /home o /employees
    if ((pathname.startsWith('/home') || pathname.startsWith('/employees')) && !token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // si intenta acceder al admin sin token
    if (pathname.startsWith('/admin') && !token) {
        return NextResponse.redirect(new URL('/', request.url)); // Redirigir al login
    }

    // si tiene token y esta en login
    if (pathname === '/' && token) {
        return NextResponse.redirect(new URL('/home', request.url)); // Redirigir a /home si ya está logueado
    }

    // Para rutas no protegidas, continuar
    return NextResponse.next();
}

// Configurar qué rutas son manejadas por el middleware
export const config = {
  matcher: ['/admin/:path*', '/login', '/home', '/employees', '/employees/new', '/new-proyect'],
};
