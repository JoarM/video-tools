"use client"

import { Button } from "@/components/ui/button";
import { FileInput } from "@/components/ui/file-input";
import { Progress } from "@/components/ui/progress";
import { useFFmpeg } from "@/hooks/ffmpeg"
import { cn } from "@/lib/utils";
import { fetchFile } from "@ffmpeg/util";
import { VideoIcon } from "@radix-ui/react-icons";
import dynamic from "next/dynamic";
import { useState } from "react";

export default dynamic(() => Promise.resolve(Gif), { 
    ssr: false 
})

export function Gif() {
    const [progess, setProgress] = useState(0);
    const { loading, ffmpeg } = useFFmpeg({
        onProgress: setProgress
    });
    const [video, setVideo] = useState<File | null>(null);
    const [fileError, setFileError] = useState("");
    const [gifUrl, setGifUrl] = useState("");
    const [converting, setConverting] = useState(false);

    async function convertToGif() {
        if (!video) {
            return;
        }
        setConverting(true);
        setProgress(0);
        ffmpeg.writeFile(video.name, await fetchFile(video));
        await ffmpeg.exec(['-i', video.name, '-f', 'gif', 'out.gif']);
        const data = (await ffmpeg.readFile("out.gif")) as any;
        const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }));
        setGifUrl(url);
        setConverting(false);
    }

    return (
        <main className="w-full max-w-lg mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold">Video to GIF</h1>
            <FileInput 
            setValue={setVideo}
            setError={setFileError}
            mimeType="video"
            className="mt-4"
            />
            <span className="text-sm font-medium text-destructive">{fileError}</span>
            {video && (
                <span className="flex text-sm font-medium text-muted-foreground items-center mt-2">
                    <VideoIcon 
                    className="size-4 mr-2"
                    />
                    {video.name}
                </span>
            )}
            <div className="flex flex-wrap items-center gap-4 mt-4">
                {converting && (
                    <div className="flex flex-wrap items-center flex-grow gap-2">
                        <Progress value={progess} className="w-4/5" />
                        <span className="text-sm font-medium flex-shrink-0">{Math.round(progess)}%</span>
                    </div>
                )}
                <Button 
                aria-disabled={!video || converting || loading}
                className={cn("ml-auto flex-shrink-0", (!video || loading) ? "bg-muted-foreground" : "")}
                onClick={convertToGif}
                >
                    {!!video ? "Convert to GIF" : "Select video"}
                </Button>
            </div>
            
            {gifUrl && (
                <img src={gifUrl} alt="Created GIF" />
            )}
        </main>
    )
}