import { AlertTriangle, Home } from 'lucide-react';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full backdrop-blur-sm bg-white/70    shadow-xl overflow-hidden ">
        <div className="bg-gradient-to-r from-violet/90 to-  blue/80 p-8 flex flex-col items-center">
          <div className="bg-white/20 p-4    mb-4">
            <AlertTriangle size={48} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight">404</h1>
        </div>
        
        <div className="p-8 text-center bg-white">
          <h2 className="text-2xl font-bold text-gray mb-3">Página no encontrada</h2>
          <p className="text-gray mb-8 leading-relaxed">
            La página que estás buscando no existe o no tienes permisos para acceder a ella.
          </p>
          
          <div className="flex justify-center">
            <Link 
              href="/" 
              className="group relative inline-flex items-center justify-center overflow-hidden    bg-gradient-to-r from-violet to-  blue p-px font-medium text-  blue-50 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <span className="relative flex items-center gap-2    bg-white py-2.5 px-5 text-sm text-  blue-600 transition-all duration-300 group-hover:bg-transparent group-hover:text-white">
                <Home size={18} />
                <span>Regresar al inicio</span>
              </span>
            </Link>
          </div>
        </div>
        
        <div className="border-t border-gray/20 bg-white px-8 py-4 text-center">
          <div className="relative overflow-hidden    border border-gray/200 p-2 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent">
            <p className="text-sm text-gray">¿Necesitas ayuda? Contacta con soporte técnico</p>
          </div>
        </div>
      </div>
    </div>
  );
}
