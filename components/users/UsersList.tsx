"use client"

import React, { useState } from 'react'
import { Plus, Trash2, UserPen } from 'lucide-react'
import NoRecords from '@/src/ui/NoRecords'
import Heading from '@/src/ui/Heading'
import { UserType } from '@/types/userType'
import FormUser from './FormUser'
import Swal from 'sweetalert2'
import { deleteUser } from '@/actions/usersActions'

interface UsersListProps {
    users: UserType[]
}

export default function UsersList({ users }: UsersListProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOpenModal = () => setIsModalOpen(true)
    const handleCloseModal = () => setIsModalOpen(false)


    const handleDeleteUser = async (userId: number) => {
        // Mostrar el modal de confirmación
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Llamar a la función para eliminar el usuario
                const response = await deleteUser(userId);
                if (response.success) {
                    Swal.fire({
                        title: 'Deleted!',
                        text: response.message,
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500


                    });
                    // Aquí puedes agregar la lógica para actualizar la lista de usuarios si es necesario
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: response.message,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }
        });
    };
    

    return (
        <>
            <main className=''>
                {/* Header section */}
                <section className='flex items-center justify-between'>
                    <Heading>Users List</Heading>

                    <button
                        className='flex items-center bg-indigo/70 hover:bg-indigo/80 transition-all duration-300 ease-out text-white rounded-2xl py-2 px-4'
                        onClick={handleOpenModal}
                    >
                        <Plus />
                        New User
                    </button>
                </section>

                {/* Users list section */}
                <section className='mt-4'>
                    {users.length > 0 ? (
                        <div className="overflow-hidden   border-gray/20">
                            <table className='w-full'>
                                <thead className='bg-gray/20 rounded-2xl'>
                                    <tr className="rounded-2xl">
                                        <th className='w-1/12 px-4 py-2 text-left text-sm font-semibold text-gray-700 rounded-tl-2xl rounded-bl-2xl'><strong>#</strong></th>
                                        <th className='w-1/6 px-4 py-2 text-left text-sm font-semibold text-gray-700'>Full Name</th>
                                        <th className='w-1/6 px-4 py-2 text-left text-sm font-semibold text-gray-700'>Username</th>
                                        <th className='w-1/6 px-4 py-2 text-left text-sm font-semibold text-gray-700'>Role</th>
                                        <th className='w-1/6 px-4 py-2 text-right ml-4 text-sm font-semibold text-gray-700 rounded-tr-2xl rounded-br-2xl'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <tr key={user.id} className='border-b last:border-none border-gray/20'>
                                            <td className='px-4 py-2 text-left text-sm font-semibold text-gray-700'>{index + 1}</td>
                                            <td className='px-4 py-2 text-left text-sm font-semibold text-gray-700'>{user.fullNameUser}</td>
                                            <td className='px-4 py-2 text-left text-sm font-semibold text-gray-700'>{user.userName}</td>
                                            <td className='px-4 py-2 text-left text-sm font-semibold text-gray-700'>{user.rol}</td>
                                            <td className='py-2 text-right text-sm font-semibold'>
                                                <div>
                                                    <button className=' hover:bg-indigo/10  transition-all duration-300 ease-out text-white rounded-full p-2'>
                                                        <UserPen size={18} className='text-indigo' />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteUser(user.id)}
                                                        className=' hover:bg-red/10  transition-all duration-300 ease-out text-white rounded-full p-2'>
                                                        <Trash2 size={18} className='text-red' />
                                                    </button>
                                                </div>
                                            </td>


                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <NoRecords />
                    )}
                </section>
            </main>

            {isModalOpen && <FormUser onClose={handleCloseModal} />}
        </>
    )
}