"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/shadcn/select";
import config from "@/config";
import {getNavigation} from "@/services/navigation/NavigationService";


export default function NavigationForm({
                                           initialData,
                                           onSubmit,
                                       }) {
    const [parents, setParents] = useState([]);
    const [form, setForm] = useState({
        label: "",
        slug: "",
        url: "",
        position: "header",
        parentId: "",
        icon: "",
        cssClasses: "",
        textColor: "",
        type: "page",
    });

    useEffect(() => {
        if (initialData) setForm({ ...initialData });
        getNavigation().then((res)=>setParents(res.data.data || [])).catch((err) => console.error(err));
    }, [initialData]);

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({
            ...form,
            parentId: form.parentId || null,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            {/* Label */}
            <div>
                <Label>Menu Label</Label>
                <Input
                    value={form.label}
                    onChange={(e) => handleChange("label", e.target.value)}
                    required
                />
            </div>

            {/* Slug */}
            <div>
                <Label>Slug</Label>
                <Input
                    value={form.slug}
                    onChange={(e) => handleChange("slug", e.target.value)}
                    required
                />
            </div>

            {/* URL */}
            <div>
                <Label>URL</Label>
                <Input
                    value={form.url}
                    onChange={(e) => handleChange("url", e.target.value)}
                    required
                />
            </div>

            {/* Position */}
            <div>
                <Label>Position</Label>
                <Select
                    value={form.position}
                    onValueChange={(v) => handleChange("position", v)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="header">Header</SelectItem>
                        <SelectItem value="footer">Footer</SelectItem>
                        <SelectItem value="sidebar">Sidebar</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Parent Menu */}
            <div>
                <Label>Parent Menu (Optional)</Label>
                <Select
                    value={form.parentId || ""}
                    onValueChange={(v) => handleChange("parentId", v)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="No parent (Top level)" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="">Top Level</SelectItem>
                        {parents.length && parents.map((item) => (
                            <SelectItem key={item.id} value={String(item.id)}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Type */}
            <div>
                <Label>Type</Label>
                <Select
                    value={form.type}
                    onValueChange={(v) => handleChange("type", v)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="page">Page</SelectItem>
                        <SelectItem value="category">Category</SelectItem>
                        <SelectItem value="external">External</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Icon */}
            <div>
                <Label>Icon (optional)</Label>
                <Input
                    value={form.icon}
                    onChange={(e) => handleChange("icon", e.target.value)}
                />
            </div>

            {/* CSS Classes */}
            <div>
                <Label>CSS Classes</Label>
                <Input
                    value={form.cssClasses}
                    onChange={(e) => handleChange("cssClasses", e.target.value)}
                />
            </div>

            {/* Text Color */}
            <div>
                <Label>Text Color</Label>
                <Input
                    placeholder="e.g. text-red-500"
                    value={form.textColor}
                    onChange={(e) => handleChange("textColor", e.target.value)}
                />
            </div>

            <Button type="submit" className="w-full">
                Save Navigation
            </Button>
        </form>
    );
}