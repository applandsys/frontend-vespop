"use client";

import Link from "next/link";
import Image from "next/image";
import config from '@/config';
import {usePathname} from "next/navigation";
import React, {useEffect, useState} from "react";
import {fetchBannerBySlug} from "@/services/site/BannerData";
import {fetchSettingData} from "@/services/site/SettingData";

export default function Footer (){
    const pathname = usePathname();
    const hasWord = pathname.includes('admin');

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [banners, setBanners] = useState([]);
    const [siteLogo, setSiteLogo] = useState('logo.png');
    const [settingData, setSettingData] = useState([]);


    useEffect(() => {
        setLoading(true);
        fetchBannerBySlug("footer-promo")
            .then((json) => {
                if (json.success) setBanners(json.data);
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
        fetchSettingData().then((setting) => {
            setSiteLogo(setting.data.logo)
            setSettingData(setting.data)
        }).catch((error) => {});

    }, []);

    if (loading) return <div className="p-4">Loading Data ...</div>;

    return (
        <>
            {hasWord ?  (
                <footer className="container mx-auto mt-12">
                    <hr/>
                    <div className="container flex flex-col md:flex-row justify-between bottom-footer mt-4">
                        <div className="py-4 text-center md:text-left">
                            <div className="text-xs">© 2026 Vespop.com. All rights reserved </div>
                        </div>
                    </div>
                </footer>
            ) : (
                <footer className="mx-auto mt-12 px-4 md:px-8">
                    <div className="grid grid-cols-2 gap-4 my-4">
                        <div className="text-left">
                            <div className=" mx-auto px-4 py-12">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-700">

                                    {/* Navigate */}
                                    <div>
                                        <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Navigate
                                        </h4>
                                        <ul className="space-y-2">
                                            <li><a href="#" className="hover:text-black">Shop</a></li>
                                            <li><a href="#" className="hover:text-black">About</a></li>
                                            <li><a href="#" className="hover:text-black">Contact</a></li>
                                            <li><a href="#" className="hover:text-black">Store Locator</a></li>
                                        </ul>
                                    </div>

                                    {/* Social */}
                                    <div>
                                        <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Social
                                        </h4>
                                        <ul className="space-y-2">
                                            <li><a href="#" className="hover:text-black">Facebook</a></li>
                                            <li><a href="#" className="hover:text-black">Instagram</a></li>
                                            <li><a href="#" className="hover:text-black">Tiktok</a></li>
                                        </ul>
                                    </div>

                                    {/* My Account */}
                                    <div>
                                        <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            My Account
                                        </h4>
                                        <ul className="space-y-2">
                                            <li><a href="#" className="hover:text-black">Sign In / Register</a></li>
                                            <li><a href="#" className="hover:text-black">My Orders</a></li>
                                            <li><a href="#" className="hover:text-black">Wishlist</a></li>
                                        </ul>
                                    </div>

                                    {/* Legal */}
                                    <div>
                                        <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Legal
                                        </h4>
                                        <ul className="space-y-2">
                                            <li><a href="#" className="hover:text-black">Terms & Conditions</a></li>
                                            <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
                                            <li><a href="#" className="hover:text-black">Shipping & Returns</a></li>
                                            <li><a href="#" className="hover:text-black">Help Center</a></li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            {/* Legal */}
                            <div>
                                <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Bangladesh
                                </h4>

                                <div>
                                    {settingData.address}
                                </div>
                                <div>
                                    {settingData.email}
                                </div>
                                <div>
                                    {settingData.phone}
                                </div>
                            </div>

                        </div>
                    </div>


                    <div className="grid grid-cols-3 gap-4 my-4">
                        <div className="text-left col-span-1">
                            © 2026 Vespop.com. All rights reserved.
                        </div>
                        <div className="text-right col-span-2">
                            <div className="flex justify-end items-center gap-1 flex-wrap">
                                {Array.from({ length: 22 }, (_, i) => (
                                    <Image
                                        key={i}
                                        src={`/images/icons/icon${i + 1}.svg`}
                                        alt={`Footer icon ${i + 1}`}
                                        width={28}
                                        height={28}
                                        className="hover:opacity-80 transition"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </footer>
            )}
        </>
    )
};