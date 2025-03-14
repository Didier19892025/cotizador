import Heading from "@/src/ui/Heading";
import NoRecords from "@/src/ui/NoRecords";
import { RoleType } from "@/types/rolesType";
import { 
  Briefcase, 
  User, 
  Users, 
  X, 
  MapPin, 
  Building, 
  Code, 
  DollarSign, 
  Clock, 
  Mail, 
  Phone, 
  BadgeCheck, 
  Globe, 
  FileText, 
  Layers, 
  Sparkles, 
  Tag, 
  CreditCard
} from "lucide-react";

interface ModalRolesDetailProps {
  onClose: () => void;
  roles: RoleType[];
  selectedRoleId?: number;
}

export default function ModalRolesDetail({ onClose, roles, selectedRoleId }: ModalRolesDetailProps) {
  const selectedRole = roles.find(role => role.id === selectedRoleId);

  return (
    <main className="bg-black/50 backdrop-blur-sm z-50 fixed top-0 left-0 right-0 w-full flex items-center justify-center h-screen">
      <div className="bg-white rounded-2xl w-full max-w-6xl shadow-xl mx-auto p-6 animate-palpito border border-indigo-200">
        <section className="flex items-center justify-between">
          <Heading>
            <span className="flex items-center gap-2">
              <Sparkles size={24} className="text-indigo-500" />
              Detalles del Rol
            </span>
          </Heading>
          
          <button
            className="flex items-center hover:bg-indigo-100 transition-all duration-300 text-indigo-500 rounded-full p-2"
            onClick={onClose}
          >
            <X />
          </button>
        </section>
        
        {selectedRole ? (
          <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Información del Rol */}
            <div className="col-span-1 border border-indigo-100 p-6 rounded-2xl bg-gradient-to-br from-white to-indigo-50 shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 flex items-center text-indigo-700">
                <User size={20} className="mr-2 text-indigo-500" />
                Información del Rol
              </h3>
              
              <div className="space-y-4">
                <div className="border-b pb-3 border-indigo-100 flex items-start">
                  <Briefcase size={16} className="mr-2 mt-1 text-indigo-400" />
                  <div>
                    <p className="text-sm text-gray-500">Puesto:</p>
                    <p className="font-medium">{selectedRole.jobRole}</p>
                  </div>
                </div>
                
                <div className="border-b pb-3 border-indigo-100 flex items-start">
                  <Globe size={16} className="mr-2 mt-1 text-indigo-400" />
                  <div>
                    <p className="text-sm text-gray-500">País:</p>
                    <p className="font-medium">{selectedRole.country}</p>
                  </div>
                </div>
                
                <div className="border-b pb-3 border-indigo-100 flex items-start">
                  <Building size={16} className="mr-2 mt-1 text-indigo-400" />
                  <div>
                    <p className="text-sm text-gray-500">Centro de Costos:</p>
                    <p className="font-medium">{selectedRole.cc}</p>
                  </div>
                </div>
                
                <div className="border-b pb-3 border-indigo-100 flex items-start">
                  <Code size={16} className="mr-2 mt-1 text-indigo-400" />
                  <div>
                    <p className="text-sm text-gray-500">Código CPH:</p>
                    <p className="font-medium">{selectedRole.cphCode}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <DollarSign size={16} className="mr-2 mt-1 text-indigo-400" />
                  <div>
                    <p className="text-sm text-gray-500">CPH:</p>
                    <p className="font-medium">{selectedRole.cph} <span className="text-xs text-gray-400">{selectedRole.currency}</span></p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Proyectos relacionados */}
            <div className="col-span-1 border border-indigo-100 p-6 rounded-2xl bg-gradient-to-br from-white to-indigo-50 shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 flex items-center text-indigo-700">
                <Layers size={20} className="mr-2 text-indigo-500" />
                Proyectos Relacionados
              </h3>
              
              {selectedRole.project && selectedRole.project.length > 0 ? (
                <div className="space-y-4">
                  {selectedRole.project.map((pro) => (
                    <div key={pro.id} className="border-b pb-3 border-indigo-100 hover:bg-indigo-50/50 p-2 rounded-lg transition-all">
                      <div className="flex items-center mb-2">
                        <FileText size={16} className="mr-2 text-indigo-400" />
                        <p className="font-medium">{pro.typeProject}</p>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500 ml-6">
                        <Tag size={14} className="mr-2 text-indigo-300" />
                        <p>Servicio: {pro.serviceEnum}</p>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500 ml-6">
                        <CreditCard size={14} className="mr-2 text-indigo-300" />
                        <p>Costo: {pro.costTicked} {pro.currencyType}</p>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500 ml-6">
                        <Clock size={14} className="mr-2 text-indigo-300" />
                        <p className="text-xs">Creado: {new Date(pro.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <NoRecords  />
                </div>
              )}
            </div>
            
            {/* Empleados relacionados */}
            <div className="col-span-1 border border-indigo-100 p-6 rounded-2xl bg-gradient-to-br from-white to-indigo-50 shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 flex items-center text-indigo-700">
                <Users size={20} className="mr-2 text-indigo-500" />
                Empleados Asignados
              </h3>
              
              {selectedRole.employee && selectedRole.employee.length > 0 ? (
                <div className="space-y-4">
                  {selectedRole.employee.map((emp) => (
                    <div key={emp.id} className="border-b pb-3 border-indigo-100 hover:bg-indigo-50/50 p-2 rounded-lg transition-all">
                      <div className="flex items-center mb-2">
                        <User size={16} className="mr-2 text-indigo-400" />
                        <p className="font-medium">{emp.fullName}</p>
                      </div>
                      
                      <div className="ml-6 space-y-1">
                        <div className="flex items-center text-sm text-gray-500">
                          <Mail size={14} className="mr-2 text-indigo-300" />
                          <p>{emp.email}</p>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500">
                          <Phone size={14} className="mr-2 text-indigo-300" />
                          <p>{emp.phone}</p>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500">
                          <BadgeCheck size={14} className="mr-2 text-indigo-300" />
                          <p>ID: {emp.latamId}</p>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin size={14} className="mr-2 text-indigo-300" />
                          <p>{emp.country}</p>
                        </div>
                        
                        <div className="flex items-center text-sm">
                          <Clock size={14} className="mr-2 text-indigo-300" />
                          <p className="text-xs text-gray-500">Desde: {new Date(emp.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <NoRecords />
                </div>
              )}
            </div>
          </section>
        ) : (
          <div className="text-center py-8">
            <NoRecords  />
          </div>
        )}
      </div>
    </main>
  );
}