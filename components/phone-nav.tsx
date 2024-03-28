"use client"

import { useState } from "react";
import { Button } from "./ui/button";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import ThemeDropdown from "./theme-dropdown";

export default function PhoneNav() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button 
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen(!open)}
            >
                {!open ? (
                    <HamburgerMenuIcon
                    className="size-4"
                    />
                ) : (
                    <Cross1Icon 
                    className="size-4"
                    />
                )}
                <span className="sr-only">Menu toggle</span>
            </Button>
            <div className={cn("fixed top-20 left-0 right-0 bottom-0 bg-background px-6 z-50 border-border border-t py-2", !open && "invisible")}>
                <ul className="divide-y divide-border">
                    <li>
                        <Link 
                        href="/gif" 
                        className="text-lg text-muted-foreground block p-4 hover:bg-accent/50 hover:text-accent-foreground transition-colors"
                        onClick={() => setOpen(false)}
                        >
                            Video to GIF
                        </Link>
                    </li>
                    <li>
                        <Link 
                        href="/video-audio" 
                        className="text-lg text-muted-foreground block p-4 hover:bg-accent/50 hover:text-accent-foreground transition-colors"
                        onClick={() => setOpen(false)}
                        >
                            Video to Audio
                        </Link>
                    </li>
                    <li>
                        <Link 
                        href="/video" 
                        className="text-lg text-muted-foreground block p-4 hover:bg-accent/50 hover:text-accent-foreground transition-colors"
                        onClick={() => setOpen(false)}
                        >
                            Video converter
                        </Link>
                    </li>
                    <li>
                        <Link 
                        href="/audio" 
                        className="text-lg text-muted-foreground block p-4 hover:bg-accent/50 hover:text-accent-foreground transition-colors"
                        onClick={() => setOpen(false)}
                        >
                            Audio converter
                        </Link>
                    </li>
                    <li className="p-4">
                        <ThemeDropdown />
                    </li>
                </ul>
            </div>
        </>
    )
}