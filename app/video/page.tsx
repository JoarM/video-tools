import Video from "@/components/video";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Video converter",
    description: "Convert video formats."
}

export default function Page() {
    return (
        <Video />
    )
}