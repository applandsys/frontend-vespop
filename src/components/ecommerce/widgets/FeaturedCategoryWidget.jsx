"use client";

import Image from "next/image";
import {getImageUrl} from "../../../utils/R2Resolver";

const FeaturedCategoryWidget = ({category}) => {
    return (
        <div className="relative w-full max-w-md overflow-hidden  group cursor-pointer">
            {/* Image */}
            <Image
                src={getImageUrl(category.image)}
                alt="Panjabi Category"
                width={600}
                height={400}
                className="
          w-full h-full object-cover
          transform transition-transform duration-500 ease-out
          group-hover:scale-95
        "
                priority
            />

            {/* Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-white text-2xl md:text-3xl font-semibold tracking-wide">
                    {category.name}
                </h2>
            </div>
        </div>
    );
};

export default FeaturedCategoryWidget;