"use client";

import React, {useEffect, useState} from 'react';
import AllSupplier from "@/components/admin/ecommerce/supplier/AllSupplier";
import {getAlSupplier} from "@/services/admin/getAlSupplier";
import config from "@/config";

const SupplierListPage = () => {

    const [supplier, setSupplier] = useState([]);

    useEffect(() => {
        getAlSupplier().then(r => setSupplier(r)).catch(e => console.error(e));
    }, []);


    const handleUpdate = async (req, res) => {
        try {
            const { id } = req.params;
            const data = req.body;

            if (!id) {
                return res.status(400).json({ message: "Supplier ID required" });
            }

            const supplier = await updateSupplierById(id, data);

            return res.status(200).json({
                message: "Supplier updated successfully",
                data: supplier
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

    const handleDelete = async (supplierId) => {
        if (!confirm("Are you sure you want to delete this supplier?")) return;

        try {
            const res = await fetch(
                `${config.apiBaseUrl}/supplier/${supplierId}`,
                { method: "DELETE" }
            );

            const result = await res.json();

            if (!res.ok) throw new Error(result.message);

            setSupplier(prev => prev.filter(s => s.id !== supplierId));
        } catch (e) {
            console.error(e);
            alert("Failed to delete supplier");
        }
    };

    return (
        <div>
            <div className="flex-1 p-6">
                <div className="grid grid-cols-1 gap-2 px-2">
                    <div className="col-span-1">
                        <AllSupplier supplier={supplier} handleDelete={handleDelete} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupplierListPage;
