"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

export default function NavList() {
    const path = usePathname();

    return (
        <ul className="hidden md:flex items-center gap-4">
            <li>
                <Button asChild variant="link" className="text-foreground aria-[current='page']:underline" aria-current={path === "/gif" ? "page" : "false"}>
                    <Link href="/gif">
                        Video to GIF
                    </Link>
                </Button>
            </li>
            <li>
                <Button asChild variant="link" className="text-foreground aria-[current='page']:underline" aria-current={path === "/video-audio" ? "page" : "false"}>
                    <Link href="/video-audio">
                        Video to Audio
                    </Link>
                </Button>
            </li>
            <li>
                <Button asChild variant="link" className="text-foreground aria-[current='page']:underline" aria-current={path === "/video" ? "page" : "false"}>
                    <Link href="/video">
                        Video converter
                    </Link>
                </Button>
            </li>
            <li>
                <Button asChild variant="link" className="text-foreground aria-[current='page']:underline" aria-current={path === "/audio" ? "page" : "false"}>
                    <Link href="/audio">
                        Audio converter
                    </Link>
                </Button>
            </li>
        </ul>
    )
}
