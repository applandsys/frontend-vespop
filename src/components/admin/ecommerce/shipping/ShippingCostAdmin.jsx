"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/shadcn/table";
import ShippingCostForm from "./ShippingCostForm";
import { getShippingCosts } from "@/services/setting/shippingService";

export default function ShippingCostAdmin() {
    const [data, setData] = useState([]);
    const [editId, setEditId] = useState(null);

    const load = async () => {
        const res = await getShippingCosts();
        setData(res.data.data);
        setEditId(null);
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <div className="grid grid-cols-3 gap-4">
            <div>
                <ShippingCostForm editId={editId} onSuccess={load} />
            </div>
            <div className="col-span-2 rounded-2xl border shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Free</TableHead>
                            <TableHead>By Location</TableHead>
                            <TableHead className="text-right">
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.location || "-"}</TableCell>
                                <TableCell>
                                    {row.isFree ? (
                                        <span className="text-green-600 font-medium">
                      FREE
                    </span>
                                    ) : (
                                        `৳${row.price}`
                                    )}
                                </TableCell>
                                <TableCell>
                                    {row.isFree ? "Yes" : "No"}
                                </TableCell>
                                <TableCell>
                                    {row.isByLocation ? "Yes" : "No"}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => setEditId(row.id)}
                                    >
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}