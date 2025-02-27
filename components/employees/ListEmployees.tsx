"use client"

import { deleteEmployee } from "@/server/employees";
import { EmployeesType } from "@/types/employees.type";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";

interface ListEmployeesProps {
    employees: EmployeesType[];
}

export default function ListEmployees({ employees }: ListEmployeesProps) {

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
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">Listado de Empleados</h1>
            {employees.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                        <thead className="bg-gray-100">
                            <tr>
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
                                <tr key={emp.id} className="border-t border-gray-200 hover:bg-gray-50">
                                    <td className="px-4 py-2 text-sm text-gray-700">{index + 1}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{emp.fullName}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{emp.email}</td>
                                    <td className="px-4 py-2 text-sm">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${emp.status
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
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
                <p className="text-gray-600">No hay empleados registrados</p>
            )}
        </div>
    );
}
