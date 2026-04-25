"use client";

import React, { useState, useEffect } from "react";
import config from "@/config";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const AddEditSupplier = ({ supplierId, fetchSupplier }) => {

    const router = useRouter();

    const [submitting, setSubmitting] = useState(false);
    const [supplierData, setSupplierData] = useState(null);

    const [formData, setFormData] = useState({
        name:  supplierData?.name ?? "",
        address: supplierData?.address ?? "",
        phone: supplierData?.phone ?? "",
        email: supplierData?.email ?? "",
        password: "",
        type: supplierData?.type ?? "",
        logo: supplierData?.logo ?? "",
        note: supplierData?.note ?? "",
        status: "ACTIVE",
    });

    useEffect(() => {
        if (!supplierId) return;

        const fetchSupplierById = async () => {
            try {
                const res = await fetch(
                    `${config.apiBaseUrl}/supplier/${supplierId}`
                );
                const result = await res.json();

                if (result.success) {
                    const data = result.data;

                    setFormData({
                        name: data.name ?? "",
                        address: data.address ?? "",
                        phone: data.phone ?? "",
                        email: data.email ?? "",
                        password: "",
                        type: data.type ?? "",
                        logo: data.logo ?? "",
                        slug: data.slug ?? "",
                        note: data.note ?? "",
                        status: data.status ?? ""
                    });

                    setSupplierData(data);
                }
            } catch (err) {
                console.error("Failed to fetch Supplier", err);
            }
        };

        fetchSupplierById();
    }, [supplierId]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleToggleActive = () => {
        setFormData(prev => ({
            ...prev,
            status: prev.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const method = supplierId ? "PUT" : "POST";
        const url = supplierId
            ? `${config.apiBaseUrl}/supplier/${supplierId}`
            : `${config.apiBaseUrl}/supplier`;

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result?.error || "Request failed");
            }

            toast.success(
                supplierId
                    ? "Supplier updated successfully!"
                    : "Supplier created successfully!"
            );

            if (!supplierId && fetchSupplier) {
                fetchSupplier();
            }

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
                    {supplierId ? "Update Supplier" : "Create Supplier"}
                </h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Supplier Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />

                <input
                    type="text"
                    name="type"
                    placeholder="Supplier Category / Type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />

                <input
                    type="text"
                    name="logo"
                    placeholder="Logo URL"
                    value={formData.logo}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="note"
                    placeholder="Note about Supplier"
                    value={formData.note}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />

                <div className="flex justify-between items-center pt-2">
                    <span className="text-sm font-medium">
                        Active Status
                    </span>

                    <button
                        type="button"
                        onClick={handleToggleActive}
                        className={`relative w-11 h-6 rounded-full ${
                            formData.status === "ACTIVE" ? "bg-green-500" : "bg-gray-300"
                        }`}
                    >
                      <span
                          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                              formData.status === "ACTIVE" ? "translate-x-5" : ""
                          }`}
                      />
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full py-2 rounded text-white ${
                        submitting
                            ? "bg-gray-400"
                            : "bg-blue-600 hover:bg-blue-500"
                    }`}
                >
                    {submitting
                        ? "Submitting..."
                        : supplierId
                            ? "Update Supplier"
                            : "Create Supplier"}
                </button>
            </form>
        </div>
    );
};

export default AddEditSupplier;