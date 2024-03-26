import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
    return (
        <main className="w-full max-w-3xl mx-auto px-6 py-12">
            <h1 className="text-center text-4xl font-bold">Video tools</h1>
            <p className="text-center text-lg max-w-lg mx-auto mt-3">
                This is a set of tools for converting video and audio. 
                It runs in the browser but utilizes your hardware to get the best of both worlds.
                Native app performance without needing to download anything.{" "}
                <Link href="https://joar.vercel.app" target="_blank" className="underline underline-offset-4">Read more here!</Link>
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
                <Link href="/gif" className="group outline-none">
                    <Card className="hover:border-foreground hover:bg-accent/50 group-focus-visible:border-foreground group-focus-visible:bg-accent/50 transition-colors ease-linear">
                        <CardHeader>
                            <CardTitle className="flex gap-2 items-end">Video to GIF</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Convert videos to GIFs</p>
                        </CardContent>
                    </Card>
                </Link>
                <Link href="/video-audio" className="group outline-none">
                    <Card className="hover:border-foreground hover:bg-accent/50 group-focus-visible:border-foreground group-focus-visible:bg-accent/50 transition-colors ease-linear">
                        <CardHeader>
                            <CardTitle className="flex gap-2 items-end">Video to Audio</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Extract audio from video</p>
                        </CardContent>
                    </Card>
                </Link>
                <Link href="/video" className="group outline-none">
                    <Card className="hover:border-foreground hover:bg-accent/50 group-focus-visible:border-foreground group-focus-visible:bg-accent/50 transition-colors ease-linear">
                        <CardHeader>
                            <CardTitle className="flex gap-2 items-end">Video converter</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Convert video formats</p>
                        </CardContent>
                    </Card>
                </Link>
                <Link href="/audio" className="group outline-none">
                    <Card className="hover:border-foreground hover:bg-accent/50 group-focus-visible:border-foreground group-focus-visible:bg-accent/50 transition-colors ease-linear">
                        <CardHeader>
                            <CardTitle className="flex gap-2 items-end">Audio converter</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Convert audio formats</p>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </main>
    );
}
