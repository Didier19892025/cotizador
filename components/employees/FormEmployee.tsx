"use client"


import { zodResolver } from "@hookform/resolvers/zod";
import { countries } from '@/data/countries';


import { AtSign,  CopyCheck, Fingerprint, PersonStanding, Smartphone, User, X } from 'lucide-react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { createEmployee } from '@/actions/employeesActions';
import { EmployeeZod, EmployeeZodType } from "@/schemas/zodEmployees";



interface FormCreateEmployeeProps {
    onClose: () => void
}


export default function FormCreateEmployee({ onClose }: FormCreateEmployeeProps) {


    const [isSubmitting, setIsSubmitting] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<EmployeeZodType>({
        resolver: zodResolver(EmployeeZod),
        mode: "onSubmit",
    });


    const onSubmit = async (data: EmployeeZodType) => {
        console.log('informacion enviada al server',data);
        setIsSubmitting(true)
        try {

            const result = await createEmployee(data)
            if (!result.success) {
                Swal.fire({
                    title: 'Error',
                    text: result.message,
                    icon: 'error',
                    confirmButtonText: 'Okay',
                })
                return
            }
            Swal.fire({
                title: 'Success',
                text: 'Employee created successfully',
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            })
            onClose()
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
            <main className=' bg-black/50 fixed top-0 left-0 right-0 w-full flex items-center justify-center h-screen'>
                <div className=' bg-white rounded-2xl w-full max-w-6xl shadow-xl mx-auto  animate-palpito'>

                    {/* encabezado */}
                    <section className='flex items-center p-4 justify-between border-b border-gray/10 pb-4'>
                        <h2 className='text-lg font-bold'>Create Employee</h2>
                        <button
                            className=' hover:text-red/50 hover:bg-indigo/10 rounded-full p-1'
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
                                                <User size={18}/>
                                                <input
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
                                                <AtSign size={18}   />
                                                <input
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
                                                <Fingerprint size={18}   />
                                                <input
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
                                                <Smartphone size={18}   />
                                                <input
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
                                                <CopyCheck size={18}   />
                                                <select
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
                                                <PersonStanding size={18}   />
                                                <select
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
                                                <CopyCheck size={18}   />
                                                <select
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
                                </div>
                            </section>

                            {/*boton para insertar el empleado*/}
                            <div className='flex justify-end py-6 px-4 gap-2'>
                                <button 
                                 onClick={onClose}
                                type='button' className='px-4 py-2 border border-red text-red hover:bg-red/10 font-medium rounded-lg'>
                                    Cancel
                                </button>
                                <button type='submit' className='px-4 py-2 bg-indigo/70 hover:bg-indigo/90 text-white font-medium rounded-lg'>
                                    {isSubmitting ? 'Loading...' : 'Create Employee'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}
