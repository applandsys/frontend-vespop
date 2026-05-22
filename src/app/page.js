import "./globals.css";
import React from "react";
import ImgSlider from "@/components/ecommerce/ImgSlider";
import EcommerceFrontLayout from "@/layouts/EcommerceFrontLayout";
import FeaturedCategoryWidgetList from "@/components/ecommerce/product/FeaturedCategoryWidgetList";
import NewArrival from "@/components/ecommerce/product/NewArrival";
import LargeBanner from "@/components/theme/home/LargeBanner";

export default function Home() {

    return (
        <>
            <EcommerceFrontLayout>
                <ImgSlider/>
                <div className="mt-2 mx-2 md:mx-24">
                    <FeaturedCategoryWidgetList />
                </div>
                <div className=" mx-2 md:mx-24 my-4">
                    <div className="w-full py-10">
                        <div className="flex items-center justify-center gap-6">
                            <span className="h-px w-32  xs:w-16 bg-black"></span>
                            <h2 className="text-sm text-center font-semibold tracking-widest uppercase">
                                New Arrivals
                            </h2>
                            <span className="h-px w-32 xs:w-16  bg-black"></span>
                        </div>
                        <div className="mt-3 flex justify-center">
                            <a
                                href="#"
                                className="text-sm text-gray-700 underline underline-offset-4 hover:text-black"
                            >
                                View All
                            </a>
                        </div>
                    </div>
                    <NewArrival />
                </div>
                <div>
                    <LargeBanner />
                </div>
            </EcommerceFrontLayout>
        </>
    );
}