"use client"

import { EmployeesType } from "@/types/employees.type";
import { Pencil, Trash2 } from "lucide-react";

interface ListEmployeesProps {
    employees: EmployeesType[];
}

export default function ListEmployees({ employees }: ListEmployeesProps) {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">Listado de Empleados</h1>
            {employees.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Id</th>
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
                            {employees.map((emp) => (
                                <tr key={emp.id} className="border-t border-gray-200 hover:bg-gray-50">
                                    <td className="px-4 py-2 text-sm text-gray-700">{emp.id}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{emp.fullName}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{emp.email}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{emp.status}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{emp.latamId}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{emp.typeEmployee}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{emp.role.jobRole}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{emp.role.cphCode}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{emp.role.country}</td>
                                    <td className="px-4 py-2 flex space-x-2 items-center">
                                        {/* Actions for each employee */}
                                        <button className="text-blue-500 hover:text-blue-700">
                                            <Pencil size={18}/>
                                        </button>
                                        <button className="text-red-500 hover:text-red-700">
                                            <Trash2 size={18}/>
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
