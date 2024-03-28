import Audio from "@/components/audio"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Audio converter",
    description: "Convert audio files."
}

export default function Page() {
    return (
        <Audio />
    )
}