"use client"

import { logout } from "@/actions/logout"
import { House, LogOutIcon, UsersRound } from "lucide-react"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"


const adminNavigation = [
  { url: '/home', text: 'Inicio', blank: false, icon: <House className="w-4 h-4" /> },
  { url: '/employees', text: 'Empleados', blank: false, icon: <UsersRound className="w-4 h-4" /> },
  { url: '/new-proyect', text: 'Nuevo Proyecto', blank: false },
]

export default function Navigation() {

  const router = useRouter()

  const handleNavigate = (url: string, blank: boolean) => {
    if (!blank) {
      router.push(url)
    }
  }

  // funcion para el boton de salir
  // Función para hacer logout
// Función para hacer logout
const handleLogout = async () => {
  try {
    const confirmResult = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Estás seguro que quieres cerrar sesión!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, salir!"
    });

    if (confirmResult.isConfirmed) {
      const result = await logout();
      router.push("/");

      if (result.success) {
        await Swal.fire({
          title: "Has cerrado sesión",
          text: "Has cerrado sesión correctamente.",
          icon: "success",
          timer: 1000,
          showConfirmButton: false
        });

      } else {
        await Swal.fire({
          title: "Error",
          text: result.message || "Ocurrió un error al cerrar sesión.",
          icon: "error",
          confirmButtonText: "Aceptar"
        });
      }
    }
  } catch {
    
    await Swal.fire({
      title: "Error",
      text: "Ocurrió un error al cerrar sesión.",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  }
};


  // Menu de navegación con los items del administrador 

  // renderizado de la navegación con los items del administrador 

  // boton para salir con la funcionalidad de redirección al login 

  // retorno del componente con el menu de navegación y el boton de salir 

  // exportación del componente Navigation 

  // en la carpeta components/Navigation.tsx
  return (
    <>
      <div className=" flex justify-between flex-col border-r bg-white p-2 h-screen overflow-auto transition-all duration-300 ease-in-out">
        <nav className=" flex flex-col gap-2">
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
        {/* boton para salir */}
        <button
          onClick={handleLogout}
          className="flex w-full justify-center items-center gap-2 text-white bg-red-500 p-2 rounded-lg hover:bg-red-600 transition-all duration-300 ease-in-out">
          Salir
          <LogOutIcon size={14} />
        </button>
      </div>

    </>
  )
}
