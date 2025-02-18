"use client"

import { House, UsersRound } from "lucide-react"
import { useRouter } from "next/navigation"


const adminNavigation = [           
    {url: '/home', text: 'Inicio', blank: false, icon: <House className="w-4 h-4"/>},
    {url: '/employees', text: 'Empleados', blank: false, icon: <UsersRound className="w-4 h-4"/>},
    {url: '/new-proyect', text: 'Nuevo Proyecto', blank: false},
]

export default function Navigation() {

  const  router  = useRouter()

  const handleNavigate = (url: string, blank: boolean) => {
     if (!blank){
        router.push(url)
     }
  }
  return (
    <>
   <div className=" border-r bg-white h-screen overflow-auto transition-all duration-300 ease-in-out">
    <nav className=" flex flex-col gap-2 p-2">
        {adminNavigation.map(item => (
            <button 
            className={`flex items-center bg-gray-200 p-2 gap-2 rounded-lg hover:bg-gray-300 transition-all duration-200 ease-in-out`}
            key={item.url}
            onClick={() => handleNavigate(item.url, item.blank)}
            >
                {item.icon}
                {item.text}
            </button>
        ))}
    </nav>
   </div>

    </>
  )
}
