import "./globals.css";
import React from "react";
import ImgSlider from "@/components/ecommerce/ImgSlider";
import ProductList from "@/components/ecommerce/product/ProductList";
import EcommerceFrontLayout from "@/layouts/EcommerceFrontLayout";
import FeaturedCategoryWidgetList from "@/components/ecommerce/product/FeaturedCategoryWidgetList";

export default function Home() {

    return (
        <>
            <EcommerceFrontLayout>
                <ImgSlider/>
                <div className="mt-2 mx-2 md:mx-24">
                    <FeaturedCategoryWidgetList />
                </div>
                <div className=" mx-2 md:mx-24">
                    <ProductList />
                </div>
            </EcommerceFrontLayout>
        </>
    );
}