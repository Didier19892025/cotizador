"use client"

import { Drill, House, User, UsersRound } from "lucide-react"
import Link from "next/link"


const adminNavigation = [
  { url: '/home', text: 'Home', blank: false, icon: <House className="w-4 h-4" /> },
  { url: '/employees', text: 'Employees', blank: false, icon: <UsersRound className="w-4 h-4" /> },
  { url: '/new-proyect', text: 'Services', blank: false, icon: <Drill className="w-4 h-4" /> },
  { url: '/users', text: 'Users', blank: false, icon: <User className="w-4 h-4" /> },
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
