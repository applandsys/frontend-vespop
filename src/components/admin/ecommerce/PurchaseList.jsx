"use client";

import Link from "next/link";

const PurchaseList = ({ purchase, page, totalPages, onPageChange, loading }) => {

    return (
        <div className="p-2">
            <h4 className="text-md font-bold mb-2">Purchase List</h4>

            <table className="table-auto border-collapse border border-gray-300 w-full">
                <thead className="bg-gray-100">
                <tr>
                    <th className="border px-1 py-1">ID</th>
                    <th className="border px-1 py-1">Product</th>
                    <th className="border px-1 py-1">Qty</th>
                    <th className="border px-1 py-1">Buy</th>
                    <th className="border px-1 py-1">Sell</th>
                    <th className="border px-1 py-1">Discount</th>
                    <th className="border px-1 py-1">Point</th>
                    <th className="border px-1 py-1">Action</th>
                </tr>
                </thead>

                <tbody>
                {loading ? (
                    <tr>
                        <td colSpan="8" className="text-center py-4">
                            Loading...
                        </td>
                    </tr>
                ) : purchase.length > 0 ? (
                    purchase.map(item => (
                        <tr key={item.id} className="hover:bg-gray-50">
                            <td className="border px-1 py-1">{item.id}</td>
                            <td className="border px-1 py-1">{item.product.name}</td>
                            <td className="border px-1 py-1">{item.quantity}</td>
                            <td className="border px-1 py-1">{item.buyPrice}</td>
                            <td className="border px-1 py-1">{item.product.sellPrice}</td>
                            <td className="border px-1 py-1">{item.product.discount}</td>
                            <td className="border px-1 py-1">{item.product.point}</td>
                            <td className="border px-1 py-1">
                                <Link
                                    href={`/admin/product/edit-product/${item.product.id}`}
                                    className="px-2 py-1 text-xs bg-blue-500 text-white rounded"
                                >
                                    Edit
                                </Link>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="8" className="text-center py-4">
                            No purchases found
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-end items-center gap-2 mt-4">
                <button
                    disabled={page === 1}
                    onClick={() => onPageChange(page - 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Prev
                </button>

                <span className="text-sm">
                    Page {page} of {totalPages}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => onPageChange(page + 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PurchaseList;