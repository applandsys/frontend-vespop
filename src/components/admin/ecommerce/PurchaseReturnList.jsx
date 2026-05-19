"use client";

import Link from "next/link";
import { useState } from "react";
import config from "@/config";

const PurchaseReturnList = ({ purchase = [], page, totalPages, onPageChange, loading }) => {
    const [showReturnModal, setShowReturnModal] = useState(false);
    const [returnPurchaseId, setReturnPurchaseId] = useState(null);
    const [returnReason, setReturnReason] = useState("");
    const [submittingReturn, setSubmittingReturn] = useState(false);

    const openReturnModal = (purchaseId) => {
        setReturnPurchaseId(purchaseId);
        setReturnReason("");
        setShowReturnModal(true);
    };

    const submitReturn = async () => {
        if (!returnReason.trim()) {
            alert("Please provide a return reason");
            return;
        }

        try {
            setSubmittingReturn(true);

            await fetch(`${config.apiBaseUrl}/admin/purchase/return`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    purchaseId: returnPurchaseId,
                    reason: returnReason,
                }),
            });

            setShowReturnModal(false);
            setReturnPurchaseId(null);
            setReturnReason("");

            // OPTIONAL: refresh list
            // onPageChange(page);
        } catch (error) {
            console.error(error);
            alert("Failed to submit return");
        } finally {
            setSubmittingReturn(false);
        }
    };

    return (
        <div className="p-2">
            <h4 className="text-md font-bold mb-2">Purchase List</h4>

            <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
                <thead className="bg-gray-100">
                <tr>
                    <th className="border px-2 py-1">ID</th>
                    <th className="border px-2 py-1">Product</th>
                    <th className="border px-2 py-1">Qty</th>
                    <th className="border px-2 py-1">Buy</th>
                    <th className="border px-2 py-1">Sell</th>
                    <th className="border px-2 py-1">Discount</th>
                    <th className="border px-2 py-1">Point</th>
                    <th className="border px-2 py-1">Action</th>
                </tr>
                </thead>

                <tbody>
                {loading ? (
                    <tr>
                        <td colSpan={8} className="text-center py-4">
                            Loading...
                        </td>
                    </tr>
                ) : purchase.length > 0 ? (
                    purchase.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                            <td className="border px-2 py-1">{item.id}</td>
                            <td className="border px-2 py-1">{item.product?.name}</td>
                            <td className="border px-2 py-1">{item.quantity}</td>
                            <td className="border px-2 py-1">{item.buyPrice}</td>
                            <td className="border px-2 py-1">{item.product?.sellPrice}</td>
                            <td className="border px-2 py-1">{item.product?.discount}</td>
                            <td className="border px-2 py-1">{item.product?.point}</td>
                            <td className="border px-2 py-1 flex gap-2">
                                <Link
                                    href={`/admin/product/edit-product/${item.product?.id}`}
                                    className="px-2 py-1 text-xs bg-blue-500 text-white rounded"
                                >
                                    Edit
                                </Link>

                                <button
                                    onClick={() => openReturnModal(item.id)}
                                    className="px-2 py-1 text-xs bg-orange-500 text-white rounded"
                                >
                                    Return
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={8} className="text-center py-4">
                            No purchases found
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-end items-center gap-2 mt-4">
                <button
                    disabled={page === 1}
                    onClick={() => onPageChange(page - 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Prev
                </button>

                <span className="text-sm">
                    Page {page} of {totalPages}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => onPageChange(page + 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {/* RETURN MODAL */}
            {showReturnModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white w-[500px] rounded-xl shadow-xl p-6 relative">
                        <button
                            onClick={() => setShowReturnModal(false)}
                            className="absolute top-3 right-4 text-xl text-gray-400 hover:text-black"
                        >
                            ✕
                        </button>

                        <h3 className="text-lg font-bold mb-4">Return Purchase</h3>

                        <textarea
                            value={returnReason}
                            onChange={(e) => setReturnReason(e.target.value)}
                            rows={4}
                            className="w-full border rounded-lg p-3 text-sm"
                            placeholder="Reason for return"
                        />

                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={() => setShowReturnModal(false)}
                                className="border px-4 py-2 rounded"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={submitReturn}
                                disabled={submittingReturn}
                                className="bg-orange-600 text-white px-4 py-2 rounded disabled:opacity-50"
                            >
                                {submittingReturn ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PurchaseReturnList;