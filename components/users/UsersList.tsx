"use client"

import React, { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import NoRecords from '@/src/ui/NoRecords'
import Heading from '@/src/ui/Heading'
import { UserType } from '@/types/userType'
import FormUser from './FormUser'
import Swal from 'sweetalert2'
import { deleteUser } from '@/actions/usersActions'
import { formatDate, time } from '@/src/utils/formatDate'

interface UsersListProps {
    users: UserType[]
}

export default function UsersList({ users }: UsersListProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [expandedUserId, setExpandedUserId] = useState<number | null>(null)

    const handleOpenModal = () => setIsModalOpen(true)
    const handleCloseModal = () => setIsModalOpen(false)

    const handleRowClick = (userId: number) => {
        setExpandedUserId(prevId => prevId === userId ? null : userId)
    }

    const handleDeleteUser = async (userId: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this action!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await deleteUser(userId);
                if (response.success) {
                    Swal.fire({
                        title: 'Deleted!',
                        text: response.message,
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: response.message,
                        icon: 'error',
                        confirmButtonText: 'Accept'
                    });
                }
            }
        });
    };

    return (
        <>
            <main className=''>
                <section className='flex items-center justify-between'>
                    <Heading>User List</Heading>

                    <button
                        className='flex items-center rounded-3xl bg-blue hover:bg-blue/80 transition-all duration-300 ease-out text-white py-1 px-4'
                        onClick={handleOpenModal}
                    >
                        <Plus />
                        New User
                    </button>
                </section>

                <section className='mt-4'>
                    {users.length > 0 ? (
                        <div className="overflow-hidden border-gray/20">
                            <table className='w-full'>
                                <thead className='bg-gray/20'>
                                    <tr>
                                        <th className='w-auto px-4 py-2 text-left text-sm font-semibold rounded-s-3xl'><strong>#</strong></th>
                                        <th className='w-auto px-4 py-2 text-left text-sm font-semibold'>Full Name</th>
                                        <th className='w-auto px-4 py-2 text-left text-sm font-semibold'>Username</th>
                                        <th className='w-auto px-4 py-2 text-left text-sm font-semibold'>Role</th>
                                        <th className='w-auto px-4 py-2 text-left text-sm font-semibold rounded-e-3xl'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <React.Fragment key={user.id}>
                                            <tr
                                                className='mt-2 text-gray/80 cursor-pointer hover:bg-gray/5 relative'
                                                onClick={() => handleRowClick(user.id)}
                                            >
                                                <td className='px-4 py-2 text-left text-sm font-semibold rounded-s-full'>{index + 1}</td>
                                                <td className='px-4 py-2 text-left text-sm font-semibold'>{user.fullNameUser}</td>
                                                <td className='px-4 py-2 text-left text-sm font-semibold'>{user.userName}</td>
                                                <td className='px-4 py-2 text-left text-sm font-semibold '>{user.rol}</td>
                                                <td className='px-4 py-2 text-right text-sm  flex items-center justify-end rounded-e-full'>
                                                    <button
                                                        onClick={() => handleDeleteUser(user.id)}
                                                        className='rounded-full flex items-center justify-center p-2 hover:bg-red/10 text-red transition-all duration-300 ease-out'
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                            {expandedUserId === user.id && (
                                                <tr>
                                                    <td colSpan={5}>
                                                        <div
                                                            className='p-4 bg-gray/5 rounded-3xl mt-2 transition-all duration-300 ease-in-out max-h-[300px] overflow-y-auto'
                                                        >
                                                            <h4 className='font-semibold text-sm mb-2 text-blue'>Access Logs</h4>
                                                            {user.logUser && user.logUser.length > 0 ? (
                                                                <div className='space-y-2'>
                                                                    {user.logUser.map((log, logIndex) => (
                                                                        <div
                                                                            key={log.id}
                                                                            className='bg-white rounded-3xl shadow-md p-3 border border-gray/10'
                                                                        >
                                                                            <div className='flex justify-between items-center mb-2'>
                                                                                <span className='text-sm font-semibold text-blue'>Session {logIndex + 1}</span>
                                                                                <span className={` text-white py-1 text-xs px-4 rounded-3xl ${log.logoutTime ? 'bg-red' : 'bg-green'}`}>
                                                                                    {log.logoutTime ? 'Inactive' : 'Active'}
                                                                                </span>
                                                                            </div>
                                                                            <p className='text-sm'>
                                                                                <strong>Login:</strong> {formatDate(log.loginTime)}
                                                                            </p>
                                                                            {log.logoutTime && (
                                                                                <p className='text-sm'>
                                                                                    <strong>Logout:</strong> {formatDate(log.logoutTime)}
                                                                                </p>
                                                                            )}
                                                                            {log.logoutTime && (
                                                                                <p className='text-sm'>
                                                                                    <strong>Time spent:</strong> {time(log.loginTime, log.logoutTime)} Minutes
                                                                                </p>
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <NoRecords />
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
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
