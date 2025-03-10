import Heading from "@/src/utils/Heading";
import { KeyRound, PersonStanding, User, UserCog, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, UserSchemaType } from "@/schemas/zodUser"; // Assuming your schema is in this path
import Swal from "sweetalert2";
import { createUser } from "@/server/usersActions";

interface FormUserProps {
  onClose?: () => void;
}

export default function FormUser({ onClose }: FormUserProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserSchemaType>({
    resolver: zodResolver(UserSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: UserSchemaType) => {
    try {
      const result = await createUser(data);
      if (!result.success) {
        Swal.fire({
          title: "Error",
          text: result.message,
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
        return;
      }

      Swal.fire({
        title: "Success",
        text: "User registered successfully!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      if (onClose) onClose(); // Close the form if onClose prop is passed
      reset();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "An error occurred during registration.",
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  };

  return (
    <main className="bg-black/50 fixed top-0 left-0 right-0 w-full flex items-center justify-center h-screen ">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl mx-auto p-4 animate-palpito">
        <section className="flex items-center justify-between">
          <Heading>New User Form</Heading>

          <button
            className="flex items-center hover:bg-indigo/10 transition-all duration-300  text-indigo rounded-full p-2"
            onClick={onClose}
          >
            <X />
          </button>
        </section>

        {/* Form */}
        <section className="mt-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="FullName"
                  className="block text-sm font-medium text-negro"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} color="gray" />
                  </div>
                  <input
                    required
                    id="fullName"
                    placeholder="Ej: Nelson Hernandez"
                    {...register("fullNameUser")}
                    className="w-full pl-10 p-3 bg-transparent border-b border-negro/10 focus:border-verde focus:outline-none"
                  />
                </div>
                {errors.fullNameUser && (
                  <p className="text-naranja text-sm">
                    {errors.fullNameUser.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="UserName"
                  className="block text-sm font-medium text-negro"
                >
                    User Name 
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserCog size={18} color="gray" />
                  </div>
                  <input
                    required
                    id="userName"
                    placeholder="Ej: Nelson21"
                    {...register("userName")}
                    className="w-full pl-10 p-3 bg-transparent border-b border-negro/10 focus:border-verde focus:outline-none"
                  />
                </div>
                {errors.userName && (
                  <p className="text-naranja text-sm">
                    {errors.userName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-negro"
                >
                    Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound size={18} color="gray" />
                  </div>
                  <input
                    required
                    id="password"
                    placeholder="Enter your password"
                    {...register("password")}
                    className="w-full pl-10 p-3 bg-transparent border-b border-negro/10 focus:border-verde focus:outline-none"
                  />
                </div>
                {errors.password && (
                  <p className="text-naranja text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="Role"
                  className="block text-sm font-medium text-negro"
                >
                    Role:
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <PersonStanding size={18} color="gray" />
                  </div>
                  <input
                    required
                    id="rol"
                    placeholder="Selec a Rol"
                    {...register("rol")}
                    className="w-full pl-10 p-3 bg-transparent border-b border-negro/10 focus:border-verde focus:outline-none"
                  />
                </div>
                {errors.rol && (
                  <p className="text-naranja text-sm">
                    {errors.rol.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full p-3 bg-indigo/80 hover:bg-indigo/90 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-300 font-bold"
              >
                {isSubmitting ? "Loading..." : "Register"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
