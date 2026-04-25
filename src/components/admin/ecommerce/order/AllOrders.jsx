"use client";

import { useEffect, useState } from "react";
import { Grid } from "gridjs-react";
import { html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";

import { getOrders } from "@/services/ecommerce/getOrders";
import config from "@/config";
import {useRouter} from "next/navigation";

const AllOrders = ({type=null}) => {

    const router = useRouter();

    const [orders, setOrders] = useState([]);
    const [fraudResult, setFraudResult] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loadingFraud, setLoadingFraud] = useState(false);


    const getStatusBadge = (status) => {
        const map = {
            paid: "bg-green-500",
            shipped: "bg-blue-500",
            cancel: "bg-red-500",
            return: "bg-orange-500",
            delivered: "bg-gray-600"
        };
        const color = map[status] || "bg-gray-400";
        return `<span class="${color} text-white text-xs px-2 py-1 rounded-md capitalize">${status}</span>`;
    };


    useEffect(() => {
        getOrders(type)
            .then(r => setOrders(r.data))
            .catch(console.error);
    }, []);

    useEffect(() => {
        const handler = (e) => {
            const btn = e.target.closest("button");
            if (btn && btn.classList.contains("fraud-check-btn")) {
                handleCheckFraud(btn.dataset.id);
            }
            if (btn && btn.classList.contains("courier-btn")) {
                handleCourierRedirect(btn.dataset.id);
            }
            const select = e.target.closest(".status-select");
            if (select) {
                const orderId = select.dataset.id;
                const status = select.value;
                if (!status) return;
                handleChangeStatus(orderId, status);
            }
        };

        document.addEventListener("change", handler);
        document.addEventListener("click", handler);

        return () => {
            document.removeEventListener("change", handler);
            document.removeEventListener("click", handler);
        };
    }, []);

    const handleCourierRedirect = (orderId) => {
        router.push(`/admin/order/courier-delivery?orderId=${orderId}`);
    };

    const handleChangeStatus = async (orderId, status) => {
        await fetch(`${config.apiBaseUrl}/admin/order/update-status`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId, status }),
        });

        getOrders(type).then(r => setOrders(r.data));
    };

    const handleCheckFraud = async (phone) => {
        try {
            setLoadingFraud(true);
            setShowModal(true);
            const res = await fetch(`${config.apiBaseUrl}/third-party/fraud-check`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone }),
            });
            const data = await res.json();
            setFraudResult(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingFraud(false);
        }
    };


    const data = orders.map((order, index) => [
        index + 1,
        order.customer?.uid ?? "",
        order.customer?.phone ?? "",
        `${order.customer?.first_name ?? ""} ${order.customer?.last_name ?? ""}`,
        `BDT ${order.totalAmount}`,
        html(getStatusBadge(order.status)),
        html(`
            <div class="flex gap-2 items-center text-xs">
            
            <select class="status-select border rounded px-2 py-1" data-id="${order.id}">
            <option value="">Change Status</option>
            <option value="paid" ${order.status==="paid"?"selected":""}>Paid</option>
            <option value="shipped" ${order.status==="shipped"?"selected":""}>Shipped</option>
            <option value="cancel" ${order.status==="cancel"?"selected":""}>Cancel</option>
            <option value="return" ${order.status==="return"?"selected":""}>Return</option>
            <option value="delivered" ${order.status==="delivered"?"selected":""}>Delivered</option>
            </select>

            <button 
                class="detail-btn bg-yellow-500 px-2 py-1 text-white rounded"
                data-id="${order.id}">
                Detail
            </button>
            <button 
                class="fraud-check-btn bg-indigo-600 px-2 py-1 text-white rounded"
                data-id="${order.customer?.phone}">
                Fraud
            </button>
            <button 
                class="courier-btn bg-green-600 px-2 py-1 text-white rounded"
                data-id="${order.id}">
             Courier
            </button>
        </div>
        `)
    ]);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Order List</h2>
            <Grid
                columns={[
                    { name: "SL", width: "60px" },
                    { name: "Customer Id", width: "100px" },
                    { name: "Phone", width: "100px" },
                    { name: "Name", width: "180px" },
                    { name: "Payment", width: "60px" },
                    { name: "Status", width: "60px" },
                    {
                        name: "Action",
                        width: "350px"   // 👈 Increase this as needed
                    },
                ]}
                data={data}
                search
                sort
                pagination={{ limit: 10 }}
            />

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white w-[650px] rounded-xl shadow-2xl p-6 relative animate-fadeIn">
                        <button onClick={() => setShowModal(false)} className="absolute top-3 right-4 text-gray-400 hover:text-black text-xl">✕</button>
                        <h3 className="text-xl font-bold mb-4">Fraud Check Result</h3>
                        {loadingFraud ? (
                            <div className="text-center py-12 text-gray-500">
                                Checking fraud history...
                            </div>
                        ) : fraudResult ? (
                            (() => {
                                const cancelRate =
                                    fraudResult.total_parcels > 0
                                        ? ((fraudResult.total_cancel / fraudResult.total_parcels) * 100).toFixed(1)
                                        : 0;
                                let riskLabel = "Low Risk";
                                let riskColor = "bg-green-100 text-green-700";

                                if (cancelRate >= 50) {
                                    riskLabel = "High Risk";
                                    riskColor = "bg-red-100 text-red-700";
                                } else if (cancelRate >= 20) {
                                    riskLabel = "Medium Risk";
                                    riskColor = "bg-yellow-100 text-yellow-700";
                                }
                                return (
                                    <div className="space-y-5">
                                        <div className="border rounded-lg p-4 bg-gray-50 space-y-2">
                                            <div className="flex justify-between items-center">
                                                <p className="font-medium">
                                                    Mobile: {fraudResult.mobile_number}
                                                </p>
                                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${riskColor}`}>
                                                    {riskLabel}
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                                                <div>
                                                    <p className="text-gray-500">Total Parcels</p>
                                                    <p className="font-semibold">{fraudResult.total_parcels}</p>
                                                </div>
                                                <div>
                                                    <p className="text-green-600">Delivered</p>
                                                    <p className="font-semibold">{fraudResult.total_delivered}</p>
                                                </div>
                                                <div>
                                                    <p className="text-red-600">Cancelled</p>
                                                    <p className="font-semibold">{fraudResult.total_cancel}</p>
                                                </div>
                                            </div>
                                            <div className="mt-2 text-sm">
                                                Cancellation Rate: <strong>{cancelRate}%</strong>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-3">Courier Breakdown</h4>
                                            <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2">
                                                {Object.values(fraudResult.apis).map((api, index) => (
                                                    <div
                                                        key={index}
                                                        className="border rounded-lg p-3 bg-white shadow-sm"
                                                    >
                                                        <div className="flex justify-between">
                                                            <p className="font-medium">
                                                                {api.courier_name}
                                                            </p>
                                                            <p className="text-sm text-gray-500">
                                                                Total: {api.total_parcels}
                                                            </p>
                                                        </div>
                                                        <div className="flex gap-4 mt-2 text-sm">
                                                            <span className="text-green-600">
                                                                Delivered: {api.total_delivered_parcels}
                                                            </span>
                                                            <span className="text-red-600">
                                                                Cancelled: {api.total_cancelled_parcels}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })()
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                No fraud history found.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllOrders;
