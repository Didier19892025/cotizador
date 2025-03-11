"use client"

import { deleteEmployee } from "@/server/employeesActions";
import NoRecords from "@/src/ui/NoRecords";
import Heading from "@/src/ui/Heading";
import { EmployeesType } from "@/types/employeesType";
import { CircleAlert, GripVertical, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";
import FormCreateEmployee from "./FormEmployee";
import ModalDetailEmployee from "./ModalDetailEmployee";

interface ListEmployeesProps {
    employee: EmployeesType[];
}

export default function ListEmployees({ employee }: ListEmployeesProps) {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenModalDetail, setIsOpenModalDetail] = useState(false);
    const handleOpenModal = () => setIsOpenModal(true);
    const handleCloseModal = () => setIsOpenModal(false);
    const handleOpenModalDetail = () => setIsOpenModalDetail(true);
    const handleCloseModalDetail = () => {
        setIsOpenModalDetail(false);
    }


    const handleDeleteEmployee = async (id: number) => {
        // Mostrar el modal de confirmación
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteEmployee(id);

                    Swal.fire({
                        title: 'Eliminado!',
                        text: 'El empleado ha sido eliminado.',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    });
                } catch (error) {
                    console.error(error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Hubo un problema al eliminar al empleado.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }
        });
    };

    return (
        <>
            <main className="">
                {/* Header section */}
                <section className="flex items-center justify-between">
                    <Heading>MANAGE EMPLOYEES</Heading>

                    <button
                        className="flex items-center bg-indigo/70 hover:bg-indigo/80 transition-all duration-300 ease-out text-white rounded-2xl py-1.5 px-4"
                        onClick={handleOpenModal}
                    >
                        <Plus size={18}/>
                        Add new employee
                    </button>
                </section>

                {/* Lista de empleados */}
                <section className="mt-4 max-h-[550px] overflow-auto">
                    {employee.length > 0 ? (
                        <div className="overflow-hidden border-gray/20">
                            <table className="w-full">
                                <thead className="bg-gray/20 rounded-2xl">
                                    <tr className="rounded-2xl">
                                        <th className="w-1/12 px-4 py-2 text-left text-sm font-semibold text-gray-700 rounded-tl-2xl rounded-bl-2xl"><strong>#</strong></th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Full Name</th>
                                       
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Latam ID</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Type Employee</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Job Role</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">CPH Code</th>

                                        <th className="px-4 py-2 text-right ml-4 text-sm font-semibold text-gray-700 rounded-tr-2xl rounded-br-2xl">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employee.map((emp, index) => (
                                        <tr key={emp.id} className="border-b last:border-none border-gray/20">
                                            <td className="px-4 py-2 text-left text-sm font-semibold text-gray-700">{index + 1}</td>
                                            <td className="px-4 py-2 text-left text-sm font-semibold text-gray-700">{emp.fullName}</td>
                                            
                                            <td className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${emp.status
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-500 text-red-700'
                                                    }`}>
                                                    {emp.status ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2 text-left text-sm font-semibold text-gray-700">{emp.latamId}</td>
                                            <td className="px-4 py-2 text-left text-sm font-semibold text-gray-700">{emp.typeEmployee}</td>
                                            <td className="px-4 py-2 text-left text-sm font-semibold text-gray-700">{emp.role.jobRole}</td>
                                            <td className="px-4 py-2 text-left text-sm font-semibold text-gray-700">{emp.role.cphCode}</td>

                                            <td className="py-2 text-right text-sm font-semibold">
                                                <div className="relative group flex justify-end ">
                                                    <div className="hover:bg-gray/10 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer">
                                                        <GripVertical size={18} />
                                                    </div>
                                                    <div className="absolute right-6  bottom-0 p-2 bg-white shadow-xl border border-gray/40 rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                                                        <div className="flex gap-1 ">
                                                           
                                                            <button
                                                                onClick={handleOpenModalDetail}
                                                                className="hover:bg-gray/10 transition-all duration-300 ease-out text-white rounded-full p-2">
                                                                <CircleAlert size={18} className="text-gray" />
                                                            </button>
                                                            <button
                                                                className="hover:bg-indigo/10 transition-all duration-300 ease-out text-white rounded-full p-2">
                                                                <Pencil size={18} className="text-indigo" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteEmployee(emp.id)}
                                                                className="hover:bg-red/10 transition-all duration-300 ease-out text-white rounded-full p-2">
                                                                <Trash2 size={18} className="text-red" />
                                                            </button>
                                                        </div>
                                                    </div>
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

            {isOpenModal && (
                <div className="fixed inset-0 z-50">
                    <FormCreateEmployee onClose={handleCloseModal} />
                </div>
            )}
            {isOpenModalDetail && (
                <div className="fixed inset-0 z-50">
                    <ModalDetailEmployee onClose={handleCloseModalDetail} employee={employee} />
                </div>
            )}
        </>
    );
}