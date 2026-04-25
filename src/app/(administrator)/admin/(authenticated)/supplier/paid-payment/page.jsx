"use client";

import React, {useEffect, useState} from 'react';
import PaidSupplier from "@/components/admin/ecommerce/supplier/PaidSupplier";
import {fetchSupplierPaid} from "@/services/admin/SupplierPayment";

const PaidPaymentPage = () => {
    const [supplierPaid,setSupplierPaid ] = useState([]);

    useEffect(()=>{
        fetchSupplierPaid().then(res=>{setSupplierPaid(res)}).catch(error=>{console.log(error)});
    });

    return (
        <div>
            <div className="flex-1 p-6">
                <div className="grid grid-cols-1 gap-2 px-2">
                    <div>
                        <PaidSupplier paids={supplierPaid}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaidPaymentPage;
