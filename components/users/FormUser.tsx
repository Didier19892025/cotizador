import Heading from "@/src/utils/Heading";
import { X } from "lucide-react";
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
                    title: 'Error',
                    text: result.message,
                    icon: 'error',
                    timer: 1500,
                    showConfirmButton: false
                });
                return;
            }

            Swal.fire({
                title: 'Success',
                text: 'User registered successfully!',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            });

            if (onClose) onClose(); // Close the form if onClose prop is passed
            reset();
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Error',
                text: 'An error occurred during registration.',
                icon: 'error',
                confirmButtonText: 'Okay',
            });
        }
    };

    return (
        <main className="bg-black/50 fixed top-0 left-0 right-0 w-full flex items-center justify-center h-screen ">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl mx-auto p-4 animate-palpito">
                <section className='flex items-center justify-between'>
                    <Heading>New User Form</Heading>

                    <button
                        className='flex items-center hover:bg-indigo/10 transition-all duration-300  text-indigo rounded-full p-2'
                        onClick={onClose}
                    >
                        <X />
                    </button>
                </section>

                {/* Form */}
                <section className="mt-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name:</label>
                                <input
                                    {...register("fullNamaUser")}
                                    className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                                />
                                {errors.fullNamaUser && (
                                    <p className="text-red text-xs">{errors.fullNamaUser.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">User Name:</label>
                                <input
                                    {...register("userName")}
                                    className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                                />
                                {errors.userName && (
                                    <p className="text-red text-xs">{errors.userName.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password:</label>
                                <input
                                    {...register("password")}
                                    type="password"
                                    className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                                />
                                {errors.password && (
                                    <p className="text-red text-xs">{errors.password.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Role:</label>
                                <select
                                    {...register("rol")}
                                    className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                                >
                                    <option value="">Select Role</option>
                                    {/* Example roles; adjust based on your enum */}
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                                {errors.rol && (
                                    <p className="text-red text-xs">{errors.rol.message}</p>
                                )}
                            </div>

                        </div>

                        <div className="mt-8">
                            <button
                                type="submit"
                                className="w-full p-3 bg-indigo/80 hover:bg-indigo/90 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-300 font-bold"
                            >
                                {isSubmitting ? 'Loading...' : 'Register'}
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    );
}
