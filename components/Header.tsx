"use client"


import React from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { LogOutIcon } from "lucide-react";
import Navigation from "./Navigation";
import Image from 'next/image';
import { useAuth } from "@/src/context/AuthContext";
import { logoutS } from "@/actions/logout";
import { capitalizeName } from "@/src/utils/formatName";

export default function Header() {
  const router = useRouter();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      const confirmResult = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¡Estás seguro que quieres cerrar sesión!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, salir!",
      });

      if (confirmResult.isConfirmed) {
        const result = await logoutS();
        router.push("/");

        if (result.success) {

          await Swal.fire({
            title: "Has cerrado sesión",
            text: "Has cerrado sesión correctamente.",
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
          });
        } else {
          await Swal.fire({
            title: "Error",
            text: result.message || "Ocurrió un error al cerrar sesión.",
            icon: "error",
            confirmButtonText: "Aceptar",
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
  return (
    <div className="w-full  shadow-md bg-white flex items-center">
      <nav className="w-full flex justify-between items-center px-4 py-2">
        {/* Logo con imagen de la empresa */}
        <div className="flex items-center gap-6">
          <Image
            src="/images/logo.png" // Ruta de la imagen dentro de la carpeta "images"
            alt="Logo Empresa"
            width={100}  // Ajusta el ancho del logo según lo necesites
            height={40}  // Ajusta la altura del logo según lo necesites
          />

          <div className="flex items-end  gap-1">
            <p className="text-md">Welcome(@) </p>
              <span className="font-bold text-xs text-gray/80">{capitalizeName(user.fullNameUser)}</span>
          
          </div>
        </div>




        {/* Navegación */}
        <div>
          <Navigation />
        </div>

        {/* Botón de logout */}
        <button
          onClick={handleLogout}
          className="flex w-auto justify-center items-center gap-2 text-white bg-red py-2 px-6 rounded-2xl hover:bg-red/90 transition-all duration-300 ease-in-out"
        >
          Exit
          <LogOutIcon size={12} />
        </button>
      </nav>
    </div>
  );
}
