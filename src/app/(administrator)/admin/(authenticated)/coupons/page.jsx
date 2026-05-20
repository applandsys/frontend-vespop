"use client";

import { useEffect, useState } from "react";
import config from "@/config";

export default function AdminCouponsPage() {
    const [coupons, setCoupons] = useState([]);

    const fetchCoupons = async () => {
        const res = await fetch(`${config.apiBaseUrl}/coupon`);
        const data = await res.json();
        setCoupons(data?.data || []);
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
                {/*<CouponForm onSuccess={fetchCoupons} />*/}
            </div>

            <div className="lg:col-span-2">
                {/*<CouponList coupons={coupons} />*/}
            </div>
        </div>
    );
}