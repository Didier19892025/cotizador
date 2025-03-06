"use client"

import { Drill, House, UsersRound } from "lucide-react"
import Link from "next/link"


const adminNavigation = [
  { url: '/home', text: 'Inicio', blank: false, icon: <House className="w-4 h-4" /> },
  { url: '/employees', text: 'Empleados', blank: false, icon: <UsersRound className="w-4 h-4" /> },
  { url: '/new-proyect', text: 'Servicios', blank: false, icon: <Drill className="w-4 h-4" /> },
]

export default function Navigation() {




  return (
    <>
        <nav className=" flex  gap-4">
          {adminNavigation.map(item => (
            <Link
            href={item.url}
              className={`flex items-center gap-1 hover:text-gray-300 transition-all duration-200 ease-in-out`}
              key={item.url}
            >
              {item.icon}
              {item.text}
            </Link>
          ))}
        </nav>
       

    </>
  )
}
