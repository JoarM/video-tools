"use client"

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";

export default function ThemeSwitcher({
    className,
}: {
    className?: string;
}) {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <menu aria-labelledby="theme-picker" className={cn("rounded-full grid grid-flow-col p-1 border border-border", className)}>
            <p className="sr-only" id="theme-picker">Theme picker</p>
            <Skeleton 
            loading={!mounted}
            className="rounded-full"
            >
                <input type="radio" className="sr-only peer/dark" id="dark" name="theme-picker" checked={theme === "dark"} onChange={() => setTheme("dark")} />
                <label 
                htmlFor="dark"
                className="w-8 h-8 rounded-full inline-flex items-center justify-center text-foreground/50 hover:text-foreground/80 transition-colors peer-checked/dark:bg-foreground/5 peer-checked/dark:text-foreground/70 peer-focus-visible/dark:outline-none peer-focus-visible/dark:ring-1 peer-focus-visible/dark:ring-ring"
                >
                    <MoonIcon className="w-4 h-4"/>
                    <span className="sr-only">Dark theme</span>
                </label>
            </Skeleton>
            <Skeleton 
            loading={!mounted}
            className="rounded-full box-border"
            >
                <input type="radio" className="sr-only peer/light" id="light" name="theme-picker" checked={theme === "light"} onChange={() => setTheme("light")} />
                <label 
                htmlFor="light"
                className="w-8 h-8 rounded-full inline-flex items-center justify-center text-foreground/50 hover:text-foreground/80 transition-colors peer-checked/light:bg-foreground/5 peer-checked/light:text-foreground/70 peer-focus-visible/light:outline-none peer-focus-visible/light:ring-1 peer-focus-visible/light:ring-ring"
                >
                    <SunIcon className="w-4 h-4"/>
                    <span className="sr-only">Light theme</span>
                </label>
            </Skeleton>
            <Skeleton 
            loading={!mounted}
            className="rounded-full"
            >
                <input type="radio" className="sr-only peer/system" id="system" name="theme-picker" checked={theme === "system"} onChange={() => setTheme("system")} />
                <label 
                htmlFor="system"
                className="w-8 h-8 rounded-full inline-flex items-center justify-center text-foreground/50 hover:text-foreground/80 transition-colors peer-checked/system:bg-foreground/5 peer-checked/system:text-foreground/70 peer-focus-visible/system:outline-none peer-focus-visible/system:ring-1 peer-focus-visible/system:ring-ring"
                >
                    <DesktopIcon className="w-4 h-4"/>
                    <span className="sr-only">System theme</span>
                </label>
            </Skeleton>
        </menu>
    )
}