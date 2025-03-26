"use client"


import { zodResolver } from "@hookform/resolvers/zod";
import { countries } from '@/data/countries';


import { AtSign, CheckCircle, CopyCheck, Fingerprint, Loader, PersonStanding, Send, Smartphone, User, X } from 'lucide-react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { createEmployee, updateEmployee } from '@/actions/employeesActions';
import { EmployeeZod, EmployeeZodType } from "@/schemas/zodEmployees";
import { EmployeesType } from "@/types/employeesType";




interface FormEmployeeProps {
    onClose: () => void;
    employees?: EmployeesType;
    mode?: "created" | "edit";
    simplifiedRoles: {
        id: number;
        jobRole: string;
    }[];
}


export default function FormEmployee({ onClose, employees, simplifiedRoles, mode = "created", }: FormEmployeeProps) {

    console.log('empleado para editar', employees)

    const [isSubmitting, setIsSubmitting] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<EmployeeZodType>({
        resolver: zodResolver(EmployeeZod),
        defaultValues: {
            fullName: employees?.fullName,
            email: employees?.email,
            status: employees?.status,
            phone: employees?.phone,
            latamId: employees?.latamId,
            typeEmployee: employees?.typeEmployee,
            country: employees?.country,
            role: employees?.roleId,
        },

        mode: "onChange",
    });

    console.log('typeEmployee recibido:', employees?.typeEmployee);

    const onSubmit = async (data: EmployeeZodType) => {
        try {
            let result;
            if (mode === "created") {
                result = await createEmployee(data);
            } else {
                if (employees) {
                    result = await updateEmployee(employees.id!, data);
                }
            }

            if (result && !result.success) {
                Swal.fire({
                    title: 'Error',
                    text: result.message,
                    icon: 'error',
                    confirmButtonText: 'Okay',
                })
                return
            }
            Swal.fire({
                title: result?.message,
                text:
                    mode === "created"
                        ? `el rol ${data.fullName} ha sido creado correctamente`
                        : `el rol ${data.fullName} ha sido actualizado`,
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            })
            if (onClose) onClose();
            reset()
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: 'Error',
                text: 'An error occurred while creating the employee',
                icon: 'error',
                confirmButtonText: 'Okay',
            })

        } finally {
            setIsSubmitting(false)
        }
    }


    return (
        <>
            <main className=' bg-blue/20 backdrop-blur-sm fixed top-0 left-0 right-0 w-full flex items-center justify-center h-screen'>
                <div className=' bg-white  rounded-3xl  w-full max-w-6xl shadow-xl mx-auto  animate-palpito'>

                    {/* encabezado */}
                    <section className='flex items-center p-4 justify-between border-b border-gray/10 pb-4'>
                        <h2 className=" text-xl font-semibold">
                            {mode === "created"
                                ? "Form for Creating Employee"
                                : "Form for Editing Employee"}
                        </h2>
                        <button
                            className=' hover:text-red rounded-full hover:bg-green/10  p-1'
                            onClick={onClose}
                        >
                            <X size={24} />
                        </button>
                    </section>
                    {/* formulario */}
                    <div className='mt-4 max-h-[500px] overflow-auto'>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/*section de datos basicos*/}

                            <section className=' mb-4 p-4 pb-8'>
                                <h2 className='mb-4 font-medium'>Basic Data</h2>
                                <div className='grid grid-col-1 lg:grid-cols-3 gap-4'>
                                    <div>
                                        <label className='block mb-1'>Full Name</label>
                                        <div className="flex items-center">
                                            <div className="flex-1 flex items-center border-b border-gray/20 focus-within:border-blue-400">
                                                <User size={18} />
                                                <input
                                                 required
                                                    {...register("fullName")}
                                                    className='w-full px-4 py-2 border-none focus:outline-none bg-transparent' />
                                            </div>
                                        </div>
                                        {errors.fullName && (
                                            <p className='text-red text-xs'>{errors.fullName.message}</p>

                                        )}
                                    </div>
                                    <div>
                                        <label className='block mb-1'>Email</label>
                                        <div className="flex items-center">
                                            <div className="flex-1 flex items-center border-b border-gray/20 focus-within:border-blue-400">
                                                <AtSign size={18} />
                                                <input
                                                 required
                                                    {...register("email")}
                                                    type='email' className='w-full px-4 py-2 border-none focus:outline-none bg-transparent' />
                                            </div>
                                        </div>
                                        {errors.email && (
                                            <p className='text-red text-xs'>{errors.email.message}</p>

                                        )}
                                    </div>
                                    <div>
                                        <label className='block mb-1'>Latam ID</label>
                                        <div className="flex items-center">
                                            <div className="flex-1 flex items-center border-b border-gray/20 focus-within:border-blue-400">
                                                <Fingerprint size={18} />
                                                <input
                                                 required
                                                    {...register("latamId")}
                                                    type='number' className='w-full px-4 py-2 border-none focus:outline-none bg-transparent' />
                                            </div>
                                        </div>
                                        {errors.latamId && (
                                            <p className='text-red text-xs'>{errors.latamId.message}</p>

                                        )}
                                    </div>
                                    <div>
                                        <label className='block mb-1'>Phone</label>
                                        <div className="flex items-center">
                                            <div className="flex-1 flex items-center border-b border-gray/20 focus-within:border-blue-400">
                                                <Smartphone size={18} />
                                                <input
                                                 required
                                                    {...register("phone")}
                                                    type='number' className='w-full px-4 py-2 border-none focus:outline-none bg-transparent' />
                                            </div>
                                        </div>
                                        {errors.phone && (
                                            <p className='text-red text-xs'>{errors.phone.message}</p>

                                        )}
                                    </div>

                                    <div>
                                        <label className='block mb-1'>Status</label>
                                        <div className="flex items-center">
                                            <div className="flex-1 flex items-center border-b border-gray/20 focus-within:border-blue-400">
                                                <CopyCheck size={18} />
                                                <select
                                                    required
                                                    {...register("status")}
                                                    className='w-full px-4 py-2 border-none focus:outline-none bg-transparent'>
                                                    <option value="">select a state</option>
                                                    <option value={'true'}>Active</option>
                                                    <option value={'false'}>Inactive</option>
                                                </select>
                                            </div>
                                        </div>
                                        {errors.status && (
                                            <p className='text-red text-xs'>{errors.status.message}</p>)}
                                    </div>
                                    <div>
                                        <label className='block mb-1'>Type Employee</label>
                                        <div className="flex items-center">
                                            <div className="flex-1 flex items-center border-b border-gray/20 focus-within:border-blue-400">
                                                <PersonStanding size={18} />
                                                <select
                                                 required
                                                    {...register("typeEmployee")}
                                                    className='w-full px-4 py-2 border-none focus:outline-none bg-transparent'>
                                                    <option value="">Select Type Employee</option>
                                                    <option value="billable">Billable</option>
                                                    <option value="ovhReg">Ovh Reg</option>
                                                    <option value="sga">Sga</option>
                                                </select>

                                            </div>

                                        </div>
                                        {errors.typeEmployee && (
                                            <p className='text-red text-xs'>{errors.typeEmployee.message}</p>)}
                                    </div>
                                    <div>
                                        <label className='block mb-1'>Origin Country</label>
                                        <div className="flex items-center">
                                            <div className="flex-1 flex items-center border-b border-gray/20 focus-within:border-blue-400">
                                                <CopyCheck size={18} />
                                                <select
                                                 required
                                                    {...register("country")}
                                                    className='w-full px-4 py-2 border-none focus:outline-none bg-transparent'>
                                                    <option value="">Select a Country</option>
                                                    {countries.map((country, index) => (
                                                        <option key={index} value={country}>
                                                            {country}
                                                        </option>
                                                    ))}
                                                </select>

                                            </div>
                                        </div>
                                        {errors.country && (
                                            <p className='text-red text-xs'>{errors.country.message}</p>)}
                                    </div>

                                    <div>
                                        <label className='block mb-1'>Role</label>
                                        <div className="flex items-center">
                                            <div className="flex-1 flex items-center border-b border-gray/20 focus-within:border-blue-400">
                                                <CopyCheck size={18} />
                                                <select
                                                required
                                                    {...register("role", { valueAsNumber: true })}
                                                    className='w-full px-4 py-2 border-none focus:outline-none bg-transparent '>
                                                    <option  value="">Select a Role</option>
                                                    {simplifiedRoles.map((role) => (
                                                        <option className=" " key={role.id} value={role.id}>
                                                            {role.jobRole}
                                                        </option>
                                                    ))}
                                                </select>

                                            </div>
                                        </div>
                                        {errors.role && (
                                            <p className='text-red text-xs'>{errors.role.message}</p>)}
                                    </div>
                                </div>
                            </section>

                            {/*boton para insertar el empleado*/}
                            <div className="mt-8 flex p-4 gap-4 justify-end">

                                <button
                                    type="submit"
                                    className="w-auto rounded-3xl py-1.5 px-4 bg-blue hover:bg-blue/90 text-white focus:outline-none focus:ring-2 focus:ring-  blue-300 font-bold flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader className="animate-spin" size={18} />
                                            <span>Send...</span>
                                        </>
                                    ) : mode === "created" ? (
                                        <>
                                            <CheckCircle size={18} />
                                            <span>Created</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            <span>Updated</span>
                                        </>
                                    )}
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}
