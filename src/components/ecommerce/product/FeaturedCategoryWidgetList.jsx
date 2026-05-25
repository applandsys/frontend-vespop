"use client";

import React, {useEffect, useState} from 'react';
import {getFeaturedCategories} from "../../../services/ecommerce/getCategories";
import FeaturedCategoryWidget from "../widgets/FeaturedCategoryWidget";

const FeaturedCategoryWidgetList = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getFeaturedCategories().then(res=>setCategories(res)).catch(console.error);
    }, []);

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {
                categories.length && categories.map(category => (
                        <>
                            <div className="text-white p-3  text-center">
                                <FeaturedCategoryWidget category={category} key={category.id} />
                            </div>
                        </>
                    )
                )
            }
        </div>
    );
};

export default FeaturedCategoryWidgetList;