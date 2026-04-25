"use client";
import React from 'react';

import AddEditSupplier from "@/components/admin/ecommerce/supplier/AddEditSupplier";

const CreateSupplierPage = () => {

    return (
        <div>
            <div className="flex-1 p-6">
                <div className="grid grid-cols-1 gap-2 px-2">
                    <div>
                        <AddEditSupplier />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateSupplierPage;
