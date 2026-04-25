"use client";

import React, { useState, useEffect } from "react";
import config from "@/config";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";



const CourierAddForm= ({ courierId, fetchCourier }) => {
    const router = useRouter();

    const [submitting, setSubmitting] = useState(false);
    const [courierData, setCourierData] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        url: "",
        api_key: "",
        username: "",
        password: "",
        storeId: "",
        secret_key: "",
        isActive: true,
        status: "active",
    });

    /* ----------------------------------
       FETCH COURIER FOR UPDATE
    ---------------------------------- */
    useEffect(() => {
        if (!courierId) return;

        const fetchCourierById = async () => {
            try {
                const res = await fetch(
                    `${config.apiBaseUrl}/courier/${courierId}`
                );
                const result = await res.json();

                if (result.success) {
                    const data = result.data;

                    setFormData({
                        name: data.name ?? "",
                        url: data.url ?? "",
                        api_key: data.api_key ?? "",
                        username: data.username ?? "",
                        password: "", // keep empty for security
                        storeId: data.storeId ?? "",
                        secret_key: "", // keep empty for security
                        isActive: data.isActive ?? true,
                        status: data.status ?? "active",
                    });

                    setCourierData(data);
                }
            } catch (err) {
                console.error("Failed to fetch courier", err);
            }
        };

        fetchCourierById();
    }, [courierId]);

    /* ----------------------------------
       FORM HANDLERS
    ---------------------------------- */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleToggleActive = () => {
        setFormData((prev) => ({
            ...prev,
            isActive: !prev.isActive,
            status: !prev.isActive ? "active" : "inactive",
        }));
    };

    /* ----------------------------------
       SUBMIT
    ---------------------------------- */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const method = courierId ? "PUT" : "POST";
        const url = courierId
            ? `${config.apiBaseUrl}/courier/update/${courierId}`
            : `${config.apiBaseUrl}/courier`;

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
                courierId
                    ? "Courier updated successfully!"
                    : "Courier created successfully!"
            );

            if (!courierId && fetchCourier) {
                fetchCourier();
            }

            router.push("/admin/api-integration/courier");
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    /* ----------------------------------
       UI
    ---------------------------------- */
    return (
        <div className="max-w-xl mx-auto bg-white p-4 rounded-lg shadow">
            <form onSubmit={handleSubmit} className="space-y-3">
                <h2 className="text-center font-bold text-lg">
                    {courierId ? "Update Courier" : "Create Courier"}
                </h2>

                {/* Name */}
                <input
                    type="text"
                    name="name"
                    placeholder="Courier Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                />

                {/* URL */}
                <input
                    type="text"
                    name="url"
                    placeholder="API URL"
                    value={formData.url}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />

                {/* API KEY */}
                <input
                    type="text"
                    name="api_key"
                    placeholder="API Key"
                    value={formData.api_key}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />

                {/* SECRET KEY */}
                <input
                    type="password"
                    name="secret_key"
                    placeholder="API Secret"
                    value={formData.secret_key}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />

                {/* USERNAME */}
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />

                {/* PASSWORD */}
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />

                {/* STORE ID */}
                <input
                    type="text"
                    name="storeId"
                    placeholder="Store ID"
                    value={formData.storeId}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />

                {/* ACTIVE TOGGLE */}
                <div className="flex justify-between items-center pt-2">
                    <span className="text-sm font-medium">
                        Active Status
                    </span>

                    <button
                        type="button"
                        onClick={handleToggleActive}
                        className={`relative w-11 h-6 rounded-full transition ${
                            formData.isActive
                                ? "bg-green-500"
                                : "bg-gray-300"
                        }`}
                    >
                        <span
                            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                formData.isActive
                                    ? "translate-x-5"
                                    : ""
                            }`}
                        />
                    </button>
                </div>

                {/* SUBMIT */}
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
                        : courierId
                            ? "Update Courier"
                            : "Create Courier"}
                </button>
            </form>
        </div>
    );
};

export default CourierAddForm;