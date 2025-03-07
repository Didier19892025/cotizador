"use client"

import { deleteEmployee } from "@/server/employeesActions";
import NoRecords from "@/src/ui/NoRecords";
import Heading from "@/src/utils/Heading";
import { EmployeesType } from "@/types/employeesType";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";
import FormCreateEmployee from "./FormCreateEmployee";

interface ListEmployeesProps {
    employees: EmployeesType[];
}

export default function ListEmployees({ employees }: ListEmployeesProps) {

    const handleOpenModal = () => setIsOpenModal(true);
    const handleCloseModal = () => setIsOpenModal(false);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleDeleteEmployee = async (id: number) => {
        try {
            // Muestra un SweetAlert de confirmación antes de eliminar
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: 'No podrás revertir esta acción.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminarlo',
                cancelButtonText: 'Cancelar'
            });

            // Si el usuario confirma, proceder con la eliminación
            if (result.isConfirmed) {
                const res = await deleteEmployee(id);  // Esperar el resultado de la función de eliminación
                console.log(res);

                // Si la eliminación fue exitosa, mostrar mensaje de éxito
                Swal.fire('Eliminado!', 'El empleado ha sido eliminado.', 'success');
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Hubo un problema al eliminar al empleado.', 'error');
        }
    };



    return (
        <>
            <main>
                <div className="flex justify-between items-center border-b border-gray/20 pb-4 mb-4">
                    <Heading>Gestionar empleados</Heading>
                    <button
                        onClick={handleOpenModal}
                        className="bg-indigo/80 py-2 px-6 rounded-2xl hover:bg-indigo/90 transition-all duration-300 ease-in-out hover:text-white text-white font-semibold"
                    >
                        Agregar Empleado

                    </button>
                </div>
                {employees.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full ">
                            <thead>
                                <tr className="text-gray/90">
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700"><strong>#</strong></th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Full Name</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Email</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Latam ID</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Type Employee</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Job Role</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">CPH Code</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Origin Country</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((emp, index) => (
                                    <tr key={emp.id} className="border-b border-gray/40">
                                        <td className="px-4 py-2 text-sm">{index + 1}</td>
                                        <td className="px-4 py-2 text-sm">{emp.fullName}</td>
                                        <td className="px-4 py-2 text-sm">{emp.email}</td>
                                        <td className="px-4 py-2 text-sm">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${emp.status
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-500 text-red-700'
                                                }`}>
                                                {emp.status ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{emp.latamId}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{emp.typeEmployee}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{emp.role.jobRole}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{emp.role.cphCode}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{emp.role.country}</td>
                                        <td className="px-4 py-2 flex space-x-2 items-center">
                                            {/* Actions for each employee */}
                                            <Link
                                                href={`/employees/${emp.id}/edit`}
                                                className="text-blue-500 hover:text-blue-700">
                                                <Pencil size={18} />
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteEmployee(emp.id)}
                                                className="text-red-500 hover:text-red-700">
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <NoRecords />
                )}
            </main>
            {isOpenModal && (
                <div
                className="fixed inset-0  left-0 right-0 w-full transform transition-transform duration-300 ease-in-out animate-slideDown"
                    style={{
                        animationFillMode: "forwards",
                        transformOrigin: "top",
                    }}
                >
                    <FormCreateEmployee onClose={handleCloseModal}/>
                </div>
            )}
        </>
    );
}
