"use client";

import React, {useEffect, useState} from 'react';
import {getNavigation} from "../../services/navigation/NavigationService";

function BrowseAllCat() {
    return null;
}

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