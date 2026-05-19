"use client";

import { useState, useEffect } from "react";
import NavigationList from "@/components/admin/navigation/NavigationList";
import config from "@/config";
import WidgetSettingForm from "@/components/admin/navigation/WidgetSettingForm";
import WidgetList from "@/components/admin/widget/WidgetList";

export default function WidgetSettingPage() {
    const [editItem, setEditItem] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const handleSuccess = () => {
        setEditItem(null);
        setRefresh(!refresh);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 p-6">
            <div className="border rounded-lg p-4 bg-white shadow-sm">
                <h2 className="text-lg font-semibold mb-4">
                    {editItem ? "Edit Navigation" : "Create Navigation"}
                </h2>
                <WidgetSettingForm
                    initialData={editItem}
                    onSubmit={async (formData) => {
                        const url = editItem
                            ? `${config.apiBaseUrl}/widgets/${editItem.id}`
                            : `${config.apiBaseUrl}/widgets`;

                        const method = editItem ? "PUT" : "POST";

                        await fetch(url, {
                            method,
                            body: formData, // ✅ send FormData directly
                        });

                        handleSuccess();
                    }}
                />
            </div>
            <div className="border rounded-lg p-4 bg-white shadow-sm md:col-span-2 lg:col-span-2">
                <h2 className="text-lg font-semibold mb-4">
                    Widgets
                </h2>
                <WidgetList
                    refresh={refresh}
                    onEdit={(item) => setEditItem(item)}
                />
            </div>
        </div>
    );
}