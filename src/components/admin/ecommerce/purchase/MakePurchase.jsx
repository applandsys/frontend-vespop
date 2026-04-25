"use client";

import React, { useState } from "react";
import Select from "react-select";
import Input from "@/components/ui/Input";
import config from "@/config";
import {toast} from "react-toastify";

const MakePurchase = ({ products = [], suppliers = [] }) => {

    const [form, setForm] = useState({
        productId: null,
        supplierId: null,
        quantity: "",
        buyPrice: "",
        paidAmount: "",
        dueAmount: "",
    });

    const [loading, setLoading] = useState(false);

    // Convert API data to react-select format
    const productOptions = products.map(p => ({
        value: p.id,
        label: p.name,
        buyPrice: p.buyPrice,
    }));

    const supplierOptions = suppliers.map(s => ({
        value: s.id,
        label: s.name,
    }));

    const isDisabled =
        !form.productId ||
        !form.supplierId ||
        !form.quantity ||
        form.dueAmount < 0;

    const calculateDue = (buyPrice, quantity, paidAmount) => {
        const price = Number(buyPrice) || 0;
        const qty = Number(quantity) || 0;
        const paid = Number(paidAmount) || 0;

        return Math.max(price * qty - paid, 0);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            productId: form.productId?.value,
            supplierId: form.supplierId?.value,
            quantity: Number(form.quantity),
            buyPrice: Number(form.buyPrice),
            paidAmount: Number(form.paidAmount),
            dueAmount: Number(form.dueAmount),
        };

        try {

            setLoading(true);

            const res = await fetch(`${config.apiBaseUrl}/admin/purchase`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Something went wrong");
                return;
            }

            toast.success("Purchase created successfully");

            setForm({
                productId: null,
                supplierId: null,
                quantity: "",
                buyPrice: "",
                paidAmount: "",
                dueAmount: "",
            });

        } catch (err) {
            console.error(err);
            alert("Server error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-4 rounded-lg shadow">
            <h1 className="text-lg font-bold mb-4">Make Purchase</h1>

            <form onSubmit={handleSubmit} className="space-y-3">

                {/* Product Searchable Dropdown */}
                <div>
                    <label className="block text-sm font-medium mb-1">Product</label>
                    <Select
                        options={productOptions}
                        value={form.productId}
                        onChange={(selected) =>
                            setForm(prev => ({
                                ...prev,
                                productId: selected,
                                buyPrice: selected ? selected.buyPrice : "",
                                dueAmount: calculateDue(
                                    selected?.buyPrice,
                                    prev.quantity,
                                    prev.paidAmount
                                ),
                            }))
                        }
                        placeholder="Search product..."
                        isClearable
                    />
                </div>

                {/* Supplier Searchable Dropdown */}
                <div>
                    <label className="block text-sm font-medium mb-1">Supplier</label>
                    <Select
                        options={supplierOptions}
                        value={form.supplierId}
                        onChange={(selected) =>
                            setForm(prev => ({
                                ...prev,
                                supplierId: selected,
                            }))
                        }
                        placeholder="Search supplier..."
                        isClearable
                    />
                </div>

                <Input
                    label="Quantity"
                    type="number"
                    value={form.quantity}
                    onChange={(e) =>
                        setForm(prev => ({
                            ...prev,
                            quantity: e.target.value,
                            dueAmount: calculateDue(
                                prev.buyPrice,
                                e.target.value,
                                prev.paidAmount
                            ),
                        }))
                    }
                    required
                />

                <Input
                    label="Buy Price"
                    type="number"
                    value={form.buyPrice}
                    onChange={e => setForm({ ...form, buyPrice: e.target.value })}
                    required
                />

                <Input
                    label="Paid Amount"
                    type="number"
                    value={form.paidAmount}
                    onChange={(e) =>
                        setForm(prev => ({
                            ...prev,
                            paidAmount: e.target.value,
                            dueAmount: calculateDue(
                                prev.buyPrice,
                                prev.quantity,
                                e.target.value
                            ),
                        }))
                    }
                />

                <Input
                    label="Due Amount"
                    type="number"
                    value={form.dueAmount}
                    onChange={e => setForm({ ...form, dueAmount: e.target.value })}
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    disabled={loading || isDisabled}
                >
                    {loading ? "Saving..." : "Create Purchase"}
                </button>
            </form>
        </div>
    );
};

export default MakePurchase;