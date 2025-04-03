"use client"

import { RoleType } from '@/types/rolesType';
import { ItemSubServiceType, ServiceType, SubServiceType } from '@/types/servicesType';
import React, { useState } from 'react'

// Interfaces
interface Client {
    id: number;
    name: string;
    email: string;
}

interface FormProjectsProps {
    services: ServiceType[];
    roles: RoleType[];
}

const FormProjects: React.FC<FormProjectsProps> = ({ services, roles }) => {
    // Estados para la gestión de información básica del proyecto
    const [selectedClient, setSelectedClient] = useState<Client | null>(null)
    const [clientSearchTerm, setClientSearchTerm] = useState('')

    const [projectNumber, setProjectNumber] = useState('')
    const [projectName, setProjectName] = useState('')

    // Estado para el tipo de cotización
    const [selectedQuotationType, setSelectedQuotationType] = useState<'services' | 'cph' | null>(null)

    // Estados para la selección dinámica de servicios
    const [selectedService, setSelectedService] = useState<ServiceType | null>(null)
    const [selectedSubservice, setSelectedSubservice] = useState<SubServiceType | null>(null)
    const [selectedSubserviceItem, setSelectedSubserviceItem] = useState<ItemSubServiceType | null>(null)

    // Lista de clientes de ejemplo
    const clients = [
        { id: 1, name: "John Doe", email: "john.doe@example.com" },
        { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
        { id: 3, name: "Acme Corp.", email: "contact@acmecorp.com" },
    ];

    // Filtrar clientes
    const filteredClients = clients.filter(
        (client) =>
            client.name.toLowerCase().includes(clientSearchTerm.toLowerCase()) ||
            client.email.toLowerCase().includes(clientSearchTerm.toLowerCase())
    );

    const filteredRoles = roles
    .filter(
        (role) =>
            role.jobRole.toLowerCase().includes(clientSearchTerm.toLowerCase()) ||
            role.cphCode.toLowerCase().includes(clientSearchTerm.toLowerCase())
    )
    .map(role => ({
        id: role.id,
        jobRole: role.jobRole
    }));

console.log('roles filtrados', filteredRoles);
    // Manejador para crear la cotización
    const handleCreateQuotation = () => {
        if (!selectedClient || !projectNumber || !projectName) {
            alert('Por favor complete todos los campos')
            return
        }

        console.log('Proyecto', {
            cliente: selectedClient,
            numeroProyecto: projectNumber,
            nombreProyecto: projectName,
            servicio: selectedService,
            subservicio: selectedSubservice,
            itemSubservicio: selectedSubserviceItem
        })
    }

    return (
        <div className="space-y-6">
            {/* Project Number and Name Section */}
            <div className="flex items-center justify-start gap-5 flex-wrap">
                <div>
                    <h2 className="font-semibold mb-1 ml-2">Número de Proyecto</h2>
                    <input
                        type="text"
                        value={projectNumber}
                        onChange={(e) => setProjectNumber(e.target.value)}
                        className="w-56 p-2 rounded-3xl border border-gray/20 focus:outline-none bg-transparent"
                        placeholder="Ingrese número de proyecto"
                    />
                </div>

                <div>
                    <h2 className="font-semibold mb-1 ml-2">Nombre de Proyecto</h2>
                    <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="w-56 p-2 rounded-3xl focus:outline-none bg-transparent border border-gray/20"
                        placeholder="Ingrese nombre de proyecto"
                    />
                </div>

                {/* Client Selection Section */}
                <div className="relative">
                    <h2 className="font-semibold mb-1 ml-2">Cliente</h2>
                    <input
                        type="text"
                        value={selectedClient ? `${selectedClient.name}` : clientSearchTerm}
                        onChange={(e) => {
                            setClientSearchTerm(e.target.value)
                            if (selectedClient) setSelectedClient(null)
                        }}
                        className="w-64 p-2 rounded-3xl border border-gray/20 focus:outline-blue/20 bg-transparent"
                        placeholder="Buscar cliente por nombre o email"
                    />
                    {clientSearchTerm && (
                        <ul className="absolute z-10 bg-white border border-gray/20 rounded-3xl mt-1 w-full">
                            {filteredClients.map((client) => (
                                <li
                                    key={client.id}
                                    onClick={() => {
                                        setSelectedClient(client)
                                        setClientSearchTerm('')
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

            {/* Quotation Type Selection */}
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

            {/* Services Quotation Form */}
            {selectedQuotationType === 'services' && (
                <div className="bg-green/10 p-4 rounded-3xl">
                    <h3 className="text-lg font-semibold mb-4">Cotización de Servicios</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="font-semibold">Materiales</label>
                            <input
                                type="text"
                                className="w-full p-2 mt-2 rounded-md border border-gray/20"
                                placeholder="Materiales (separados por coma)"
                            />
                        </div>
                        <div>
                            <label className="font-semibold">Cantidad</label>
                            <input
                                type="number"
                                className="w-full p-2 mt-2 rounded-md border border-gray/20"
                                placeholder="Cantidad"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* CPH Quotation Form */}
            {selectedQuotationType === 'cph' && (
                <div className="bg-blue/10 p-4 rounded-3xl">
                    <h3 className="font-semibold mb-4">Cotización CPH</h3>
                    <div className="grid grid-cols-4 gap-4">
                        {/* Servicio Selección */}
                        <div>
                            <label className="font-semibold">Servicio</label>
                            <select
                                value={selectedService?.id || ''}
                                onChange={(e) => {
                                    const service = services.find(s => s.id === Number(e.target.value)) || null
                                    setSelectedService(service)
                                    setSelectedSubservice(null)
                                    setSelectedSubserviceItem(null)
                                }}
                                className="w-full p-2 mt-2 rounded-3xl border border-gray/20"
                            >
                                <option value="">Seleccionar Servicio</option>
                                {services.map((service) => (
                                    <option key={service.id} value={service.id}>
                                        {service.nameService}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Subservicio Selección */}
                        <div>
                            <label className="font-semibold">Sub Servicio</label>
                            <select
                                value={selectedSubservice?.id || ''}
                                onChange={(e) => {
                                    const subservice = selectedService?.subServices.find(
                                        s => s.id === Number(e.target.value)
                                    ) || null
                                    setSelectedSubservice(subservice)
                                    setSelectedSubserviceItem(null)
                                }}
                                disabled={!selectedService}
                                className="w-full p-2 mt-2 rounded-3xl border border-gray/20"
                            >
                                <option value="">Seleccionar Subservicio</option>
                                {selectedService?.subServices.map((subservice) => (
                                    <option key={subservice.id} value={subservice.id}>
                                        {subservice.nameSubService}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Item Sub Servicio Selección */}
                        <div>
                            <label className="font-semibold">Item Sub Servicio</label>
                            <select
                                value={selectedSubserviceItem?.id || ''}
                                onChange={(e) => {
                                    const item = selectedSubservice?.itemSubServices.find(
                                        i => i.id === Number(e.target.value)
                                    ) || null
                                    setSelectedSubserviceItem(item)
                                }}
                                disabled={!selectedSubservice}
                                className="w-full p-2 mt-2 rounded-3xl border border-gray/20"
                            >
                                <option value="">Seleccionar Item Sub Servicio</option>
                                {selectedSubservice?.itemSubServices.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.nameItemSubService}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* selecion de jobrole */}
                        <div>
                            <label className="font-semibold">job Role</label>
                            <select
                                value={selectedSubserviceItem?.id || ''}
                                onChange={(e) => {
                                    const item = selectedSubservice?.itemSubServices.find(
                                        i => i.id === Number(e.target.value)
                                    ) || null
                                    setSelectedSubserviceItem(item)
                                }}
                                disabled={!selectedSubservice}
                                className="w-full p-2 mt-2 rounded-3xl border border-gray/20"
                            >
                                <option value="">Seleccionar Item Sub Servicio</option>
                                {selectedSubservice?.itemSubServices.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.nameItemSubService}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {/* Save Project Button */}
            <button
                onClick={handleCreateQuotation}
                type="button"
                className="w-1/12 mt-6 py-2 rounded-2xl bg-green/100 text-white hover:bg-green/100"
            >
                Guardar Proyecto
            </button>
        </div>
    )
}

export default FormProjects;
