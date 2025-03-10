"use client"

import NoRecords from '@/src/ui/NoRecords';
import Heading from '@/src/utils/Heading';
import { UserType } from '@/types/userType';
import { Plus} from 'lucide-react';
import React, { useState } from 'react'
import FormUser from './FormUser';

interface UsersListProps {
    users: UserType[];
}

export default function UsersList({ users }: UsersListProps) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <>
            <main>
                {/* section encabezado */}
                <section className='flex items-center justify-between'>
                    <Heading>Users List</Heading>

                    <button className=' flex items-center bg-indigo/70 hover:bg-indigo/80 transition-all duration-300 ease-out text-white rounded-2xl py-2 px-4'
                        onClick={handleOpenModal}
                    >
                        <Plus />
                        New User
                    </button>
                </section>
                {/* lista de usuarios */}
                <section className='mt-4'>

                    {users.length > 0 ? (
                        users.map((user) => (
                            <div key={user.id} className='border border-gray/20 p-4 rounded-2xl flex items-center flex-col gap-4'>
                                <h3>{user.fullNameUser}</h3>
                                <p>{user.userName}</p>
                                <p>{user.rol}</p>
                            </div>
                        ))
                    ) :
                        (
                            <NoRecords />
                        )}


                </section>
            </main>

            {isModalOpen && <FormUser onClose={handleCloseModal}/> }
        </>
    )
}
