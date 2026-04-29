'use client';

import React, { useEffect, useState } from 'react';
import { getCategories } from '@/services/ecommerce/getCategories';
import Link from 'next/link';

export default function CategoriesMenu() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then((res) => {
            const parents = res.filter(cat => !cat.parentId);
            const children = res.filter(cat => cat.parentId);

            const structured = parents.map(parent => ({
                ...parent,
                children: children.filter(child => child.parentId === parent.id)
            }));

            setCategories(structured);
        });
    }, []);

    return (
        <nav className="bg-black shadow-md">
            <div className="max-w-7xl mx-auto px-4">
                <ul className="flex gap-8 items-center h-14 font-bold">

                    <li className="relative group">
                        <Link href="/"
                              className="text-white font-medium hover:text-green-400 flex items-center gap-1 transition">Home</Link>
                    </li>

                    {categories.map((cat) => (
                        <li key={cat.id} className="relative group">

                            {/* Parent */}
                            <Link
                                href={`/category/${cat.slug}`}
                                className="text-white font-medium hover:text-green-400 flex items-center gap-1 transition"
                            >
                                {cat.name}
                                {cat.children.length > 0 && (
                                    <span className="text-xs">▼</span>
                                )}
                            </Link>

                            {/* Dropdown */}
                            {cat.children.length > 0 && (
                                <div className="absolute left-0 top-full mt-3 hidden group-hover:block bg-black border border-gray-800 rounded-md shadow-xl min-w-[180px] z-50">
                                    <ul className="py-2">
                                        {cat.children.map((child) => (
                                            <li key={child.id}>
                                                <Link
                                                    href={`/category/${child.slug}`}
                                                    className="block px-4 py-2 text-gray-300 hover:bg-gray-900 hover:text-green-400 transition"
                                                >
                                                    {child.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                        </li>
                    ))}

                </ul>
            </div>
        </nav>
    );
}