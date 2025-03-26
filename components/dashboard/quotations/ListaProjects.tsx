"use client"

import React, { useState, } from "react";
import Heading from "@/src/ui/Heading";
import { Plus } from "lucide-react";
import { RoleType } from "@/types/rolesType";
import { ItemSubServiceType, ServiceType, SubServiceType } from "@/types/servicesType";
import QuotationResult from "./QuotationResult";
import { ModalState } from "@/types/modalTypes";

// Tipos de moneda y tasas de cambio (respecto al USD)
const currencies = [
    { code: "USD", name: "Dólar estadounidense", rate: 1 },
    { code: "COP", name: "Peso colombiano", rate: 4200 },
    { code: "MXN", name: "Peso mexicano", rate: 19.5 },
    { code: "EUR", name: "Euro", rate: 0.92 },
    { code: "GBP", name: "Libra esterlina", rate: 0.78 },
];

// Datos simulados con relaciones (basados en tu esquema de base de datos)
const mockClients = [
    { id: 1, fullName: "Universidad Distrital" },
    { id: 2, fullName: "Universidad Nacional" },
    { id: 3, fullName: "Empresa XYZ" },
    { id: 4, fullName: "Corporación ABC" },
];

const mockProducts = [
    { id: 1, productBrand: "R&S" },
    { id: 2, productBrand: "SEC" },
    { id: 3, productBrand: "OPT" },
    { id: 4, productBrand: "ITC" },
];

interface ListaProjectsProps {
    roles: RoleType[];
    services: ServiceType[];
}

interface QuotationResultType {
    id?: number;
    baseCost: number;
    profit: number;
    totalCost: number;
    client: string;
    service: string;
    subService: string;
    item: string;
    hours: number;
    role: string;
    roleCPH: number;
    cphCode: string;
    country: string;
    product: string;
    currency: string;
    profitPercentage: number;
    conversionRate: number;
}

interface QuotationFormState {
    client: string;
    service: string;
    subService: string;
    item: string;
    hours: number;
    role: string;
    product: string;
    currency: string;
    profitPercentage: number;
}

