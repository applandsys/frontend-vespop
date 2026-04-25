"use client";

import React, {useEffect, useState} from 'react';
import ProductCategoryForm from "@/components/admin/ecommerce/ProductCategoryForm";
import {fetchCategoriesByType} from "@/services/ecommerce/GetCategory";
import CategoryListMain from "@/components/ecommerce/admin/product/CategoryListMain";

const MainCategory = () => {

    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        fetchCategoriesByType('main').then(res=>{
            setCategoryList(res);
        }).catch(err=>console.log(err));
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="md:col-span-1  p-2">
                    <ProductCategoryForm fetchCategories={fetchCategories} categoryList={categoryList}/>
                </div>
                <div className="md:col-span-3 p-2">
                    <CategoryListMain categoryList={categoryList}/>
                </div>
            </div>
        </>
    );
};

export default MainCategory;