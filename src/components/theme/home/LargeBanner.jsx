"use client";

import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import {getImageUrl} from "../../../utils/R2Resolver";
import {fetchBannerBySlug} from "../../../services/site/BannerData";

const PromoCards = () => {

    const [banners, setBannersOne] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBannerBySlug('home-1').then((json) => {
            if (json.success) {
                setBannersOne(json.data);
            }
        }).catch(error => setError(error)
        ).finally(setLoading(false));
    }, []);

    if (loading) return <div className="p-4">Loading ...</div>;


    return (
        <div className="">
            {banners.length && banners.map((banner, index) => (
                <div
                    key={index}
                    className={`bg-[${banner.backgroundColor}]`}
                >
                    <Image
                        src={`${getImageUrl(banner.image)}`}
                        alt={banner.title_text}
                        width={1280}
                        height={800}
                        className="w-full object-contain mx-auto"
                    />
                </div>
            ))}
        </div>

    );
};

export default PromoCards;
