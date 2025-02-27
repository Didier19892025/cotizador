"use client"

import { EmployeeUpdateZod, EmployeeUpdateZodType } from '@/schemas/zod.employees'
import { zodResolver } from "@hookform/resolvers/zod";
import { countries } from '@/data/countries';
import { currencies } from '@/data/currencies';
// import { useRouter } from 'next/navigation';
import { AtSign, Brain, CircleDollarSign, Coins, CopyCheck, Fingerprint, LandPlot, MapPinHouse, PersonStanding, User } from 'lucide-react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { EmployeesType } from '@/types/employees.type';
import { updateEmployee } from '@/server/employees';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
interface FormEditEmployeeProps {
    employee: EmployeesType;
}

export default function FormEditEmployee({ employee }: FormEditEmployeeProps) {
    console.log('empleado por id', employee.id);

    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EmployeeUpdateZodType>({
        resolver: zodResolver(EmployeeUpdateZod),
        mode: "onSubmit",
        defaultValues: {
            fullName: employee.fullName,
            email: employee.email,
            latamId: employee.latamId,
            status: employee.status,
            typeEmployee: employee.typeEmployee,
            jobRole: employee.role.jobRole,
            area: employee.role.area,
            costCenter: employee.role.cc,
            cphCode: employee.role.cphCode,
            cph: typeof employee.role.cph === 'string' ? parseFloat(employee.role.cph) : employee.role.cph,
            country: employee.role.country,
            typeCurrency: employee.role.currency,
        }

    });

    const onSubmit = async (data: EmployeeUpdateZodType) => {
        console.log('empleado enviado para editar', data)
        setIsSubmitting(true)
        try {
            const result = await updateEmployee(employee.id, data)

            if (!result.success) {
                console.log('error', result.message)
                Swal.fire({
                    title: 'Error',
                    text: result.message,
                    icon: 'error',
                    confirmButtonText: 'Okay',
                })
                return;
            }
            Swal.fire({
                title: 'Success',
                text: result.message,
                icon: 'success',
                confirmButtonText: 'Okay',
            })
            router.push('/employees')

        } catch (error) {
            console.log('error', error);
        } finally {
            setIsSubmitting(false);
        }
    }



    return (
        <div className=' rounded-lg mt-4 p-4 overflow-auto max-h-[500px]'>
            <h1 className='text-2xl font-semibold mb-4'>Fomr Edit Employee</h1>
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
                                            disabled
                                            {...register("latamId", { valueAsNumber: true })}
                                            type='text'
                                            className=' cursor-no-drop disabled:opacity-50 w-full px-4 py-2 border-none focus:outline-none bg-transparent' />
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
                                        <LandPlot size={18} color='blue' />
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
                                        <MapPinHouse size={18} color='blue' />
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
                                        <Brain size={18} color='blue' />
                                        <input
                                            type='text'
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
                                        <CircleDollarSign size={18} color='blue' />
                                        <input
                                            {...register("cph", { valueAsNumber: true })}
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
                                            {countries.map((country, index) => (
                                                <option key={index} value={country}>
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
                                        <Coins size={18} color='blue' />
                                        <select
                                            {...register("typeCurrency")}
                                            className='w-full px-4 py-2 border-none focus:outline-none bg-transparent'>
                                            <option value="">Select a TypeCurrency</option>
                                            {currencies.map((currency, index) => (
                                                <option key={index} value={currency}>
                                                    {currency}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                {errors.typeCurrency && (
                                    <p className='text-red-500 text-xs'>{errors.typeCurrency.message}</p>)}
                            </div>

                        </div>
                    </section>

                    {/*boton para insertar el empleado*/}
                    <div className='flex justify-end'>
                        <button type='submit' className='px-4 py-2 bg-blue-400 text-white font-medium rounded-lg'>
                            {isSubmitting ? 'Loading...' : 'Edit Employee'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}