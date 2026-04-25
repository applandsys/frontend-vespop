"use client";

import React, { useEffect, useState } from "react";
import PurchaseList from "@/components/admin/ecommerce/PurchaseList";
import { fetchPurchase } from "@/services/admin/PurchaseService";

const PurchaseListPage = () => {

    const [purchase, setPurchase] = useState([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const loadData = async () => {
        setLoading(true);
        try {
            const res = await fetchPurchase(page, limit);
            setPurchase(res.purchase.data);
            setTotalPages(res.purchase.meta.totalPages);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [page]);

    return (
        <div className="flex-1 p-6">
            <PurchaseList
                purchase={purchase}
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
                loading={loading}
            />
        </div>
    );
};

export default PurchaseListPage;