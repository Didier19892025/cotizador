"use client"

import { loginType, loginTypeZod } from "@/schemas/zodLogin";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { login } from "@/actions/login";
import { useAuth } from "@/src/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { User, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm<loginType>({
    resolver: zodResolver(loginTypeZod),
    mode: "onChange",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: loginType) => {
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

      const { userFound } = result;

      if (!userFound) {
        Swal.fire({
          title: 'Error',
          text: 'User information is missing',
          icon: 'error',
          confirmButtonText: 'Okay',
        });
        return;
      }

      // Update user context
      setUser({
        fullNameUser: userFound.fullNameUser,
        rol: userFound.rol,
      });

      // Show success message
      Swal.fire({
        title: 'Successful',
        text: result.message,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });

      // Redirect based on role using switch
      switch (userFound.rol) {
        case 'admin':
          router.push('/home');
          break;
        case 'user':
          router.push('/dashboard');
          break;
        default:
          router.push('/dashboard');
          break;
      }

      reset(); // Reset form after successful login
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error',
        text: 'An error occurred during login',
        icon: 'error',
        confirmButtonText: 'Okay',
      });
    }
  };

  // Watch input values for floating label animation
  const userName = watch('userName');
  const password = watch('password');

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-8 text-blue">LOGIN</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section>
            <div className="relative mb-6">
              <div className="relative">
                <input
                  {...register("userName")}
                  className="w-full p-4 pl-10 border border-gray/10 rounded-3xl focus:outline-none focus:ring-1 focus:ring-blue focus:border-transparent peer"
                  id="userName"
                  placeholder=" "
                />
                <User className="absolute left-3 top-4 text-blue" size={18} />
                <label 
                  className={`absolute left-10 transition-all duration-300 ${
                    userName ? 'text-xs text-blue -top-2.5  px-1' : 'text-gray/60 top-4'
                  } peer-focus:text-xs peer-focus:text-blue peer-focus:-top-2.5 peer-focus:bg-white peer-focus:px-1`}
                  htmlFor="userName"
                >
                  Username
                </label>
              </div>
              {errors.userName && <p className="text-red text-xs mt-1">{errors.userName.message}</p>}
            </div>

            <div className="relative mb-6">
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  className="w-full p-4 pl-10 pr-10 rounded-3xl border border-gray/10  focus:outline-none focus:ring-1 focus:ring-blue focus:border-transparent peer"
                  id="password"
                  placeholder=""
                />
                <Lock className="absolute left-3 top-4 text-blue" size={18} />
                <button 
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-4 text-blue hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                <label 
                  className={`absolute left-10 transition-all duration-300 ${
                    password ? 'text-xs text-blue-600 -top-2.5  px-1' : 'text-gray/60 top-4'
                  } peer-focus:text-xs peer-focus:text-blue peer-focus:-top-2.5 peer-focus:bg-white peer-focus:px-1`}
                  htmlFor="password"
                >
                  Password
                </label>
              </div>
              {errors.password && <p className="text-red text-xs mt-1">{errors.password.message}</p>}
            </div>
          </section>

          <div className="mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full p-3 bg-blue text-white hover:bg-blue/80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-70"
            >
              {isSubmitting ? 'Loading...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}