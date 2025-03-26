import Heading from '@/src/ui/Heading';
import NoRecords from '@/src/ui/NoRecords';
import { formatCurrency } from '@/src/utils/formatCurrency';
import { Sparkles, X, ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';

interface QuotationResultProps {
    onClose: () => void;
    quotationResults: {
        id: number;
        client: string;
        service: string;
        subService: string;
        item: string;
        product: string;
        role: string;
        cphCode: string;
        roleCPH: number;
        hours: number;
        country: string;
        currency: string;
        baseCost: number;
        profitPercentage: number;
        profit: number;
        totalCost: number;
    }[];
}

export default function QuotationResult({ quotationResults, onClose }: QuotationResultProps) {
    const [expandedQuotations, setExpandedQuotations] = useState<Record<number, boolean>>({});

    // Calculate totals
    const totalBaseCost = quotationResults.reduce((sum, q) => sum + q.baseCost, 0);
    const totalProfit = quotationResults.reduce((sum, q) => sum + q.profit, 0);
    const grandTotal = quotationResults.reduce((sum, q) => sum + q.totalCost, 0);

    // Currency (assume all are the same for simplicity, or implement a conversion mechanism)
    const currency = quotationResults.length > 0 ? quotationResults[0].currency : 'USD';

    // Toggle quotation expansion
    const toggleQuotation = (id: number) => {
        setExpandedQuotations(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <>
            <main className="bg-blue/20 backdrop-blur-sm z-50 fixed top-0 left-0 right-0 w-full flex items-center justify-center h-screen p-4">
                <div className="bg-white w-full max-w-6xl shadow-xl mx-auto p-4 animate-palpito rounded-3xl max-h-[550px] overflow-auto">

                    <section className="flex items-center justify-between mb-6">
                        <Heading>
                            <span className="flex items-center gap-2">
                                <Sparkles size={24} className="text-blue" />
                                Quotation Results
                            </span>
                        </Heading>

                        <button
                            className="flex items-center hover:bg-red/10 transition-all duration-300 text-red p-2 rounded-full"
                            onClick={onClose}
                        >
                            <X />
                        </button>
                    </section>

                    {/* Grand Total Summary (Always visible) */}
                    <div className="mb-8 bg-blue/10 p-6 rounded-3xl shadow-sm">
                        <h3 className="text-xl font-bold text-blue mb-4">Grand Total Summary</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 bg-white rounded-xl shadow-sm">
                                <div className="text-gray-500 text-sm">Total Base Cost</div>
                                <div className="text-xl font-bold">{formatCurrency(totalBaseCost)} {currency}</div>
                            </div>
                            <div className="p-4 bg-white rounded-xl shadow-sm">
                                <div className="text-gray-500 text-sm">Total Profit</div>
                                <div className="text-xl font-bold text-green">{formatCurrency(totalProfit)} {currency}</div>
                            </div>
                            <div className="p-4 bg-white rounded-xl shadow-sm">
                                <div className="text-gray-500 text-sm">Grand Total</div>
                                <div className="text-xl font-bold text-blue">{formatCurrency(grandTotal)} {currency}</div>
                            </div>
                        </div>
                    </div>

                    {/* Individual Quotations */}
                    {quotationResults.length > 0 ? (
                        <div className="space-y-4 max-h-96 overflow-y-auto px-2 pb-6">
                            {quotationResults.map((quotation, index) => (
                                <div key={quotation.id} className="border border-gray/20 rounded-xl overflow-hidden">
                                    {/* Quotation Header - Always visible */}
                                    <div 
                                        className="bg-gray-50 p-4 flex justify-between items-center cursor-pointer"
                                        onClick={() => toggleQuotation(quotation.id)}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="bg-blue text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                                                {index + 1}
                                            </span>
                                            <span className="font-semibold">{quotation.client}</span>
                                            <span className="text-gray-500">|</span>
                                            <span className="text-gray-600">{quotation.service} - {quotation.subService}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="font-bold text-blue">
                                                {formatCurrency(quotation.totalCost)} {quotation.currency}
                                            </span>
                                            {expandedQuotations[quotation.id] ? <ChevronUp /> : <ChevronDown />}
                                        </div>
                                    </div>

                                    {/* Quotation Details - Expandable */}
                                    {expandedQuotations[quotation.id] && (
                                        <div className="p-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                {/* Service Details */}
                                                <div>
                                                    <h3 className="text-lg font-semibold mb-4">Service Details</h3>
                                                    <div className="space-y-3">
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Client:</span>
                                                            <span className="font-medium">{quotation.client}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Service:</span>
                                                            <span className="font-medium">{quotation.service}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Subservice:</span>
                                                            <span className="font-medium">{quotation.subService}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Item:</span>
                                                            <span className="font-medium">{quotation.item}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Product:</span>
                                                            <span className="font-medium">{quotation.product}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Cost Details */}
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Cost Details</h3>
                                                    <div className="space-y-3">
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Job Role:</span>
                                                            <span className="font-medium">{quotation.role}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">CPH Code:</span>
                                                            <span className="font-medium">{quotation.cphCode}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">CPH:</span>
                                                            <span className="font-medium">{formatCurrency(quotation.roleCPH)} {quotation.currency}/hour</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Hours:</span>
                                                            <span className="font-medium">{quotation.hours}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Country:</span>
                                                            <span className="font-medium">{quotation.country}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Individual Financial Summary */}
                                            <div className="mt-6 bg-white p-4 border border-gray/10 rounded-xl shadow-sm">
                                                <h3 className="text-lg font-semibold text-gray-700 mb-4">Financial Summary</h3>
                                                <div className="space-y-4">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-600">Base Cost:</span>
                                                        <span className="font-medium">
                                                            {formatCurrency(quotation.baseCost)} {quotation.currency}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-600">Profit Margin ({quotation.profitPercentage}%):</span>
                                                        <span className="font-medium text-green">
                                                            {formatCurrency(quotation.profit)} {quotation.currency}
                                                        </span>
                                                    </div>
                                                    <div className="h-px bg-gray/10 my-2"></div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="font-semibold">Total:</span>
                                                        <span className="font-bold text-blue">
                                                            {formatCurrency(quotation.totalCost)} {quotation.currency}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12">
                            <NoRecords />
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <button
                            className="flex-1 bg-gray/20 rounded-3xl hover:bg-gray/30  py-3 px-6 font-medium transition-colors duration-200"
                            onClick={onClose}
                        >
                            Close
                        </button>
                        <button
                            className="flex-1 bg-blue rounded-3xl hover:bg-blue/80 text-white py-3 px-6 font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                            onClick={() => {
                                alert("Quotations saved successfully!");
                            }}
                        >
                            Save All Quotations
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
}