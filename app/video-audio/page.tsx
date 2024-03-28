import VideoAudio from "@/components/video-audio";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Video to Audio",
    description: "Convert video files to audio files."
}

export default function Page() {
    return ( 
        <VideoAudio />
    )
}