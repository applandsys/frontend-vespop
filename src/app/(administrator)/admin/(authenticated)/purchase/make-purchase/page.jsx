"use client";

import React, {useEffect} from 'react';
import MakePurchase from "@/components/admin/ecommerce/purchase/MakePurchase";
import {allProducts} from "@/services/ecommerce/GetProducts";
import {allSupplier} from "@/services/ecommerce/FetchSupplier";
import config from "@/config";
import {getOrders} from "@/services/ecommerce/getOrders";

const MakePurchasePage = () => {

    const [products, setProducts] = React.useState([]);
    const [suppliers, setSuppliers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(()=>{
        allProducts().then(products => { setProducts(products); console.log(products);}).catch(console.error);
        allSupplier().then(supplier => { setSuppliers(supplier); }).catch(console.error);
    },[]);


    return (
        <div>
            <div className="flex-1 p-6">
                <div className="grid grid-cols-1 gap-2 px-2">
                    <div className="col-span-1">
                        <MakePurchase products={products} suppliers={suppliers}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MakePurchasePage;
