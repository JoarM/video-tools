import Gif from "@/components/gif";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Video to Gif",
    description: "Convert video files to GIFs."
}

export default function Page() {
    return (
        <Gif />
    )
}