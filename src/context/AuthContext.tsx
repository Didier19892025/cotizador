"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getCookie, setCookie } from "cookies-next"; // Asegúrate de importar 'setCookie'

// Define la estructura de los datos de usuario
interface AuthUser {
  fullNameUser: string;
  rol: string;
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
  rol: "Invitado",
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
        const rol = await getCookie("rol");

        if (fullNameUser) {
          setUser({
            fullNameUser: String(fullNameUser),
            rol: String(rol || "Invitado"),
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
    // Borra las cookies de autenticación y restablece el estado
    setCookie("fullNameUser", "", { maxAge: -1 });
    setCookie("rol", "", { maxAge: -1 });

    setUser(defaultUser);
  };

  // Actualiza el usuario en el contexto
  const updateUser = (userData: AuthUser) => {
    // Actualiza el estado de user
    setUser(userData);

    // Guarda los valores en las cookies para persistencia
    setCookie("fullNameUser", userData.fullNameUser, { maxAge: 8 * 60 * 60 }); // 8 horas
    setCookie("rol", userData.rol, { maxAge: 8 * 60 * 60 });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user.fullNameUser !== "Invitado",
        isLoading,
        setUser: updateUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
