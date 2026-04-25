"use client";

import React, { useState, useEffect } from "react";
import config from "@/config";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Select from "react-select";

const MakeSupplierPaymentForm = ({suppliers = []}) => {

    const router = useRouter();

    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        supplierId: null,
        amount: 0,
        type: 'manual',
        typeSourceId: null,
        status: 'paid',
        method: 'unknown',
        particular: ''
    });

    const supplierOptions = suppliers.map(s => ({
        value: s.id,
        label: s.name,
    }));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await fetch(`${config.apiBaseUrl}/supplier/payment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result?.error || "Request failed");
            }

            toast.success('Supplier Payment successfully!');

            router.push("/admin/supplier/list");
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-4 rounded-lg shadow">
            <form onSubmit={handleSubmit} className="space-y-3">
                <h2 className="text-center font-bold text-lg">
                    Make Supplier Payment
                </h2>
                <div>
                    <label className="block text-sm font-medium mb-1">Supplier</label>
                    <Select
                        options={supplierOptions}
                        value={formData.supplierId}
                        onChange={(selected) =>
                            setFormData(prev => ({
                                ...prev,
                                supplierId: selected.value,
                            }))
                        }
                        placeholder="Search supplier..."
                        isClearable
                    />
                </div>
                <input
                    type="text"
                    name="amount"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />
                <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full py-2 rounded text-white ${
                        submitting
                            ? "bg-gray-400"
                            : "bg-blue-600 hover:bg-blue-500"
                    }`}
                >
                    Pay
                </button>
            </form>
        </div>
    );
};

export default MakeSupplierPaymentForm;