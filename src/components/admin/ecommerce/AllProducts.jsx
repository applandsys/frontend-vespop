"use client";

import { useEffect, useState } from "react";
import { Grid } from "gridjs-react";
import { html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import "@/styles/gridjs-shadcn.css";

import { getAllProducts } from "@/services/admin/getAllProducts";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/shadcn/card";

const AllProducts = () => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        getAllProducts().then((products) => {
            setRows(
                products.map((p) => [
                    p.id,
                    p.name,
                    p.slug,
                    p.buyPrice,
                    p.sellPrice,
                    `${p.discount}%`,
                    p.discountPrice,
                    p.point,
                    p.visibility,
                ])
            );
        });
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Product List</CardTitle>
            </CardHeader>

            <CardContent>
                <Grid
                    data={rows}
                    search
                    sort
                    pagination={{ limit: 10 }}
                    columns={[
                        "ID",
                        "Name",
                        "Slug",
                        "Buy Price",
                        "Sell Price",
                        "Discount",
                        "Discount Price",
                        "Point",
                        {
                            name: "Status",
                            formatter: (cell) =>
                                html(`
                  <span class="
                    inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium
                    ${cell === "published" ? "bg-green-600 text-white" : "bg-gray-300 text-gray-800"}
                  ">
                    ${cell}
                  </span>
                `),
                        },
                        {
                            name: "Action",
                            sort: false,
                            formatter: (_, row) =>
                                html(`
                  <a
                    href="/admin/product/edit-product/${row.cells[0].data}"
                    class="inline-flex items-center rounded-md bg-blue-600 px-2 py-1 text-xs font-medium text-white hover:bg-blue-700"
                  >
                    Edit
                  </a>
                `),
                        },
                    ]}
                />
            </CardContent>
        </Card>
    );
};

export default AllProducts;