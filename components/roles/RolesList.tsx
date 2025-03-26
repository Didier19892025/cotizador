"use client";

import Heading from "@/src/ui/Heading";
import { CircleAlert, GripVertical, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import FormRoles from "./FormRoles";
import { RoleType } from "@/types/rolesType";
import NoRecords from "@/src/ui/NoRecords";
import Swal from "sweetalert2";
import { deleteRole } from "@/actions/rolesActions";
import ModalRolesDetail from "./ModalRolesDetail";
import { ModalState } from "@/types/modalTypes";
import { formatCurrency } from "@/src/utils/formatCurrency";

interface RolesListProps {
  roles: RoleType[];
  onRolesUpdate?: () => void;
}

export default function RolesList({ roles }: RolesListProps) {
  const [modalState, setModalState] = useState<ModalState>({ type: 'none' });

  // Funciones para manejar la apertura y cierre de modales
  const openCreateModal = () => setModalState({ type: 'create' });
  const openEditModal = (role: RoleType) => setModalState({ type: 'edit', data: role });
  const openDetailModal = (roleId: number) => setModalState({ type: 'detail', data: roleId });
  const closeModal = () => setModalState({ type: 'none' });


  const handleDeleteRole = async (id: number, jobRole: string) => {
    // Mostrar el modal de confirmación
    Swal.fire({
      title: "Are you sure?",
      html: `Do you really want to delete the role <strong>${jobRole}</strong>?<br>This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const deleteResult = await deleteRole(id);

          if (!deleteResult.success) {
            Swal.fire({
              title: "Error",
              text: deleteResult.message,
              icon: "error",
            });
            return;
          }

          Swal.fire({
            title: "Deleted!",
            text: deleteResult.message,
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (error) {
          console.error(error);
          Swal.fire({
            title: "Error",
            text: "An unexpected error occurred",
            icon: "error",
          });
        }
      }
    });
  };
  return (
    <>
      <main>
        {/* Header section */}
        <section className="flex items-center justify-between">
          <Heading> Manage Roles</Heading>

          <button
            className="flex items-center bg-blue hover:bg-blue/80 rounded-3xl transition-all duration-300 ease-out text-white py-1 px-4"
            onClick={openCreateModal}
          >
            <Plus />
            New Roles
          </button>
        </section>
        {/* Roles section */}
        {/* Roles section */}
        <section className="mt-4">
          {roles.length > 0 ? (
            <div className="border-gray/20 max-h-[430px] overflow-hidden   ">
              <div className="overflow-y-auto h-full">
                <table className="w-full">
                  <thead className="bg-blue text-white">
                    <tr>
                      <th className=" px-4 py-2 text-left text-sm font-semibold rounded-s-3xl">
                        <strong>#</strong>
                      </th>
                      <th className=" px-4 py-2 text-left text-sm font-semibold ">
                        JobRole
                      </th>
                      <th className=" px-4 py-2 text-left text-sm font-semibold ">
                        Country
                      </th>
                      <th className=" px-4 py-2 text-left text-sm font-semibold ">
                        Center Cost
                      </th>
                      <th className=" px-4 py-2 text-left text-sm font-semibold ">
                        Cph Code
                      </th>
                      <th className=" px-4 py-2 text-left text-sm font-semibold ">
                        Cph
                      </th>
                      <th className="px-4 py-2 text-right ml-4 text-sm font-semibold rounded-e-3xl">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {roles.map((role, index) => (
                      <tr
                        key={role.id}
                        className="border-b last:border-none border-gray/10"
                      >
                        <td className="px-1 text-left text-sm font-semibold">
                          <span className="bg-blue px-3 py-1 rounded-full text-white">{index + 1}</span>

                        </td>
                        <td className="px-4 py-2 text-left">
                          {role.jobRole}
                        </td>
                        <td className="px-4 py-2 text-left  ">
                          {role.country}
                        </td>
                        <td className="px-4 py-2 text-left  ">
                          {role.cc}
                        </td>
                        <td className="px-4 py-2 text-left  ">
                          {role.cphCode}
                        </td>
                        <td className="px-4 py-2 text-left  ">
                          <span className="text-green">$</span>{" "}{formatCurrency(role.cph)}
                        </td>
                        <td className="py-2 text-right text-sm font-semibold">
                          <div className="relative group flex justify-end ">
                            <div className="hover:bg-green/10  rounded-full p-1 text-green  flex items-center justify-center cursor-pointer">
                              <GripVertical size={18} />
                            </div>
                            <div className="absolute right-6 bottom-0 p-2 bg-white shadow-xl  rounded-3xl  opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">

                              <button
                                onClick={() => openDetailModal(role.id)}
                                className="hover:bg-green/10 transition-all duration-300 ease-out rounded-full p-2"
                              >
                                <CircleAlert size={18} className="text-green" />
                              </button>
                              <button
                                onClick={() => openEditModal(role)}
                                className="hover:bg-green/10 transition-all duration-300 ease-out rounded-full   p-2"
                              >
                                <Pencil size={18} className="text-blue" />
                              </button>
                              <button
                                onClick={() => handleDeleteRole(role.id, role.jobRole)}
                                className="hover:bg-red/10 transition-all duration-300 ease-out rounded-full   p-2"
                              >
                                <Trash2 size={18} className="text-red" />
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <NoRecords />
          )}
        </section>
      </main>

      {/* Renderizado condicional de modales basado en el estado */}
      {modalState.type === 'create' &&
        <FormRoles onClose={closeModal} />}

      {modalState.type === 'edit' &&
        <FormRoles
          roles={modalState.data as RoleType}
          mode="edit"
          onClose={closeModal}
        />}

      {modalState.type === 'detail' &&
        <ModalRolesDetail
          roles={roles}
          onClose={closeModal}
          selectedRoleId={modalState.data as number}
        />}
    </>
  );
}
