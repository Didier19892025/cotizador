// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Obtener la cookie con el token
    const token = request.cookies.get('token')?.value;
    const rol = request.cookies.get('rol')?.value;
    const { pathname } = request.nextUrl;
    
    // Definimos las rutas públicas (accesibles sin token)
    const publicRoutes = ['/']; // Ruta de login es pública
    
    // Definimos las rutas protegidas (requieren token)
    const protectedRoutes = ['/home', '/users', '/employees', '/roles', '/services', '/dashboard'];
    
    // Verificar si la ruta actual es una ruta protegida o subpágina de una ruta protegida
    const isProtectedRoute = protectedRoutes.some(route => 
        pathname === route || pathname.startsWith(route + '/')
    );
    
    // Verificar si es una ruta pública
    const isPublicRoute = publicRoutes.some(route => 
        pathname === route || (route !== '/' && pathname.startsWith(route + '/'))
    );
    
    // Verificar si está en el directorio dashboard
    const isDashboardRoute = pathname === '/dashboard' || pathname.startsWith('/dashboard/');
    
    // Si no tiene token y trata de acceder a ruta protegida
    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/', request.url)); // Redirigir al login
    }
    
    // Si tiene token y está en login
    if (pathname === '/' && token) {
        // Redirigir según rol
        const redirectUrl = rol === 'admin' ? '/home' : '/dashboard';
        return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
    
    // Si tiene token pero no es admin e intenta acceder a rutas protegidas que NO son dashboard
    if (token && rol !== 'admin' && isProtectedRoute && !isDashboardRoute) {
        return NextResponse.redirect(new URL('/dashboard', request.url)); // Redirigir a dashboard
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
        '/((?!_next/static|_next/image|favicon.ico|images/|public/).*)',
    ],
};