import { merriweather, montserrat } from "@/src/lib/fonts";
import Heading from "@/src/ui/Heading";
import NoRecords from "@/src/ui/NoRecords";
import { formatCurrency } from "@/src/utils/formatCurrency";
import { capitalizeName } from "@/src/utils/formatName";
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
    <main className="bg-blue/20 backdrop-blur-sm z-50 fixed top-0 left-0 right-0 w-full flex items-center justify-center h-screen">
      <div className="bg-white rounded-3xl w-full max-w-6xl shadow-xl mx-auto p-4 animate-palpito ">
        <section className="flex items-center justify-between">
          <Heading>
            <span className={`flex items-center gap-2 ${montserrat.className}`}>
              <Sparkles size={24} className="text-blue/50" />
              Detalles del Rol
            </span>
          </Heading>
          
          <button
            className="flex items-center rounded-full hover:bg-red/10 transition-all duration-300 text-red  p-1"
            onClick={onClose}
          >
            <X />
          </button>
        </section>
        
        {selectedRole ? (
          <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Información del Rol */}
            <div className="col-span-1 rounded-3xl p-4 bg-blue/10">
              <h3 className={`font-semibold mb-4 flex items-center text-blue ${merriweather.className}`}>
                <User size={20} className="mr-2 text-blue" />
                Información del Rol
              </h3>
              
              <div className="space-y-4">
                <div className="border-b pb-3 border-gray/20 flex items-start">
                  <Briefcase size={16} className="mr-2 mt-1" />
                  <div>
                    <p className="font-medium">Puesto:</p>
                    <p>{capitalizeName(selectedRole.jobRole)}</p>
                  </div>
                </div>
                
                <div className="border-b pb-3 border-gray/20 flex items-start">
                  <Globe size={16} className="mr-2 mt-1 text-blue-400" />
                  <div>
                    <p className="text-sm text-gray-500">País:</p>
                    <p className="font-medium">{selectedRole.country}</p>
                  </div>
                </div>
                
                <div className="border-b pb-3 border-gray/20 flex items-start">
                  <Building size={16} className="mr-2 mt-1 text-blue-400" />
                  <div>
                    <p className="text-sm text-gray-500">Centro de Costos:</p>
                    <p className="font-medium">{selectedRole.cc}</p>
                  </div>
                </div>
                
                <div className="border-b pb-3 border-gray/20 flex items-start">
                  <Code size={16} className="mr-2 mt-1 text-blue-400" />
                  <div>
                    <p className="text-sm text-gray-500">Código CPH:</p>
                    <p className="font-medium">{selectedRole.cphCode}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <DollarSign size={16} className="mr-2 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">CPH:</p>
                    <p className="font-medium">{formatCurrency(selectedRole.cph)}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Proyectos relacionados */}
            <div className="col-span-1 rounded-3xl p-4 bg-blue/10">
              <h3 className={`font-semibold mb-4 flex items-center text-blue ${merriweather.className}`}>
                <Layers size={20} className="mr-2 " />
                Proyectos Relacionados
              </h3>
              
              {selectedRole.project && selectedRole.project.length > 0 ? (
                <div className="space-y-4">
                  {selectedRole.project.map((pro) => (
                    <div key={pro.id} className="border-b pb-3 border-blue-100 hover:bg-blue-50/50 p-2 transition-all">
                      <div className="flex items-center mb-2">
                        <FileText size={16} className="mr-2 text-blue-400" />
                        <p className="font-medium">{pro.typeProject}</p>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500 ml-6">
                        <CreditCard size={14} className="mr-2 text-blue-300" />
                        <p>Costo: {pro.costTicked} {pro.currencyType}</p>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500 ml-6">
                        <Clock size={14} className="mr-2 text-blue-300" />
                        <p className="text-xs">Creado: {new Date(pro.createdAt).toLocaleDateString()}</p>
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
            
            {/* Empleados relacionados */}
            <div className="col-span-1 rounded-3xl p-4 bg-blue/10">
              <h3 className={` font-semibold mb-4 flex items-center text-blue ${merriweather.className}`}>
                <Users size={20} className="mr-2 text-blue-500" />
                Empleados Asignados
              </h3>
              
              {selectedRole.employee && selectedRole.employee.length > 0 ? (
                <div className="space-y-4">
                  {selectedRole.employee.map((emp) => (
                    <div key={emp.id} className="border-b pb-3 border-blue-100 hover:bg-blue-50/50 p-2 transition-all">
                      <div className="flex items-center mb-2">
                        <User size={16} className="mr-2 text-blue-400" />
                        <p className="font-medium">{emp.fullName}</p>
                      </div>
                      
                      <div className="ml-6 space-y-1">
                        <div className="flex items-center text-sm text-gray-500">
                          <Mail size={14} className="mr-2 text-blue-300" />
                          <p>{emp.email}</p>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500">
                          <Phone size={14} className="mr-2 text-blue-300" />
                          <p>{emp.phone}</p>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500">
                          <BadgeCheck size={14} className="mr-2 text-blue-300" />
                          <p>ID: {emp.latamId}</p>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin size={14} className="mr-2 text-blue-300" />
                          <p>{emp.country}</p>
                        </div>
                        
                        <div className="flex items-center text-sm">
                          <Clock size={14} className="mr-2 text-blue-300" />
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