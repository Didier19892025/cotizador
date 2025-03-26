"use client";

import { useAuth } from "@/src/context/AuthContext";
import { FileText, House, User, Users, UsersRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Importa usePathname

// Enlaces para administradores
const adminNavigation = [
  { url: "/home", text: "Home", icon: <House className="w-4 h-4 " /> },
  { url: "/employees", text: "Employees", icon: <Users className="w-4 h-4" /> },
  { url: "/roles", text: "Roles", icon: <UsersRound className="w-4 h-4" /> },
  { url: "/users", text: "Users", icon: <User className="w-4 h-4" /> },
];

// Enlaces para usuarios normales
const userNavigation = [
  { url: "/services", text: "Services", icon: <UsersRound className="w-4 h-4" /> },
];

export default function Navigation() {
  const { user } = useAuth(); // Obtiene el usuario del contexto de autenticación
  const pathname = usePathname(); // Obtiene la ruta actual

  return (
    <nav className="flex gap-2">
      {/* Solo los usuarios con rol admin ven los enlaces adicionales */}
      {user?.rol === "admin" && (
        <>
          {/* Enlaces de navegación para admin */}
          {adminNavigation.map((nav) => (
            <Link
              href={nav.url}
              key={nav.url}
              className={`flex items-center gap-1 py-1 px-2 rounded-3xl transition-all duration-200 ease-in-out ${
                pathname === nav.url ? "bg-gray/20" : "hover:bg-gray/10 "
              }`}
            >
              {nav.icon}
              {nav.text}
            </Link>
          ))}

          {/* Enlace "New Project" que es visible para todos los usuarios */}
          <Link
            href="/dashboard/new-project"
            key="/dashboard/new-project"
            className={`flex items-center gap-1 py-1 px-2 rounded-3xl border border-gray/10 transition-all duration-200 ease-in-out ${
              pathname === "/dashboard/project" ? "bg-gray/20" : "hover:bg-gray/10"
            }`}
          >
            <FileText className="w-4 h-4" />
            New Project
          </Link>

          {/* "More" Button to Show Other Links */}
          <div className="relative group">
            <button className="flex items-center gap-1 py-1 px-2 rounded-3xl border border-gray/10 hover:bg-gray/10">
              More
            </button>

            {/* Dropdown with Other Links */}
            <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-3xl border border-gray/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 p-2">
              {userNavigation.map((item) => (
                <Link
                  href={item.url}
                  key={item.url}
                  className="w-36 hover:bg-gray/10 flex items-center gap-1 py-1 px-2 rounded-3xl transition-all duration-200 ease-in-out"
                >
                  {item.icon}
                  {item.text}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Solo usuarios con rol 'user' ven este enlace */}
      {user?.rol === "user" && (
        <>
          {/* Enlace "New Project" para usuarios con rol "user" */}
          <Link
            href="/dashboard/new-project"
            key="/dashboard/new-project"
            className={`flex items-center gap-1 py-1 px-2 rounded-3xl border border-gray/10 transition-all duration-200 ease-in-out ${
              pathname === "/dashboard/new-project" ? "bg-gray/20" : "hover:bg-gray/10"
            }`}
          >
            <FileText className="w-4 h-4" />
            New Project
          </Link>
        </>
      )}
    </nav>
  );
}
