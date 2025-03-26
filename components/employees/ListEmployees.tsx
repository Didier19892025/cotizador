"use client";

import { deleteEmployee } from "@/actions/employeesActions";
import NoRecords from "@/src/ui/NoRecords";
import Heading from "@/src/ui/Heading";
import { EmployeesType } from "@/types/employeesType";
import { CircleAlert, GripVertical, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";
import { ModalState } from "@/types/modalTypes";
import FormEmployee from "./FormEmployee";
import { RoleType } from "@/types/rolesType";
import ModalEmployeeDetail from "./ModalEmployeeDetail";
import { capitalizeName } from "@/src/utils/formatName";

interface ListEmployeesProps {
    role: RoleType[];
    employees: EmployeesType[];
    onEmployeesUpdate?: () => void;
}

export default function ListEmployees({ employees, role }: ListEmployeesProps) {
    const [modalState, setModalState] = useState<ModalState>({ type: 'none' });

    const simplifiedRoles = role.map((r) => ({
        id: r.id,
        jobRole: r.jobRole,
    }));

    // Funciones para manejar la apertura y cierre de modales
    const openCreateModal = () => setModalState({ type: 'create' });
    const openEditModal = (employee: EmployeesType) => setModalState({ type: 'edit', data: employee });
    const openDetailModal = (employeeId: number) => setModalState({ type: 'detail', data: employeeId });
    const closeModal = () => setModalState({ type: 'none' });

    const handleDeleteEmployee = async (id: number, fullName: string) => {
        // Mostrar el modal de confirmación
        Swal.fire({
            title: '¿Estás seguro?',
            text: `¿Quieres eliminar al empleado <strong>${fullName}</strong>? Esta acción no se puede deshacer.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteEmployee(id);

                    Swal.fire({
                        title: 'Eliminado!',
                        text: 'El empleado ha sido eliminado.',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } catch (error) {
                    console.error(error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Hubo un problema al eliminar al empleado.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                }
            }
        });
    };

    return (
        <>
            <main className=" ">
                {/* Header section */}
                <section className="flex items-center justify-between">
                    <Heading>Manage Employees</Heading>

                    <button
                        className="flex items-center bg-blue rounded-3xl hover:bg-blue/80 transition-all duration-300 ease-out text-white    py-1.5 px-4"
                        onClick={openCreateModal}
                    >
                        <Plus size={18} />
                        Add New Employee
                    </button>
                </section>

                {/* Employee List */}
                <section className="mt-4 max-h-[550px] overflow-auto">
                    {employees.length > 0 ? (
                        <div className="overflow-hidden border-gray/20">
                            <table className="w-full">
                                <thead className="bg-blue text-white   ">
                                    <tr className="  ">
                                        <th className=" px-4 py-2 text-left text-sm font-semibold rounded-s-3xl"><strong>#</strong></th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold ">Full Name</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold ">Status</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold ">Latam ID</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold ">Type Employee</th>
                                        <th className="px-4 py-2 text-right ml-4 text-sm font-semibold rounded-e-3xl">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map((emp, index) => (
                                        <tr key={emp.id} className="border-b last:border-none border-gray/10">
                                            <td className="px-1 text-left text-sm font-semibold">
                                                <span className="bg-blue px-3 py-1 rounded-full text-white">{index + 1}</span>
                                            </td>
                                            <td className="px-4 py-2 text-left  ">{capitalizeName(emp.fullName)}</td>
                                            <td className="px-4 py-2 text-left  ">
                                                <span
                                                    className={`px-3 py-1 rounded-3xl text-white ${emp.status
                                                            ? 'bg-green text-green' // Color para "Active"
                                                            : 'bg-red text-red'     // Color para "Inactive"
                                                        }`}
                                                >
                                                    {emp.status ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>

                                            <td className="px-4 py-2 text-left ">{emp.latamId}</td>
                                            <td className="px-4 py-2 text-left ">{capitalizeName(emp.typeEmployee)}</td>

                                            <td className="py-2 text-right text-sm font-semibold">
                                                <div className="relative group flex justify-end ">
                                                    <div className="hover:bg-green/10  rounded-full p-1 text-green  flex items-center justify-center cursor-pointer">
                                                        <GripVertical size={18} />
                                                    </div>
                                                    <div className="absolute right-6 bottom-0 p-2 bg-white shadow-xl  rounded-3xl  opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                                                        <div className="flex gap-1">
                                                            <button
                                                                onClick={() => openDetailModal(emp.id)}
                                                                className="hover:bg-green/10 transition-all duration-300 ease-out rounded-full p-2"
                                                            >
                                                                <CircleAlert size={18} className="text-green" />
                                                            </button>
                                                            <button
                                                                onClick={() => openEditModal(emp)}
                                                                className="hover:bg-green/10 transition-all duration-300 ease-out rounded-full   p-2"
                                                            >
                                                                <Pencil size={18} className="text-blue" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteEmployee(emp.id, emp.fullName)}
                                                                className="hover:bg-red/10 transition-all duration-300 ease-out rounded-full   p-2"
                                                            >
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

            {/* Conditionally Render Modals */}
            {modalState.type === 'create' && (
                <FormEmployee onClose={closeModal} simplifiedRoles={simplifiedRoles} />
            )}

            {modalState.type === "edit" && (
                <FormEmployee
                    onClose={closeModal}
                    mode="edit"
                    employees={modalState.data as EmployeesType}
                    simplifiedRoles={simplifiedRoles}
                />
            )}

            {modalState.type === "detail" && (
                <ModalEmployeeDetail
                    onClose={closeModal}
                    selectedEmployeeId={modalState.data as number}
                    employees={employees}  // Pasa la propiedad 'employees'
                />
            )}
        </>
    );
}
