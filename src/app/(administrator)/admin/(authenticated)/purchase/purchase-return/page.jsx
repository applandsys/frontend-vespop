"use client";

import React from 'react';
import PurchaseReturnList from "@/components/admin/ecommerce/PurchaseReturnList.jsx";

const PurchaseReturnPage = () => {
    return (
        <div>
            <div className="flex-1 p-6">
                <div className="grid grid-cols-1 gap-2 px-2">
                    <div>
                        <PurchaseReturnList/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchaseReturnPage;
