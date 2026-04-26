"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { fetchBannerBySlug } from "@/services/site/BannerData";
import { fetchSettingData } from "@/services/site/SettingData";

export default function Footer() {
    const pathname = usePathname();
    const isAdmin = pathname.includes("admin");

    const [loading, setLoading] = useState(false);
    const [settingData, setSettingData] = useState({});

    useEffect(() => {
        setLoading(true);

        fetchBannerBySlug("footer-promo").catch(() => {});
        fetchSettingData()
            .then((res) => setSettingData(res.data))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="p-4 text-center">Loading...</div>;

    /* ================= ADMIN FOOTER ================= */
    if (isAdmin) {
        return (
            <footer className="container mx-auto mt-12 px-4">
                <hr />
                <div className="py-4 text-center md:text-left text-xs">
                    © 2026 Vespop.com. All rights reserved
                </div>
            </footer>
        );
    }

    /* ================= MAIN FOOTER ================= */
    return (
        <footer className="mt-12 bg-gray-50 px-4 md:px-8">
            {/* Top Section */}
            <div className="max-w-7xl mx-auto py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 text-sm text-gray-700">

                {/* Navigate */}
                <div>
                    <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Navigate
                    </h4>
                    <ul className="space-y-2">
                        <li><Link href="#" className="hover:text-black">Shop</Link></li>
                        <li><Link href="#" className="hover:text-black">About</Link></li>
                        <li><Link href="#" className="hover:text-black">Contact</Link></li>
                        <li><Link href="#" className="hover:text-black">Store Locator</Link></li>
                    </ul>
                </div>

                {/* Social */}
                <div>
                    <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Social
                    </h4>
                    <ul className="space-y-2">
                        <li><Link href="#" className="hover:text-black">Facebook</Link></li>
                        <li><Link href="#" className="hover:text-black">Instagram</Link></li>
                        <li><Link href="#" className="hover:text-black">Tiktok</Link></li>
                    </ul>
                </div>

                {/* My Account */}
                <div>
                    <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        My Account
                    </h4>
                    <ul className="space-y-2">
                        <li><Link href="#" className="hover:text-black">Sign In / Register</Link></li>
                        <li><Link href="#" className="hover:text-black">My Orders</Link></li>
                        <li><Link href="#" className="hover:text-black">Wishlist</Link></li>
                    </ul>
                </div>

                {/* Legal */}
                <div>
                    <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Legal
                    </h4>
                    <ul className="space-y-2">
                        <li><Link href="#" className="hover:text-black">Terms & Conditions</Link></li>
                        <li><Link href="#" className="hover:text-black">Privacy Policy</Link></li>
                        <li><Link href="#" className="hover:text-black">Shipping & Returns</Link></li>
                        <li><Link href="#" className="hover:text-black">Help Center</Link></li>
                    </ul>
                </div>

                {/* Address */}
                <div className="sm:col-span-2 lg:col-span-1">
                    <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Bangladesh
                    </h4>
                    <p className="mb-2">{settingData.address}</p>
                    <p className="mb-2">{settingData.email}</p>
                    <p>{settingData.phone}</p>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t py-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">

                    <div className="text-center md:text-left">
                        © 2026 Vespop.com. All rights reserved.
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-end gap-2">
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
    );
}