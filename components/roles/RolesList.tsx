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

interface RolesListProps {
  roles: RoleType[];
  onRolesUpdate? : () => void;
}

export default function RolesList({ roles }: RolesListProps) {
  const [selectedRoleId, setSelectedRoleId] = useState<number | undefined>(
    undefined
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDetail, setIsModalDetailOpen] = useState(false);
  const [isFormOpenEdit, setIsModalOpenEdit] = useState(false);
  const handleOpenFormEdit = () => setIsModalOpenEdit(true);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleOpenModalDetail = (roleId: number) => {
    setIsModalDetailOpen(true);
    setSelectedRoleId(roleId);
  };

  const handleCloseModal = () => setIsModalOpen(false);
  const handleCloseModalDetail = () => setIsModalDetailOpen(false);

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
          <Heading>Roles List</Heading>

          <button
            className="flex items-center bg-indigo/70 hover:bg-indigo/80 transition-all duration-300 ease-out text-white rounded-2xl py-2 px-4"
            onClick={handleOpenModal}
          >
            <Plus />
            New Roles
          </button>
        </section>
        {/* Roles section */}
        {/* Roles section */}
        <section className="mt-4">
          {roles.length > 0 ? (
            <div className="border-gray/20 max-h-[430px] overflow-hidden rounded-2xl">
              <div className="overflow-y-auto h-full">
                <table className="w-full">
                  <thead className="bg-gray text-white sticky top-0 z-10">
                    <tr>
                      <th className="w-1/12 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                        <strong>#</strong>
                      </th>
                      <th className="w-1/6 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                        JobRole
                      </th>
                      <th className="w-1/6 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                        Country
                      </th>
                      <th className="w-1/6 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                        Center Cost
                      </th>
                      <th className="w-1/6 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                        Cph Code
                      </th>
                      <th className="w-1/6 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                        Cph
                      </th>
                      <th className="px-4 py-2 text-right ml-4 text-sm font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {roles.map((role, index) => (
                      <tr
                        key={role.id}
                        className="border-b last:border-none border-gray/20"
                      >
                        <td className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                          {index + 1}
                        </td>
                        <td className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                          {role.jobRole}
                        </td>
                        <td className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                          {role.country}
                        </td>
                        <td className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                          {role.cc}
                        </td>
                        <td className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                          {role.cphCode}
                        </td>
                        <td className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                          {role.cph}
                        </td>
                        <td className="py-2 text-right text-sm font-semibold">
                          <div className="relative group flex justify-end ">
                            <div className="hover:bg-gray/10 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer">
                              <GripVertical size={18} />
                            </div>
                            <div className="absolute right-6 flex  bottom-0 p-2 bg-white shadow-xl border border-gray/40 rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                              <button
                                onClick={() => handleOpenModalDetail(role.id)}
                                className="hover:bg-gray/10 transition-all duration-300 ease-out text-white rounded-full p-2"
                              >
                                <CircleAlert size={18} className="text-gray" />
                              </button>
                              <button
                                onClick={handleOpenFormEdit}
                                className="hover:bg-indigo/10 transition-all duration-300 ease-out text-white rounded-full p-2"
                              >
                                <Pencil size={18} className="text-indigo" />
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteRole(role.id, role.jobRole)
                                }
                                className="hover:bg-red/10 transition-all duration-300 ease-out text-white rounded-full p-2"
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

      {isModalOpen && <FormRoles onClose={handleCloseModal} />}
      {isFormOpenEdit && <FormRoles 
        roles={roles}
        modeEdit="edit"
        onClose={handleCloseModal} />}
      {isModalOpenDetail && (
        <ModalRolesDetail
          roles={roles}
          onClose={handleCloseModalDetail}
          selectedRoleId={selectedRoleId}
        />
      )}
    </>
  );
}
