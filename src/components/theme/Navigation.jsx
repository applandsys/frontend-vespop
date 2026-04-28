"use client";

import React from 'react';
import BrowseAllCat from "@/components/ecommerce/BrowseAllCat";
import Link from "next/link";

const Navigation = () => {


    return (
        <>
            <nav>
                <div className="flex justify-between items-center w-full">
                    <div className="flex w-full">
                        <BrowseAllCat/>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navigation;