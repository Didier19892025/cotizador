"use client"

import { createUser } from "@/server/createUser";
import { User, UserSchema } from "@/src/zod/user_zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import Swal from "sweetalert2";




export default function Home() {

  const { register, handleSubmit, formState: { errors,  }, reset } = useForm<User>({
    resolver: zodResolver(UserSchema),  // Usamos Zod como el validador
  });

  // Función que se ejecuta cuando el formulario es enviado correctamente

  const onSubmit = async (data: User) => {
    console.log('Data for send to server', data);
    try {
      // Llamada al servidor para crear el usuario
      const result = await createUser(data);

      // Verificamos si la creación del usuario fue exitosa
      if (!result.success) {
        // Si falla, mostramos un alerta de error con SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: result.message || 'Hubo un problema al crear el usuario.',
          confirmButtonText: 'Aceptar',
        });
      } else {
        // Si tiene éxito, mostramos una alerta de éxito
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Usuario creado correctamente.',
          confirmButtonText: 'Genial',
        });
        reset()
      }
    } catch (error) {
      console.error('Error:', error);
      // En caso de error inesperado, mostramos una alerta de error general
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error al procesar tu solicitud.',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col">

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className=" bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Registrar usuarios</h1>
        <p className=" text-gray-600 mb-2 text-xs">Completa todos los campos *</p>

        {/* name */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name <span className="text-red-700">*</span></label>
            <input
              className={`mt-1 block w-full px-3 py-2 text-sm text-gray-700 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              type="text"
              {...register('name')}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email address <span className="text-red-700">*</span></label>
            <input
              className={`mt-1 block w-full px-3 py-2 text-sm text-gray-700 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              type="email"
              {...register('email')}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Username <span className="text-red-700">*</span></label>
            <input
              className={`mt-1 block w-full px-3 py-2 text-sm text-gray-700 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.userName ? 'border-red-500' : 'border-gray-300'}`}
              type="text"
              {...register('userName')}
            />
            {errors.userName && <p className="text-sm text-red-500">{errors.userName.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password <span className="text-red-700">*</span></label>
            <input
              className={`mt-1 block w-full px-3 py-2 text-sm text-gray-700 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              type="password"
              {...register('password')}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Role <span className="text-red-700">*</span></label>
            <select
              className={`mt-1 block w-full px-3 py-2 text-sm text-gray-700 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.role ? 'border-red-500' : 'border-gray-300'}`}
              {...register('role')}
            >
              <option value="" disabled>Elige un Rol</option>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
            {errors.role && <p className="text-sm text-red-500">{errors.role.message}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          Sign in
        </button>
      </form>
      
    </div>
  );
}