export default function ListaProjects({ roles, services }: ListaProjectsProps) {
    const [modalState, setModalState] = useState<ModalState>({ type: 'none' });
    const [quotations, setQuotations] = useState<number[]>([]);
    const [quotationForms, setQuotationForms] = useState<Record<number, QuotationFormState>>({});
    const [conversionRates, setConversionRates] = useState<Record<number, number>>({});
    const [selectedCountries, setSelectedCountries] = useState<Record<number, string>>({});
    const [filteredSubServices, setFilteredSubServices] = useState<Record<number, SubServiceType[]>>({});
    const [filteredItems, setFilteredItems] = useState<Record<number, ItemSubServiceType[]>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [quotationResults, setQuotationResults] = useState<QuotationResultType[]>([]);
    const [activeQuotationId, setActiveQuotationId] = useState<number | null>(null);

    // Functions for modal management
    const openDetailModal = () => setModalState({ type: 'detail' });
    const closeModal = () => setModalState({ type: 'none' });

    // Add new quotation
    const addNewQuotation = () => {
        const newId = Date.now();
        setQuotations([...quotations, newId]);
        setActiveQuotationId(newId);
        
        // Initialize form state for this quotation
        setQuotationForms(prev => ({
            ...prev,
            [newId]: {
                client: "",
                service: "",
                subService: "",
                item: "",
                hours: 0,
                role: "",
                product: "",
                currency: "",
                profitPercentage: 0
            }
        }));
        
        // Initialize other state for this quotation
        setConversionRates(prev => ({ ...prev, [newId]: 1 }));
        setSelectedCountries(prev => ({ ...prev, [newId]: "" }));
        setFilteredSubServices(prev => ({ ...prev, [newId]: [] }));
        setFilteredItems(prev => ({ ...prev, [newId]: [] }));
    };

    // Remove quotation
    const removeQuotation = (id: number) => {
        setQuotations(quotations.filter(quotationId => quotationId !== id));
        
        // Remove quotation from results if it exists
        setQuotationResults(prev => prev.filter(result => result.id !== id));
        
        // Remove form state for this quotation
        const updatedForms = { ...quotationForms };
        delete updatedForms[id];
        setQuotationForms(updatedForms);
        
        // Remove other state for this quotation
        const updatedRates = { ...conversionRates };
        delete updatedRates[id];
        setConversionRates(updatedRates);
        
        const updatedCountries = { ...selectedCountries };
        delete updatedCountries[id];
        setSelectedCountries(updatedCountries);
        
        const updatedSubServices = { ...filteredSubServices };
        delete updatedSubServices[id];
        setFilteredSubServices(updatedSubServices);
        
        const updatedItems = { ...filteredItems };
        delete updatedItems[id];
        setFilteredItems(updatedItems);
        
        if (activeQuotationId === id) {
            setActiveQuotationId(null);
        }
    };

    // Handle input change for a specific quotation
    const handleInputChange = (quotationId: number, field: keyof QuotationFormState, value: string | number) => {
        setQuotationForms(prev => ({
            ...prev,
            [quotationId]: {
                ...prev[quotationId],
                [field]: value
            }
        }));
        
        // Handle specific field changes
        if (field === 'currency') {
            const currency = currencies.find(c => c.code === value);
            if (currency) {
                setConversionRates(prev => ({ ...prev, [quotationId]: currency.rate }));
            }
        } else if (field === 'role') {
            const role = roles.find(r => r.id === parseInt(value as string));
            if (role) {
                // Update currency and country
                setQuotationForms(prev => ({
                    ...prev,
                    [quotationId]: {
                        ...prev[quotationId],
                        currency: role.currency
                    }
                }));
                setSelectedCountries(prev => ({ ...prev, [quotationId]: role.country }));
                
                // Update conversion rate based on role's currency
                const currency = currencies.find(c => c.code === role.currency);
                if (currency) {
                    setConversionRates(prev => ({ ...prev, [quotationId]: currency.rate }));
                }
            }
        } else if (field === 'service') {
            const service = services.find(s => s.id === parseInt(value as string));
            if (service && service.subServices) {
                setFilteredSubServices(prev => ({ ...prev, [quotationId]: service.subServices }));
            } else {
                setFilteredSubServices(prev => ({ ...prev, [quotationId]: [] }));
            }
            
            // Reset subService and item
            setQuotationForms(prev => ({
                ...prev,
                [quotationId]: {
                    ...prev[quotationId],
                    subService: "",
                    item: ""
                }
            }));
            setFilteredItems(prev => ({ ...prev, [quotationId]: [] }));
        } else if (field === 'subService') {
            const subService = filteredSubServices[quotationId]?.find(s => s.id === parseInt(value as string));
            if (subService && subService.itemSubServices) {
                setFilteredItems(prev => ({ ...prev, [quotationId]: subService.itemSubServices }));
            } else {
                setFilteredItems(prev => ({ ...prev, [quotationId]: [] }));
            }
            
            // Reset item
            setQuotationForms(prev => ({
                ...prev,
                [quotationId]: {
                    ...prev[quotationId],
                    item: ""
                }
            }));
        }
    };

    // Helper functions to get names from IDs
    const getClientName = (id: string) => {
        const client = mockClients.find((c) => c.id === parseInt(id));
        return client ? client.fullName : "";
    };

    const getServiceName = (id: string) => {
        const service = services.find((s) => s.id === parseInt(id));
        return service ? service.nameService : "";
    };

    const getSubServiceName = (id: string, quotationId: number) => {
        const subService = filteredSubServices[quotationId]?.find((s) => s.id === parseInt(id));
        return subService ? subService.nameSubService : "";
    };

    const getItemName = (id: string, quotationId: number) => {
        const item = filteredItems[quotationId]?.find((i) => i.id === parseInt(id));
        return item ? item.nameItemSubService : "";
    };

    const getRoleName = (id: string) => {
        const role = roles.find((r) => r.id === parseInt(id));
        return role ? role.jobRole : "";
    };

    const getRoleCPH = (id: string) => {
        const role = roles.find((r) => r.id === parseInt(id));
        return role ? role.cph : 0;
    };

    const getRoleCPHCode = (id: string) => {
        const role = roles.find((r) => r.id === parseInt(id));
        return role ? role.cphCode : "";
    };

    const getProductName = (id: string) => {
        const product = mockProducts.find((p) => p.id === parseInt(id));
        return product ? `${product.productBrand}` : "";
    };

    // Validate a single quotation form
    const validateQuotationForm = (form: QuotationFormState): boolean => {
        return (
            !!form.client && 
            !!form.service && 
            !!form.subService && 
            !!form.item && 
            !!form.role && 
            !!form.currency && 
            form.hours > 0 && 
            form.profitPercentage >= 0
        );
    };

    // Calculate all quotations
    const calculateAllQuotations = () => {
        if (quotations.length === 0) {
            alert("No hay cotizaciones para calcular.");
            return;
        }

        setIsLoading(true);
        
        // Calculate each quotation
        const newResults: QuotationResultType[] = [];
        
        quotations.forEach(quotationId => {
            const form = quotationForms[quotationId];
            
            // Validate form
            if (!validateQuotationForm(form)) {
                return; // Skip invalid forms
            }
            
            // Calculate costs
            const CPH = getRoleCPH(form.role);
            const rate = conversionRates[quotationId] || 1;
            const convertedCPH = CPH * rate;
            const baseCost = form.hours * convertedCPH;
            const profit = baseCost * (form.profitPercentage / 100);
            const totalCost = baseCost + profit;
            
            // Create result
            newResults.push({
                id: quotationId,
                baseCost,
                profit,
                totalCost,
                client: getClientName(form.client),
                service: getServiceName(form.service),
                subService: getSubServiceName(form.subService, quotationId),
                item: getItemName(form.item, quotationId),
                hours: form.hours,
                role: getRoleName(form.role),
                roleCPH: convertedCPH,
                cphCode: getRoleCPHCode(form.role),
                country: selectedCountries[quotationId] || "",
                product: getProductName(form.product),
                currency: form.currency,
                profitPercentage: form.profitPercentage,
                conversionRate: rate,
            });
        });
        
        // Update results
        setTimeout(() => {
            setQuotationResults(newResults);
            setIsLoading(false);
            openDetailModal();
        }, 500);
    };

    return (
        <>
            <main className="relative">
                {/* Header section */}
                <section className="flex items-center justify-between">
                    <Heading>Quotations</Heading>

                    <div className="flex items-center gap-4">
                        <button
                            className="flex items-center text-left bg-blue rounded-3xl hover:bg-blue/80 transition-all duration-300 ease-out text-white py-2 px-4"
                            onClick={calculateAllQuotations}
                        >
                            <Plus />
                            Calcular
                        </button>
                        <button
                            className="flex items-center bg-blue rounded-3xl hover:bg-blue/80 transition-all duration-300 ease-out text-white py-2 px-4"
                            onClick={addNewQuotation}
                        >
                            <Plus />
                            New Quote
                        </button>
                    </div>
                </section>

                {/* Quotations section */}
                <section className="space-y-6 mt-6">
                    {quotations.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            There are no quotes yet. Click on &quot;New Quote&quot; to add one.
                        </div>
                    )}

                    {quotations.map((quotationId) => (
                        <div key={quotationId} className="border border-gray/20 rounded-3xl p-4 relative">
                            <div className="flex justify-between items-center">
                                <h3 className="text-sm font-medium text-gray-500 mb-4 border border-gray/10 py-1 px-2 rounded-3xl">
                                    Quotation # {quotations.indexOf(quotationId) + 1}
                                </h3>
                                <button
                                    onClick={() => removeQuotation(quotationId)}
                                    className="py-1 px-2 rounded-3xl border text-red text-xs hover:scale-[1.02] transition-all duration-300 ease-out"
                                >
                                    Remove Quotation
                                </button>
                            </div>

                            <div className="relative w-full max-w-8xl mx-auto overflow-x-auto pb-4">
                                <div className="flex flex-nowrap gap-4 min-w-max items-end">
                                    {/* Client */}
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-sm font-medium" htmlFor={`client-${quotationId}`}>Client</label>
                                        <select
                                            id={`client-${quotationId}`}
                                            value={quotationForms[quotationId]?.client || ""}
                                            onChange={(e) => handleInputChange(quotationId, 'client', e.target.value)}
                                            className="w-auto rounded-3xl border border-gray/20 py-2 focus:border-blue focus:ring-1 focus:ring-blue focus:outline-none"
                                        >
                                            <option value="">Select a client</option>
                                            {mockClients.map((client) => (
                                                <option key={client.id} value={client.id}>{client.fullName}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Service */}
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-sm font-medium" htmlFor={`service-${quotationId}`}>Service</label>
                                        <select
                                            id={`service-${quotationId}`}
                                            value={quotationForms[quotationId]?.service || ""}
                                            onChange={(e) => handleInputChange(quotationId, 'service', e.target.value)}
                                            className="w-auto rounded-3xl border border-gray/20 py-2 focus:border-blue focus:ring-1 focus:ring-blue focus:outline-none"
                                        >
                                            <option value="">Select a service</option>
                                            {services.map((service) => (
                                                <option key={service.id} value={service.id}>{service.nameService}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Subservice */}
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-sm font-medium" htmlFor={`subService-${quotationId}`}>Sub Service</label>
                                        <select
                                            id={`subService-${quotationId}`}
                                            value={quotationForms[quotationId]?.subService || ""}
                                            onChange={(e) => handleInputChange(quotationId, 'subService', e.target.value)}
                                            disabled={!quotationForms[quotationId]?.service}
                                            className="w-auto rounded-3xl border border-gray/20 py-2 focus:border-blue focus:ring-1 focus:ring-blue focus:outline-none"
                                        >
                                            <option value="">
                                                {quotationForms[quotationId]?.service ? "Select a subservice" : "First select a service"}
                                            </option>
                                            {filteredSubServices[quotationId]?.map((subService) => (
                                                <option key={subService.id} value={subService.id}>{subService.nameSubService}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Subservice Item */}
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-sm font-medium" htmlFor={`item-${quotationId}`}>Sub Service Item</label>
                                        <select
                                            id={`item-${quotationId}`}
                                            value={quotationForms[quotationId]?.item || ""}
                                            onChange={(e) => handleInputChange(quotationId, 'item', e.target.value)}
                                            disabled={!quotationForms[quotationId]?.subService}
                                            className="w-auto rounded-3xl border border-gray/20 py-2 focus:border-blue focus:ring-1 focus:ring-blue focus:outline-none"
                                        >
                                            <option value="">
                                                {quotationForms[quotationId]?.subService ? "Select an item" : "First select a subservice"}
                                            </option>
                                            {filteredItems[quotationId]?.map((item) => (
                                                <option key={item.id} value={item.id}>{item.nameItemSubService}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Hours */}
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-sm font-medium" htmlFor={`hours-${quotationId}`}>Hours</label>
                                        <div className="flex items-center space-x-2">
                                            <input
                                                id={`hours-${quotationId}`}
                                                type="number"
                                                value={quotationForms[quotationId]?.hours || ""}
                                                onChange={(e) => handleInputChange(quotationId, 'hours', Number(e.target.value))}
                                                className="w-16 rounded-full border border-gray/10 focus:border-blue focus:ring-1 focus:ring-blue focus:outline-none py-2 px-3"
                                            />
                                        </div>
                                    </div>

                                    {/* Role */}
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-sm font-medium" htmlFor={`role-${quotationId}`}>Cph Code</label>
                                        <select
                                            id={`role-${quotationId}`}
                                            value={quotationForms[quotationId]?.role || ""}
                                            onChange={(e) => handleInputChange(quotationId, 'role', e.target.value)}
                                            className="w-auto rounded-3xl border border-gray/20 py-2 focus:border-blue focus:ring-1 focus:ring-blue focus:outline-none"
                                        >
                                            <option value="">Select a role</option>
                                            {roles.map((role) => (
                                                <option key={role.id} value={role.id}>
                                                    {role.cphCode} (CPH: {role.cph.toLocaleString('en-ES')})
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Product */}
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-sm font-medium" htmlFor={`product-${quotationId}`}>Product</label>
                                        <select
                                            id={`product-${quotationId}`}
                                            value={quotationForms[quotationId]?.product || ""}
                                            onChange={(e) => handleInputChange(quotationId, 'product', e.target.value)}
                                            className="w-auto rounded-3xl border border-gray/20 py-2 focus:border-blue focus:ring-1 focus:ring-blue focus:outline-none"
                                        >
                                            <option value="">Select a product</option>
                                            {mockProducts.map((product) => (
                                                <option key={product.id} value={product.id}>
                                                    {product.productBrand}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Currency Selector */}
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-sm font-medium" htmlFor={`currency-${quotationId}`}>Currency</label>
                                        <select
                                            id={`currency-${quotationId}`}
                                            value={quotationForms[quotationId]?.currency || ""}
                                            onChange={(e) => handleInputChange(quotationId, 'currency', e.target.value)}
                                            className="w-auto rounded-3xl border border-gray/20 py-2 focus:border-blue focus:ring-1 focus:ring-blue focus:outline-none"
                                        >
                                            <option value="">Select currency</option>
                                            {currencies.map((currency) => (
                                                <option key={currency.code} value={currency.code}>
                                                    {currency.code} - {currency.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Profit Percentage */}
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-sm font-medium" htmlFor={`profitPercentage-${quotationId}`}>Profit Percentage (%)</label>
                                        <div className="flex items-center space-x-2">
                                            <input
                                                id={`profitPercentage-${quotationId}`}
                                                type="number"
                                                value={quotationForms[quotationId]?.profitPercentage || ""}
                                                onChange={(e) => handleInputChange(quotationId, 'profitPercentage', Number(e.target.value))}
                                                className="w-16 rounded-full border border-gray/10 focus:border-blue focus:ring-1 focus:ring-blue focus:outline-none py-2 px-3"
                                            />
                                            <span className="font-bold text-green">%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </main>

            {/* Modal with results */}
            {modalState.type === 'detail' && (
                <QuotationResult
                    quotationResults={quotationResults}
                    onClose={closeModal}
                />
            )}
            
            {/* Loading overlay */}
            {isLoading && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg">
                        <p className="text-lg font-medium">Calculando cotizaciones...</p>
                    </div>
                </div>
            )}
        </>
    );
}