"use client";

import React, {useEffect, useState} from 'react';
import {getAllCourier} from "@/services/admin/Courer";
import CourierAddForm from "@/components/admin/ecommerce/CourierAddForm";


const EditCourier = ({ params }) => {

    const { courierId } = params;

    return (
        <div>
            <div className="flex-1 p-6">
                <div className="grid grid-cols-1 gap-2 px-2">
                    <div className="col-span-1">
                        <CourierAddForm courierId={courierId} />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default EditCourier;
