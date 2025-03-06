// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Obtener la cookie con el token
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;
    
    // Definimos las rutas públicas (accesibles sin token)
    const publicRoutes = ['/']; // Ruta de login es pública
    
    // Definimos las rutas protegidas (requieren token)
    const protectedRoutes = ['/home', '/employees', '/employees/new', '/admin', '/new-proyect'];
    
    // Verificar si la ruta actual es una ruta protegida o subpágina de una ruta protegida
    const isProtectedRoute = protectedRoutes.some(route => 
        pathname === route || pathname.startsWith(route + '/')
    );
    
    // Verificar si es una ruta pública
    const isPublicRoute = publicRoutes.some(route => 
        pathname === route || (route !== '/' && pathname.startsWith(route + '/'))
    );
    
    // Si no tiene token y trata de acceder a ruta protegida
    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/', request.url)); // Redirigir al login
    }
    
    // Si tiene token y está en login
    if (pathname === '/' && token) {
        return NextResponse.redirect(new URL('/home', request.url)); // Redirigir a /home si ya está logueado
    }
    
    // Para rutas que no son ni públicas ni protegidas, redirigir a notFound
    if (!isPublicRoute && !isProtectedRoute && pathname !== '/notFound') {
        return NextResponse.redirect(new URL('/notFound', request.url));
    }
    
    // Para rutas permitidas, continuar
    return NextResponse.next();
}

// Configurar qué rutas son manejadas por el middleware
export const config = {
    // Usar un matcher que incluya todas las rutas
    matcher: [
        /*
         * Match all request paths except for:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (assets)
         */
        '/((?!_next/static|_next/image|favicon.ico|images/|public/).*)',
    ],
};