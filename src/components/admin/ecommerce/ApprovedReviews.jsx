"use client";

import {useEffect, useState} from "react";
import Link from "next/link";
import {fetchReviews} from "@/services/admin/ReviewService";

const ApprovedReviews = () => {

    const [review, setReviews] = useState([]);

    useEffect(() => {
        fetchReviews().then(r => setReviews(r)).catch(e => console.error(e));
    }, []);


    return (
        <div className="p-2">
            {JSON.stringify(review, null, 2)}
            <h3 className="text-xl font-bold">Approved Reviews</h3>
            {/*<table className="table-auto border-collapse border border-gray-300 w-full">*/}
            {/*    <thead className="bg-gray-100">*/}
            {/*        <th className="border border-gray-300 px-1 py-1 text-left">ID</th>*/}
            {/*        <th className="border border-gray-300 px-1 py-1 text-left">Name</th>*/}
            {/*        <th className="border border-gray-300 px-1 py-1 text-left">Buy Price</th>*/}
            {/*        <th className="border border-gray-300 px-1 py-1 text-left">Sell Price</th>*/}
            {/*        <th className="border border-gray-300 px-1 py-1 text-left">Discount</th>*/}
            {/*        <th className="border border-gray-300 px-1 py-1 text-left">Point</th>*/}
            {/*        <th className="border border-gray-300 px-1 py-1 text-left">Action</th>*/}
            {/*    </thead>*/}
            {/*    <tbody>*/}
            {/*    {review.length > 0 && (*/}
            {/*        review.map((item) => (*/}
            {/*            <tr className="hover:bg-gray-50" key={product.id}>*/}
            {/*                 <td className="border border-gray-300 px-1 py-1">{product.id}</td>*/}
            {/*                 <td className="border border-gray-300 px-1 py-1">{product.name}</td>*/}
            {/*                 <td className="border border-gray-300 px-1 py-1">{product.buyPrice}</td>*/}
            {/*                 <td className="border border-gray-300 px-1 py-1">{product.sellPrice}</td>*/}
            {/*                 <td className="border border-gray-300 px-1 py-1">{product.discount}</td>*/}
            {/*                 <td className="border border-gray-300 px-1 py-1">{product.point} </td>*/}
            {/*                 <td>*/}
            {/*                     <Link className="mx-1 px-2 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600"*/}
            {/*                           href={`/admin/product/edit-product/${product.id}`}*/}
            {/*                     >*/}
            {/*                         Edit*/}
            {/*                     </Link>*/}
            {/*                 </td>*/}
            {/*            </tr>*/}
            {/*        ))*/}
            {/*    )}*/}
            {/*    </tbody>*/}
            {/*</table>*/}
        </div>
    );
};

export default ApprovedReviews;