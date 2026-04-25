"use client";

import Link from "next/link";
import { Grid } from "gridjs-react";
import { html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";

const AllSupplier = ({ supplier = [], handleDelete }) => {

    const supplierList = supplier.map(item => [
        item.id,
        item.name,
        item.logo,
        item.address,
        item.phone,
        item.email,
        item.type,
        html(`
                        <div class="flex gap-1">
                            <a
                                href="/admin/supplier/edit/${item.id}"
                                class="px-2 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600"
                            >
                                Edit
                            </a>
                            <button
                                data-id="${item.id}"
                                class="delete-btn px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    `)
    ])

    return (
        <div className="p-2">
            <h4 className="text-xl font-bold">Supplier List</h4>
            <hr className="mb-3" />
            <Grid
                data={supplierList}
                columns={[
                    { name: "ID", width: "60px" },
                    "Name",
                    "Logo",
                    "Address",
                    "Phone",
                    "Email",
                    "Type",
                    { name: "Action", width: "160px", sort: false }
                ]}
                search={true}
                pagination={{
                    enabled: true,
                    limit: 10
                }}
                sort={true}
                className={{
                    table: "table-auto",
                    th: "text-left text-sm",
                    td: "text-sm"
                }}
                style={{
                    table: {
                        width: "100%"
                    }
                }}
                onReady={() => {
                    document.querySelectorAll(".delete-btn").forEach(btn => {
                        btn.onclick = () => {
                            const id = btn.getAttribute("data-id");
                            handleDelete(id);
                        };
                    });
                }}
            />
        </div>
    );
};

export default AllSupplier;