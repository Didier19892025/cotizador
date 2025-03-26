import Heading from "@/src/ui/Heading";
import NoRecords from "@/src/ui/NoRecords";
import { formatCurrency } from "@/src/utils/formatCurrency";
import { capitalizeName } from "@/src/utils/formatName";
import { EmployeesType } from "@/types/employeesType";
import { 
  User, 
  X, 
  Mail, 
  Phone, 
  BadgeCheck, 
  Globe, 
  Clock, 
  Briefcase,
  Tag,
  Users,
  Building,
  Code,
  DollarSign,
  CheckCircle2,
  XCircle,
  Calendar,
  UserCheck,
  Layers
} from "lucide-react";

interface ModalEmployeeDetailProps {
  onClose: () => void;
  employees: EmployeesType[];
  selectedEmployeeId?: number;
}

export default function ModalEmployeeDetail({ onClose, employees, selectedEmployeeId }: ModalEmployeeDetailProps) {
  const selectedEmployee = employees.find(employee => employee.id === selectedEmployeeId);

  return (
    <main className="bg-blue/20 backdrop-blur-sm z-50 fixed top-0 left-0 right-0 w-full flex items-center justify-center h-screen">
      <div className="bg-white max-w-8xl p-4 animate-palpito rounded-3xl">
        <section className="flex items-center justify-between">
          <Heading>
            <span className="flex items-center gap-2">
              <UserCheck size={24}  />
             Details of the Employee
            </span>
          </Heading>
          
          <button
            className="flex items-center hover:bg-green/10 rounded-full transition-all duration-300 hover:text-red   p-1"
            onClick={onClose}
          >
            <X />
          </button>
        </section>
        
        {selectedEmployee ? (
          <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Información Personal */}
            <div className="col-span-1 border border-gray/10 p-4 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <User size={20} className="mr-2" />
                Personal Information
              </h3>
              
              <div className="space-y-4">
                <div className="border-b pb-3 border-gray/10 flex items-start">
                  <User size={16} className="mr-2 mt-1 text-  blue-400" />
                  <div>
                    <p className="text-sm ">Full Name:</p>
                    <p className="font-medium">{capitalizeName(selectedEmployee.fullName)}</p>
                  </div>
                </div>
                
                <div className="border-b pb-3 border-gray/10 flex items-start">
                  <Mail size={16} className="mr-2 mt-1" />
                  <div>
                    <p className="text-sm ">Email:</p>
                    <p className="font-medium">{selectedEmployee.email}</p>
                  </div>
                </div>
                
                <div className="border-b pb-3 border-gray/10 flex items-start">
                  <Phone size={16} className="mr-2 mt-1" />
                  <div>
                    <p className="text-sm">Phone:</p>
                    <p className="font-medium">{selectedEmployee.phone}</p>
                  </div>
                </div>
                
                <div className="border-b pb-3 border-gray/10 flex items-start">
                  <BadgeCheck size={16} className="mr-2 mt-1 " />
                  <div>
                    <p className="text-sm ">ID Latam:</p>
                    <p className="font-medium">{selectedEmployee.latamId}</p>
                  </div>
                </div>
                
                <div className="border-b pb-3 border-gray/10 flex items-start">
                  <Tag size={16} className="mr-2 mt-1 text-  blue-400" />
                  <div>
                    <p className="text-sm ">Type of Employee:</p>
                    <p className="font-medium">{selectedEmployee.typeEmployee}</p>
                  </div>
                </div>
                
                <div className="border-b pb-3 border-gray/10 flex items-start">
                  <Globe size={16} className="mr-2 mt-1 " />
                  <div>
                    <p className="text-sm ">Country:</p>
                    <p className="font-medium">{selectedEmployee.country}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  {selectedEmployee.status ? (
                    <CheckCircle2 size={16} className="mr-2 mt-1" />
                  ) : (
                    <XCircle size={16} className="mr-2 mt-1" />
                  )}
                  <div>
                    <p className="text-sm ">State:</p>
                    <p className={`font-medium ${selectedEmployee.status ? 'text-green' : 'text-red'}`}>
                      {selectedEmployee.status ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Información del Rol */}
            <div className="col-span-1 border border-gray/10 p-4 ">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Briefcase size={20} className="mr-2 " />
                Role Information
              </h3>
              
              {selectedEmployee.role ? (
                <div className="space-y-4">
                  <div className="border-b pb-3 border-gray/10 flex items-start">
                    <Briefcase size={16} className="mr-2 mt-1 " />
                    <div>
                      <p className="text-sm ">Job Role:</p>
                      <p className="font-medium">{capitalizeName(selectedEmployee.role.jobRole)}</p>
                    </div>
                  </div>
                  
                  <div className="border-b pb-3 border-gray/10 flex items-start">
                    <Globe size={16} className="mr-2 mt-1 " />
                    <div>
                      <p className="text-sm ">Country Job role:</p>
                      <p className="font-medium">{selectedEmployee.role.country}</p>
                    </div>
                  </div>
                  
                  <div className="border-b pb-3 border-gray/10 flex items-start">
                    <Layers size={16} className="mr-2 mt-1 " />
                    <div>
                      <p className="text-sm ">Área:</p>
                      <p className="font-medium">{capitalizeName(selectedEmployee.role.area)}</p>
                    </div>
                  </div>
                  
                  <div className="border-b pb-3 border-gray/10 flex items-start">
                    <Building size={16} className="mr-2 mt-1 " />
                    <div>
                      <p className="text-sm ">Cost Center:</p>
                      <p className="font-medium">{selectedEmployee.role.cc}</p>
                    </div>
                  </div>
                  
                  <div className="border-b pb-3 border-gray/10 flex items-start">
                    <Code size={16} className="mr-2 mt-1 " />
                    <div>
                      <p className="text-sm ">Cph Code:</p>
                      <p className="font-medium">{selectedEmployee.role.cphCode}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <DollarSign size={16} className="mr-2 mt-1 " />
                    <div>
                      <p className="text-sm ">CPH:</p>
                      <p className="font-medium">{formatCurrency(selectedEmployee.role.cph)}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <NoRecords />
                </div>
              )}
            </div>
            
            {/* Información Adicional */}
            <div className="col-span-1 border border-gray/10 p-4 ">
              <h3 className="text-xl font-semibold mb-4 flex items-center ">
                <Users size={20} className="mr-2 " />
                Additional information
              </h3>
              
              <div className="space-y-4">
                <div className="border-b pb-3 border-gray/10 flex items-start">
                  <Calendar size={16} className="mr-2 mt-1 " />
                  <div>
                    <p className="text-sm">Creation Date:</p>
                    <p className="font-medium">{new Date(selectedEmployee.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="border-b pb-3 border-gray/10 flex items-start">
                  <Clock size={16} className="mr-2 mt-1 " />
                  <div>
                    <p className="text-sm ">Creation Time:</p>
                    <p className="font-medium">{new Date(selectedEmployee.createdAt).toLocaleTimeString()}</p>
                  </div>
                </div>
                
                <div className="border-b pb-3 border-gray/10 flex items-start">
                  <Calendar size={16} className="mr-2 mt-1 " />
                  <div>
                    <p className="text-sm ">Last Update:</p>
                    <p className="font-medium">{new Date(selectedEmployee.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock size={16} className="mr-2 mt-1 " />
                  <div>
                    <p className="text-sm ">Update Time:</p>
                    <p className="font-medium">{new Date(selectedEmployee.updatedAt).toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div className="text-center py-8">
            <NoRecords />
          </div>
        )}
      </div>
    </main>
  );
}
