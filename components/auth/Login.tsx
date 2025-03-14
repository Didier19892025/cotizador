"use client"

import { loginType, loginTypeZod } from "@/schemas/zodLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation'
// import { useState } from "react";
import Swal from "sweetalert2";
import { login } from "@/actions/login";



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
          title: 'Succesfull',
          text: result.message,
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
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h1 className="text-lg font-semibold text-center mb-6">LOGIN</h1>
        {/* Formulario de login */}
        <form  onSubmit={handleSubmit(onSubmit)}>
          <section >
            <div>
              <label className="block text-sm font-medium text-gray-700">User:</label>
              <input
                {...register("userName")}
                className="w-full p-2 border-b border-gray/50 focus:outline-none focus:border-indigo/50"
              />
            </div>
            {errors.userName && (
              <p className="text-red text-xs">{errors.userName.message}</p>
            )}
            <div>
              <label className="block mt-2 text-sm font-medium text-gray-700">Password:</label>
              <input
                {...register("password")}
                type="password"
                className="w-full p-2 border-b border-gray/50 focus:outline-none focus:border-indigo/50"
              />
            </div>
            {errors.password && (
              <p className="text-red text-xs">{errors.password.message}</p>
            )}
          </section>

          <div className=" mt-8">
            <button
              type="submit"
              className="w-full  p-3 bg-indigo text-white rounded-2xl hover:bg-indigo/90 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isSubmitting ? 'Loading...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
