// src/context/AuthContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getCookie } from "cookies-next";

// Define la estructura de los datos de usuario
interface AuthUser {
    fullNameUser: string;
  // Puedes agregar más propiedades según necesites
}

interface AuthContextType {
  user: AuthUser;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: AuthUser) => void;
  logout: () => Promise<void>;
}

// Valores por defecto
const defaultUser: AuthUser = {
    fullNameUser: "Invitado",
};

// Crear el contexto
const AuthContext = createContext<AuthContextType>({
  user: defaultUser,
  isAuthenticated: false,
  isLoading: true,
  setUser: () => {},
  logout: async () => {},
});

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);

// Proveedor de contexto
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser>(defaultUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const fullNameUser = await getCookie("fullNameUser");

        if (fullNameUser) {
          setUser({
            fullNameUser: String(fullNameUser),
          });
        }
      } catch (error) {
        console.error("Error al inicializar la autenticación:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Función para cerrar sesión
  const logout = async () => {
    // Puedes mantener tu lógica actual de cerrarSesion()
    // y simplemente actualizar el estado del contexto después
    setUser(defaultUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user.fullNameUser !== "Invitado",
        isLoading,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}