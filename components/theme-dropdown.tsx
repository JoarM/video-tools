"use client"

import { useState, useEffect } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useTheme } from "next-themes";

export default function ThemeDropdown() {
    const { setTheme, theme } = useTheme();

    const [mounted, setMounted] = useState(false);

    
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <span>Loading...</span>
        )
    }

    return (
        <Select value={theme} onValueChange={(e) => setTheme(e)}>
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}