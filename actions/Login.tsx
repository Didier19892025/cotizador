"use client"

import { loginType, loginTypeZod } from "@/schemas/zodLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {useRouter} from 'next/navigation'
// import { useState } from "react";
import { login } from "@/server/login";
import Swal from "sweetalert2";



export default function Login() {
  const router = useRouter()
  // const [ isSubmitting, setIsSubmitting ] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<loginType>({
    resolver: zodResolver(loginTypeZod),
    mode: "onChange",
  })

  const onSubmit = async (data: loginType) => {
    // setIsSubmitting(true);
    try {
      const result = await login(data);
      if (!result.success) {
        Swal.fire({
          title: 'Error',
          text: result.message,
          icon: 'error',
          confirmButtonText: 'Okay',
        });
        return;
      }
      
      if (result.userFound?.rol === 'admin') {
        Swal.fire({
          title: 'Éxito',
          text: 'Inicio de sesión exitoso',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        })
          // Usamos replace en lugar de push para evitar que puedan volver al login con el botón atrás
         router.push('/home');
      } else {
        Swal.fire({
          title: '¡Lo sentimos!',
          text: 'El usuario no tiene permisos de administrador',
          icon: 'error',
          confirmButtonText: 'Contacta a tu jefe inmediato',
        });
      }
      reset();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error durante el inicio de sesión',
        icon: 'error',
        confirmButtonText: 'Okay',
      });
    } 
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-semibold text-center mb-6">Login</h1>
        {/* Formulario de login */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700">User:</label>
            <input
              {...register("userName")}
              className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          {errors.userName && (
            <p className="text-red-500 text-xs">{errors.userName.message}</p>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input
             {...register("password")}
              type="password"
              className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
          <div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isSubmitting ? 'Loading...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
