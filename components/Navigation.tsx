"use client"

import { Drill, House, User, UsersRound } from "lucide-react"
import Link from "next/link"
import { usePathname } from 'next/navigation'; // Importa usePathname

const adminNavigation = [
  { url: '/home', text: 'Home', blank: false, icon: <House className="w-4 h-4" /> },
  { url: '/employees', text: 'Employees', blank: false, icon: <UsersRound className="w-4 h-4" /> },
  { url: '/roles', text: 'Roles', blank: false, icon: <Drill className="w-4 h-4" /> },
  { url: '/users', text: 'Users', blank: false, icon: <User className="w-4 h-4" /> },
]

export default function Navigation() {
  const pathname = usePathname(); // Obtén la ruta actual
  
  return (
    <nav className="flex gap-2">
      {adminNavigation.map(item => {
        // Verifica si el enlace es el activo
        const isActive = pathname === item.url;
        
        return (
          <Link
            href={item.url}
            key={item.url}
            className={`flex items-center gap-1 py-1 px-2 rounded-full transition-all duration-200 ease-in-out 
              ${isActive ? 'bg-gray/20 text-gray-800' : 'hover:bg-gray/10 hover:text-gray-300'}`
            }
          >
            {item.icon}
            {item.text}
          </Link>
        );
      })}
    </nav>
  );
}
