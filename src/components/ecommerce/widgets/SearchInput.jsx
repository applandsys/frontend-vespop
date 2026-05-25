"use client";

import React, {useEffect, useState, useRef} from 'react';
import {getCategories} from "@/services/ecommerce/getCategories";
import {useRouter} from "next/navigation";

const SearchInput = () => {
    const router = useRouter();
    const dropdownRef = useRef(null);

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSelectedQuery] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        getCategories().then(res => setCategories(res)).finally()
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleCategorySelect = (slug, name) => {
        setSelectedCategory(slug);
        setIsDropdownOpen(false);
    };

    const handleChangeInput = (e) => {
        setSelectedQuery(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(selectedCategory);
        if(selectedCategory != null){
            router.push(`/category/${selectedCategory}?search=${searchQuery}`);
        } else {
            console.log("mor kisu nai");
        }
    };

    // Get the display name for the selected category
    const getSelectedCategoryName = () => {
        if (selectedCategory === "all") return "All Categories";
        const category = categories.find(cat => cat.slug === selectedCategory);
        return category ? category.name : "All Categories";
    };

    return (
        <>
            <div className="md:flex items-center">
                <div className="mr-4 text-xs">Outlets</div>
                <div className="bg-black items-end">
                    <form onSubmit={handleSubmit} className="flex w-full items-end">
                        <input
                            type="text"
                            name="search"
                            placeholder="Search"
                            onChange={handleChangeInput}
                            className="flex-1 text-sm text-gray-600 bg-black p-1 placeholder-gray-400 outline-none"
                        />
                    </form>
                </div>
            </div>

            {/* Add global styles for scrollbar */}
            <style jsx global>{`
                .category-dropdown-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .category-dropdown-scrollbar::-webkit-scrollbar-track {
                    background: #fafafa;
                    border-radius: 3px;
                }
                .category-dropdown-scrollbar::-webkit-scrollbar-thumb {
                    background: #b8b8b8;
                    border-radius: 3px;
                }
                .category-dropdown-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #dbd9d9;
                }
            `}</style>
        </>
    );
};

export default SearchInput;