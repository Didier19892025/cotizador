"use client"
import { ServiceType } from '@/types/servicesType';

// Interfaces
interface Client {
    id: number;
    name: string;
    email: string;
}

interface Quotation {
    type: 'services' | 'cph';
    role?: string;
    hours?: number;
    city?: string;
    currency?: string;
    materials?: string[];
    quantity?: number;
    days?: number;
    amount: number;
}

interface Project {
    clientId: number;
    projectNumber: string;
    projectName: string;
    quotations: Quotation[];
}


interface FormProjectsProps {
    services: ServiceType[];
}
const FormProjects: React.FC<FormProjectsProps> = ({services}) => {

    
    console.log('servicios en el FormProjects',services);
    const clients = [
        { id: 1, name: "John Doe", email: "john.doe@example.com" },
        { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
        { id: 3, name: "Acme Corp.", email: "contact@acmecorp.com" },
    ];
    return (
        <div className="space-y-6">
            {/* Sección de Número de Proyecto y Nombre de Proyecto */}
            <div className="flex items-center justify-start gap-5 flex-wrap">
                <div>
                    <h2 className="font-semibold mb-1 ml-2">Número de Proyecto</h2>
                    <input
                        type="text"
                        value={projectNumber}
                        onChange={(e) => setProjectNumber(e.target.value)}
                        className="w-56 p-2  rounded-3xl border border-gray/20 focus:outline-none bg-transparent"
                        placeholder="Ingrese número de proyecto"
                    />
                </div>

                <div>
                    <h2 className="font-semibold mb-1 ml-2">Nombre de Proyecto</h2>
                    <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="w-56 p-2  rounded-3xl focus:outline-none bg-transparent border border-gray/20"
                        placeholder="Ingrese nombre de proyecto"
                    />
                </div>

                {/* Sección de Cliente */}
                <div className=" relative">
                    <h2 className="font-semibold mb-1 ml-2">Cliente</h2>
                    <input
                        type="text"
                        value={
                            selectedClient
                                ? `${selectedClient.name}`
                                : searchTerm
                        }
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                            if (selectedClient) setSelectedClient(null)
                        }}
                        className="w-64 p-2 rounded-3xl border border-gray/20 focus:outline-blue/20 bg-transparent"
                        placeholder="Buscar cliente por nombre o email"
                    />
                    {searchTerm && (
                        <ul className="absolute z-10 bg-white border border-gray/20 rounded-3xl mt-1 w-full">
                            {clients
                                .filter(
                                    (client) =>
                                        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        client.email.toLowerCase().includes(searchTerm.toLowerCase())
                                )
                                .map((client) => (
                                    <li
                                        key={client.id}
                                        onClick={() => {
                                            setSelectedClient(client)
                                            setSearchTerm('')
                                        }}
                                        className="p-2 hover:bg-blue/80 cursor-pointer rounded-3xl hover:text-white"
                                    >
                                        {client.name} - {client.email}
                                    </li>
                                ))}
                        </ul>
                    )}

                    
                </div>
            </div>

            {/* Selección del tipo de Cotización */}
            <div className="mt-4 flex gap-4">
                <button
                    onClick={() => setSelectedQuotationType('services')}
                    className={`px-4 py-2 rounded-3xl ${selectedQuotationType === 'services' ? 'bg-green text-white' : 'border border-gray/20'}`}
                >
                    Nueva Cotización de Servicios
                </button>
                <button
                    onClick={() => setSelectedQuotationType('cph')}
                    className={`px-4 py-2 rounded-3xl ${selectedQuotationType === 'cph' ? 'bg-blue text-white' : 'border border-gray/20'}`}
                >
                    Nueva Cotización CPH
                </button>
            </div>

            {/* Formulario de Cotización de Servicios */}
            {/* {selectedQuotationType === 'services' && (
                <div className="bg-green/10 p-4 rounded-3xl">
                    <h3 className="text-lg font-semibold mb-4">Cotización de Servicios</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="font-semibold">Materiales</label>
                            <input
                                type="text"
                                value={servicesMaterials}
                                onChange={(e) => setServicesMaterials(e.target.value)}
                                className="w-full p-2 mt-2 rounded-md border border-gray/20"
                                placeholder="Materiales (separados por coma)"
                            />
                        </div>
                        <div>
                            <label className="font-semibold">Cantidad</label>
                            <input
                                type="number"
                                value={servicesQuantity}
                                onChange={(e) => setServicesQuantity(e.target.value)}
                                className="w-full p-2 mt-2 rounded-md border border-gray/20"
                                placeholder="Cantidad"
                            />
                        </div>
                        <div>
                            <label className="font-semibold">Días</label>
                            <input
                                type="number"
                                value={servicesDays}
                                onChange={(e) => setServicesDays(e.target.value)}
                                className="w-full p-2 mt-2 rounded-md border border-gray/20"
                                placeholder="Días"
                            />
                        </div>
                        <div>
                            <label className="font-semibold">Monto</label>
                            <input
                                type="number"
                                value={servicesAmount}
                                onChange={(e) => setServicesAmount(e.target.value)}
                                className="w-full p-2 mt-2 rounded-md border border-gray/20"
                                placeholder="Monto"
                            />
                        </div>
                        <div>
                            <label className="font-semibold">Moneda</label>
                            <select
                                value={servicesCurrency}
                                onChange={(e) => setServicesCurrency(e.target.value)}
                                className="w-full p-2 mt-2 rounded-md border border-gray/20"
                            >
                                {currencies.map((currency) => (
                                    <option key={currency} value={currency}>
                                        {currency}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button
                        onClick={handleCreateServiceQuotation}
                        className="mt-4 px-4 py-2 bg-green/100 text-white rounded-md hover:bg-green/100"
                    >
                        Agregar Cotización de Servicios
                    </button>
                </div>
            )} */}

            {/* Formulario de Cotización CPH */}
            {selectedQuotationType === 'cph' && (
               <div className="bg-blue/10 p-4 rounded-3xl">
               <h3 className="font-semibold mb-4">Cotización CPH</h3>
               <div className="grid grid-cols-4 gap-4">
                   <div>
                       <label className="font-semibold ml-2">Service</label>
                       <select
                           value={cphRole}
                           onChange={(e) => setCphRole(e.target.value)}
                           className="w-full p-2 mt-2 rounded-3xl focus:outline-blue/20 border border-gray/20"
                           required
                       >
                           <option key="service1" value="service1">Service 1</option>
                        </select>
                   </div>
                   <div>
                       <label className="font-semibold ml-2">Sub Services</label>
                       <select
                           value={cphRole}
                           onChange={(e) => setCphRole(e.target.value)}
                           className="w-full p-2 mt-2 rounded-3xl focus:outline-blue/20 border border-gray/20"
                           required
                       >
                           <option key="service1" value="service1">sub Service 1</option>
                        </select>
                   </div>
                   <div>
                       <label className="font-semibold ml-2">item sub Service</label>
                       <select
                           value={cphRole}
                           onChange={(e) => setCphRole(e.target.value)}
                           className="w-full p-2 mt-2 rounded-3xl focus:outline-blue/20 border border-gray/20"
                           required
                       >
                           <option key="service1" value="service1">item 1</option>
                        </select>
                   </div>
                   <div>
                       <label className="font-semibold ml-2">cph code</label>
                       <select
                           value={cphRole}
                           onChange={(e) => setCphRole(e.target.value)}
                           className="w-full p-2 mt-2 rounded-3xl focus:outline-blue/20 border border-gray/20"
                           required
                       >
                           <option key="service1" value="service1">item 1</option>
                        </select>
                   </div>
                   <div>
                       <label className="font-semibold ml-2">product</label>
                       <select
                           value={cphRole}
                           onChange={(e) => setCphRole(e.target.value)}
                           className="w-full p-2 mt-2 rounded-3xl focus:outline-blue/20 border border-gray/20"
                           required
                       >
                           <option key="service1" value="service1">item 1</option>
                        </select>
                   </div>
                   <div>
                       <label className="font-semibold ml-2">currency</label>
                       <select
                           value={cphRole}
                           onChange={(e) => setCphRole(e.target.value)}
                           className="w-full p-2 mt-2 rounded-3xl focus:outline-blue/20 border border-gray/20"
                           required
                       >
                           <option key="service1" value="service1">item 1</option>
                        </select>
                   </div>
                   <div>
                       <label className="font-semibold ml-2">Horas</label>
                       <input
                           type="number"
                           value={cphHours}
                           onChange={(e) => setCphHours(e.target.value)}
                           className="w-full p-2 mt-2 rounded-3xl focus:outline-blue/20 border border-gray/20"
                           placeholder="Horas"
                       />
                   </div>
                   <div>
                       <label className="font-semibold ml-2">profit</label>
                       <input
                           type="number"
                           value={cphHours}
                           onChange={(e) => setCphHours(e.target.value)}
                           className="w-full p-2 mt-2 rounded-3xl focus:outline-blue/20 border border-gray/20"
                           placeholder="Horas"
                       />
                   </div>
                  
                  
               </div>
               <button
                   onClick={handleCreateCphQuotation}
                   className="mt-4 px-4 py-2 bg-blue/100 text-white rounded-3xl hover:bg-blue/100"
               >
                   Agregar Cotización CPH
               </button>
           </div>
           
            )}

            {/* Lista de Cotizaciones de Servicios */}
            {servicesQuotations.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold mb-4">Cotizaciones de Servicios</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {servicesQuotations.map((quotation, index) => (
                            <div key={index} className="bg-green/10 p-4 rounded-md relative">
                                <button 
                                    onClick={() => handleRemoveServiceQuotation(index)}
                                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs"
                                >
                                    Eliminar
                                </button>
                                <h3 className="font-bold mb-2">Detalle Cotización Servicios #{index + 1}</h3>
                                <p>Materiales: {quotation.materials?.join(', ')}</p>
                                <p>Cantidad: {quotation.quantity}</p>
                                <p>Días: {quotation.days}</p>
                                <p>Monto: {quotation.amount.toFixed(2)} {quotation.currency}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Lista de Cotizaciones CPH */}
            {cphQuotations.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold mb-4">Cotizaciones CPH</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {cphQuotations.map((quotation, index) => (
                            <div key={index} className="bg-blue/10 p-4 rounded-3xl relative">
                                <button 
                                    onClick={() => handleRemoveCphQuotation(index)}
                                    className="absolute top-2 right-2 bg-red/80 text-white px-2 py-1 rounded-3xl text-[7px]"
                                >
                                    Eliminar
                                </button>
                                <h3 className="font-bold mb-2">Detalle Cotización CPH #{index + 1}</h3>
                                <p>Rol: {quotation.role}</p>
                                <p>Horas: {quotation.hours}</p>
                                <p>Ciudad: {quotation.city}</p>
                                <p>Monto: {quotation.amount.toFixed(2)} {quotation.currency}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Total cotización */}
            <div className=" w-3/12 font-semibold mt-4 bg-gray/5 p-4 rounded-3xl">
                <p>Total Cotización: {totalQuotation.toFixed(2)} USD</p>
                <p>Total Cotizaciones de Servicios: {servicesQuotations.length}</p>
                <p>Total Cotizaciones CPH: {cphQuotations.length}</p>
            </div>

            {/* Botón de creación */}
            <button
                onClick={handleCreateQuotation}
                type='button'
                disabled={!isFormValid}
                className={`w-1/12 mt-6 py-2 rounded-2xl ${!isFormValid ? 'bg-gray/10 cursor-not-allowed' : 'bg-green/100 text-white hover:bg-green/100'}`}
            >
                Guardar Proyecto
            </button>
        </div>
    )
}

export default FormProjects