"use client"

import React from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { LogOutIcon, User } from "lucide-react";
import Navigation from "./Navigation";
import Image from 'next/image';
import { useAuth } from "@/src/context/AuthContext";
import { logoutS } from "@/actions/logout";
import { capitalizeName } from "@/src/utils/formatName";
import { getUserInitials } from "@/src/utils/getUserInitials";

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const userInitials = getUserInitials(user.fullNameUser);


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
        await logout();
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
    <header className="w-full shadow-md bg-white">
      <nav className="max-w-screen-2xl mx-auto flex justify-between items-center px-4 py-2">
        {/* Logo and Welcome Message */}
        <div className="flex items-center gap-6">
          <Image
            src="/images/logo.png"
            alt="Logo Empresa"
            width={100}
            height={40}
          />
          
        </div>

        {/* Navigation Menu */}
        <Navigation />

        {/* User Profile and Logout */}
        <div className="relative group">
            <div className="w-10 h-10 text-blue rounded-full border border-blue flex items-center justify-center font-bold cursor-pointer">
            {userInitials}
            </div>

          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 z-50 bg-white shadow-2xl border border-gray/50 rounded-3xl   opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-48">
            <div className="p-4 border-b border-gray/10 flex items-center justify-start">
                <User size={18} className="text-blue" />
              <div className="text-xs  ml-2 mt-1 flex flex-col">
                <span className="font-medium">{capitalizeName(user.fullNameUser)}</span>
                Rol: {user.rol}
              </div>
            </div>
            <div className="p-2 ">
              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-center text-xs gap-2 text-red p-2  rounded-3xl   hover:bg-gray/10 transition-all"
              >
                <LogOutIcon size={14} />
                <span>Cerrar sesión</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}