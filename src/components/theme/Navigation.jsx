"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, ChevronDown } from "lucide-react";
import { getNavigation } from "@/services/navigation/NavigationService";

const Navigation = () => {
    const [navItems, setNavItems] = useState([]);
    const [openId, setOpenId] = useState(null);
    const [openChildId, setOpenChildId] = useState(null);

    useEffect(() => {
        getNavigation()
            .then((res) => setNavItems(res.data))
            .catch(console.error);
    }, []);

    return (
        <nav className="w-full bg-black">
            <div className="flex justify-center items-center h-14">
                <ul className="hidden md:flex space-x-8 text-white relative">
                    {navItems.map((item) => (
                        <li key={item.id} className="relative">
                            {/* Parent Item */}
                            <button
                                onClick={() =>
                                    setOpenId(openId === item.id ? null : item.id)
                                }
                                className="flex items-center gap-1 hover:text-gray-300"
                            >
                                {item.childrens?.length ? (
                                    <>
                                        {item.label}
                                        <ChevronDown size={14} />
                                    </>
                                ) : (
                                    <Link href={item.url}>{item.label}</Link>
                                )}
                            </button>

                            {/* First Dropdown */}
                            {openId === item.id && item.childrens?.length > 0 && (
                                <ul className="absolute top-full left-0 mt-2 w-48 bg-black border border-gray-800 shadow-lg">
                                    {item.childrens.map((child) => (
                                        <li key={child.id} className="relative">
                                            <button
                                                onClick={() =>
                                                    setOpenChildId(
                                                        openChildId === child.id
                                                            ? null
                                                            : child.id
                                                    )
                                                }
                                                className="flex w-full items-center justify-between px-4 py-2 hover:bg-gray-800"
                                            >
                                                <Link href={child.url}>
                                                    {child.label}
                                                </Link>

                                                {child.childrens?.length > 0 && (
                                                    <ChevronRight size={14} />
                                                )}
                                            </button>

                                            {/* Second Dropdown (Right Side) */}
                                            {openChildId === child.id &&
                                                child.childrens?.length > 0 && (
                                                    <ul className="absolute top-0 left-full w-48 bg-black border border-gray-800 shadow-lg">
                                                        {child.childrens.map(
                                                            (sub) => (
                                                                <li key={sub.id}>
                                                                    <Link
                                                                        href={sub.url}
                                                                        className="block px-4 py-2 hover:bg-gray-800"
                                                                    >
                                                                        {sub.label}
                                                                    </Link>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;