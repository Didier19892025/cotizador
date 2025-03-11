import { EmployeesType } from "@/types/employeesType";
import { X, User, Mail, Calendar, Tag, MapPin, Clipboard } from "lucide-react";

interface ModalDetailEmployeeProps {
  onClose: () => void;
  employee: EmployeesType;  // Usamos el tipo actualizado
}

export default function ModalDetailEmployee({ onClose, employee }: ModalDetailEmployeeProps) {
  return (
    <>
      <main className="bg-black/50 fixed top-0 left-0 right-0 w-full animate-palpito flex items-center justify-center z-50 h-screen">
        <div className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl flex flex-col">
          <section className="flex justify-between items-center p-4">
            <h2 className="text-lg font-semibold text-center">Employee Detail</h2>
            <button onClick={onClose} className="bg-gray-100 rounded-full p-1.5">
              <X />
            </button>
          </section>

          <div className="px-6 py-4">
            {/* Employee Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <User className="text-gray-600" />
                <span className="font-medium">Full Name:</span>
                <span>{employee.fullName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="text-gray-600" />
                <span className="font-medium">Email:</span>
                <span>{employee.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="text-gray-600" />
                <span className="font-medium">Created At:</span>
                <span>{new Date(employee.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="text-gray-600" />
                <span className="font-medium">Employee Type:</span>
                <span>{employee.typeEmployee}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="text-gray-600" />
                <span className="font-medium">LATAM ID:</span>
                <span>{employee.latamId}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clipboard className="text-gray-600" />
                <span className="font-medium">Status:</span>
                <span>{employee.status ? "Active" : "Inactive"}</span>
              </div>
            </div>

            {/* Employee Role Info */}
            {/* <div className="mt-6">
              <h3 className="text-md font-semibold text-gray-800">Role Information</h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <Tag className="text-gray-600" />
                  <span className="font-medium">Job Role:</span>
                  <span>{employee.role.jobRole}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="text-gray-600" />
                  <span className="font-medium">Country:</span>
                  <span>{employee.role.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="text-gray-600" />
                  <span className="font-medium">Area:</span>
                  <span>{employee.role.area}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clipboard className="text-gray-600" />
                  <span className="font-medium">CPH Code:</span>
                  <span>{employee.role.cphCode}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clipboard className="text-gray-600" />
                  <span className="font-medium">CPH:</span>
                  <span>{employee.role.cph}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="text-gray-600" />
                  <span className="font-medium">Currency:</span>
                  <span>{employee.role.currency}</span>
                </div>
              </div>
            </div> */}

            {/* Employee Projects Info */}
            <div className="mt-6">
              <h3 className="text-md font-semibold text-gray-800">Project Information</h3>
              {employee.project.length > 0 ? (
                <div className="mt-2">
                  {employee.project.map((proj, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex items-center gap-2">
                        <Tag className="text-gray-600" />
                        <span className="font-medium">Project Type:</span>
                        <span>{proj.typeProject}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tag className="text-gray-600" />
                        <span className="font-medium">Cost:</span>
                        <span>{proj.costTicked}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tag className="text-gray-600" />
                        <span className="font-medium">Service Type:</span>
                        <span>{proj.serviceEnum}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No projects assigned to this employee.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
