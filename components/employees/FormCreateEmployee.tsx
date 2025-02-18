"use client"

import { EmployeeCreateZod, EmployeeCreateZodType } from '@/schemas/zod.employees'

import { zodResolver } from "@hookform/resolvers/zod";

import { AtSign, CopyCheck, Fingerprint, PersonStanding, User } from 'lucide-react'
import { useForm } from 'react-hook-form';



enum Country {
    Colombia = "Colombia",
    Peru = "Peru",
    Chile = "Chile",
    Mexico = "Mexico",
    Argentina = "Argentina",
    Uruguay = "Uruguay",
    Panama = "Panama",
    United_States = "United States",
    Bolivia = "Bolivia",
    Brasil = "Brasil",
    Ecuador = "Ecuador",
    Guatemala = "Guatemala",
    Honduras = "Honduras",
    Nicaragua = "Nicaragua",
    Puerto_Rico = "Puerto Rico",
    Saint_Lucia = "Saint Lucia",
    Venezuela = "Venezuela",
}

export default function FormCreateEmployee() {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<EmployeeCreateZodType>({
        resolver: zodResolver(EmployeeCreateZod),
        mode: "onChange",
    });
    const onSubmit = (data: EmployeeCreateZodType) => {
        console.log('data listos para enviar al server', data)
        reset()
    }


    return (
        <div className=' rounded-lg mt-4 p-4 overflow-auto max-h-[500px]'>
            <div className=' '>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/*section de datos basicos*/}

                    <section className=' p-4 border-b mb-4 bg-white shadow-md rounded-lg'>
                        <h2 className='mb-4 font-medium'>Basic Data</h2>
                        <div className='grid grid-col-1 lg:grid-cols-3 gap-4'>
                            <div>
                                <label className='block mb-1'>Full Name</label>
                                <div className="flex items-center">
                                    <div className="flex-1 flex items-center border-b border-gray-300 focus-within:border-blue-400">
                                        <User size={18} color='blue' />
                                        <input
                                            {...register("fullName")}
                                            className='w-full px-4 py-2 border-none focus:outline-none bg-transparent' />
                                    </div>
                                </div>
                                {errors.fullName && (
                                    <p className='text-red-500 text-xs'>{errors.fullName.message}</p>

                                )}
                            </div>
                            <div>
                                <label className='block mb-1'>Email</label>
                                <div className="flex items-center">
                                    <div className="flex-1 flex items-center border-b border-gray-300 focus-within:border-blue-400">
                                        <AtSign size={18} color='blue' />
                                        <input
                                            {...register("email")}
                                            type='email' className='w-full px-4 py-2 border-none focus:outline-none bg-transparent' />
                                    </div>
                                </div>
                                {errors.email && (
                                    <p className='text-red-500 text-xs'>{errors.email.message}</p>

                                )}
                            </div>
                            <div>
                                <label className='block mb-1'>Latam ID</label>
                                <div className="flex items-center">
                                    <div className="flex-1 flex items-center border-b border-gray-300 focus-within:border-blue-400">
                                        <Fingerprint size={18} color='blue' />
                                        <input
                                            {...register("latamId")}
                                            type='number' className='w-full px-4 py-2 border-none focus:outline-none bg-transparent' />
                                    </div>
                                </div>
                                {errors.latamId && (
                                    <p className='text-red-500 text-xs'>{errors.latamId.message}</p>

                                )}
                            </div>
                            <div>
                                <label className='block mb-1'>Status</label>
                                <div className="flex items-center">
                                    <div className="flex-1 flex items-center border-b border-gray-300 focus-within:border-blue-400">
                                        <CopyCheck size={18} color='blue' />
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
                                    <p className='text-red-500 text-xs'>{errors.status.message}</p>)}
                            </div>
                            <div>
                                <label className='block mb-1'>Type Employee</label>
                                <div className="flex items-center">
                                    <div className="flex-1 flex items-center border-b border-gray-300 focus-within:border-blue-400">
                                        <PersonStanding size={18} color='blue' />
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
                                    <p className='text-red-500 text-xs'>{errors.typeEmployee.message}</p>)}
                            </div>
                        </div>
                    </section>

                    {/*section de roles*/}
                    <section className=' p-4 border-b mb-4 bg-white shadow-md rounded-lg'>
                        <h2 className='mb-4 font-medium'>Roles Data</h2>
                        <div className='grid grid-col-1 lg:grid-cols-3 gap-4'>
                            <div>
                                <label className='block mb-1'>Job Role</label>
                                <div className="flex items-center">
                                    <div className="flex-1 flex items-center border-b border-gray-300 focus-within:border-blue-400">
                                        <User size={18} color='blue' />
                                        <input
                                            {...register("jobRole")}
                                            className='w-full px-4 py-2 border-none focus:outline-none bg-transparent' />
                                    </div>
                                </div>
                                {errors.jobRole && (
                                    <p className='text-red-500 text-xs'>{errors.jobRole.message}</p>)}

                            </div>
                            <div>
                                <label className='block mb-1'>Area</label>
                                <div className="flex items-center">
                                    <div className="flex-1 flex items-center border-b border-gray-300 focus-within:border-blue-400">
                                        <AtSign size={18} color='blue' />
                                        <input
                                            {...register("area")}
                                            className='w-full px-4 py-2 border-none focus:outline-none bg-transparent' />
                                    </div>
                                </div>
                                {errors.area && (
                                    <p className='text-red-500 text-xs'>{errors.area.message}</p>)}
                            </div>
                            <div>
                                <label className='block mb-1'>Cost Center</label>
                                <div className="flex items-center">
                                    <div className="flex-1 flex items-center border-b border-gray-300 focus-within:border-blue-400">
                                        <Fingerprint size={18} color='blue' />
                                        <input
                                            {...register("costCenter")}
                                            className='w-full px-4 py-2 border-none focus:outline-none bg-transparent' />
                                    </div>
                                </div>
                                {errors.costCenter && (
                                    <p className='text-red-500 text-xs'>{errors.costCenter.message}</p>)}
                            </div>
                            <div>
                                <label className='block mb-1'>CPh Code</label>
                                <div className="flex items-center">
                                    <div className="flex-1 flex items-center border-b border-gray-300 focus-within:border-blue-400">
                                        <Fingerprint size={18} color='blue' />
                                        <input
                                            {...register("cphCode")}
                                            className='w-full px-4 py-2 border-none focus:outline-none bg-transparent' />
                                    </div>
                                </div>
                                {errors.cphCode && (
                                    <p className='text-red-500 text-xs'>{errors.cphCode.message}</p>)}
                            </div>
                            <div>
                                <label className='block mb-1'>CPh </label>
                                <div className="flex items-center">
                                    <div className="flex-1 flex items-center border-b border-gray-300 focus-within:border-blue-400">
                                        <Fingerprint size={18} color='blue' />
                                        <input
                                            {...register("cph")}
                                            type='number' className='w-full px-4 py-2 border-none focus:outline-none bg-transparent' />
                                    </div>
                                </div>
                                {errors.cph && (
                                    <p className='text-red-500 text-xs'>{errors.cph.message}</p>)}
                            </div>
                            <div>
                                <label className='block mb-1'>Origin Country</label>
                                <div className="flex items-center">
                                    <div className="flex-1 flex items-center border-b border-gray-300 focus-within:border-blue-400">
                                        <CopyCheck size={18} color='blue' />
                                        <select
                                            {...register("country")}
                                            className='w-full px-4 py-2 border-none focus:outline-none bg-transparent'>
                                            <option value="">Select a Country</option>
                                            {Object.values(Country).map((country) => (
                                                <option key={country} value={country}>
                                                    {country}
                                                </option>
                                            ))}
                                        </select>

                                    </div>
                                </div>
                                {errors.country && (
                                    <p className='text-red-500 text-xs'>{errors.country.message}</p>)}
                            </div>
                            <div>
                                <label className='block mb-1'>Type Currency </label>
                                <div className="flex items-center">
                                    <div className="flex-1 flex items-center border-b border-gray-300 focus-within:border-blue-400">
                                        <Fingerprint size={18} color='blue' />
                                        <input
                                            {...register("typeCurrency")}
                                            className='w-full px-4 py-2 border-none focus:outline-none bg-transparent' />
                                    </div>
                                </div>
                                {errors.typeCurrency && (
                                    <p className='text-red-500 text-xs'>{errors.typeCurrency.message}</p>)}
                            </div>

                        </div>
                    </section>

                    {/*section de usuarios*/}

                    <section className='p-4 border-b mb-4 bg-white shadow-md rounded-lg'>
                        <h2 className='mb-4 font-medium'>Date Users</h2>
                        <div className='grid grid-col-1 lg:grid-cols-3 gap-4'>
                            <div>
                                <label className='block mb-1'>User Name</label>
                                <div className="flex items-center">
                                    <div className="flex-1 flex items-center border-b border-gray-300 focus-within:border-blue-400">
                                        <User size={18} color='blue' />
                                        <input
                                            {...register("userName")}
                                            className='w-full px-4 py-2 border-none focus:outline-none bg-transparent' />
                                    </div>
                                </div>
                                {errors.userName && (
                                    <p className='text-red-500 text-xs'>{errors.userName.message}</p>)}
                            </div>
                            <div>
                                <label className='block mb-1'>Password</label>
                                <div className="flex items-center">
                                    <div className="flex-1 flex items-center border-b border-gray-300 focus-within:border-blue-400">
                                        <AtSign size={18} color='blue' />
                                        <input
                                            {...register("password")}
                                            type='password' className='w-full px-4 py-2 border-none focus:outline-none bg-transparent' />
                                    </div>
                                </div>
                                {errors.password && (
                                    <p className='text-red-500 text-xs'>{errors.password.message}</p>)}
                            </div>
                            <div>
                                <label className='block mb-1'>Role</label>
                                <div className="flex items-center">
                                    <div className="flex-1 flex items-center border-b border-gray-300 focus-within:border-blue-400">
                                        <CopyCheck size={18} color='blue' />
                                        <select
                                            {...register("role")}
                                            className='w-full px-4 py-2 border-none focus:outline-none bg-transparent'>
                                            <option value="">select a Role</option>
                                            <option value="admin">Admin</option>
                                            <option value="user">User</option>
                                        </select>

                                    </div>
                                </div>
                                    {errors.role && (
                                        <p className='text-red-500 text-xs'>{errors.role.message}</p>)}
                            </div>
                        </div>
                    </section>

                    {/*boton para insertar el empleado*/}
                    <div className='flex justify-end'>
                        <button type='submit' className='px-4 py-2 bg-blue-400 text-white font-medium rounded-lg'>Insert Employee</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
