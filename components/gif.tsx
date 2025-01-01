"use client"

import { Button } from "@/components/ui/button";
import { FileInput } from "@/components/ui/file-input";
import { Progress } from "@/components/ui/progress";
import { useFFmpeg } from "@/hooks/ffmpeg"
import { cn } from "@/lib/utils";
import { fetchFile } from "@ffmpeg/util";
import { DownloadIcon, VideoIcon } from "@radix-ui/react-icons";
import { ChangeEvent, useState } from "react";
import { Input } from "./ui/input";

export default function Gif() {
    const [progess, setProgress] = useState(0);
    const { loading, ffmpeg } = useFFmpeg({
        onProgress: setProgress
    });
    const [video, setVideo] = useState<File | null>(null);
    const [fileError, setFileError] = useState("");
    const [formatError, setFormatError] = useState("");
    const [conversionError, setConversionError] = useState("");
    const [gifUrl, setGifUrl] = useState("");
    const [converting, setConverting] = useState(false);
    const [width, setWidth] = useState("480");

    async function convertToGif() {
        if (!ffmpeg) return;
        if (!video) {
            return;
        }
        if (!width) {
            setFormatError("Enter a width.")
            return
        }
        setProgress(0);
        setConverting(true);
        setConversionError("");
        setFormatError("");
        ffmpeg.current.writeFile(video.name, await fetchFile(video));
        try {
            const res = await ffmpeg.current.exec(['-i', video.name, "-vf", `scale=${width}:-1:flags=lanczos`, '-f', 'gif', 'out.gif']);
            if (res) {
                setConverting(false);
                setConversionError("An error occured");
                return
            }
            const data = (await ffmpeg.current.readFile("out.gif")) as any;
            const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }));
            setGifUrl(url);
            setConverting(false);
        } catch (e) {
            setConverting(false);
            setConversionError("An error occured");
        }
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        if (/^\d+$/.test(e.target.value) || e.target.value === "") {
            return setWidth(e.target.value);
        }
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
            {fileError && <span className="text-sm font-medium text-destructive">{fileError}</span>}
            {video && (
                <span className="flex text-sm font-medium text-muted-foreground items-center mt-2 flex-wrap gap-2">
                    <VideoIcon 
                    className="size-4 mr-2"
                    />
                    {video.name}
                    <div className="ml-auto relative">
                        <Input 
                        placeholder="width"
                        className="w-32"
                        pattern="[0-9]*"
                        inputMode="numeric"
                        value={width}
                        onChange={handleChange}
                        />
                        <span className="text-sm text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2">px</span>
                    </div>
                </span>
            )}
            {formatError && <span className="text-sm font-medium text-destructive">{formatError}</span>}
            <div className="flex flex-wrap items-center gap-4 mt-4">
                {converting && (
                    <div className="flex flex-wrap items-center flex-grow gap-2">
                        <Progress value={progess * 100} className="w-4/5" />
                        <span className="text-sm font-medium flex-shrink-0">{Math.round(progess * 100)}%</span>
                    </div>
                )}
                <Button 
                aria-disabled={!video || converting || loading}
                className={cn("ml-auto flex-shrink-0", (!video || loading) ? "aria-disabled:bg-muted-foreground/50" : "")}
                onClick={convertToGif}
                >
                    {!!video ? "Convert to GIF" : "Select video"}
                </Button>
            </div>
            {conversionError && <span className="text-sm font-medium text-destructive">{conversionError}</span>}

            {gifUrl && (
                <div className="mt-4 flex flex-col">
                    <img src={gifUrl} alt="Created GIF" className="rounded-xl" />
                    <Button asChild className="mt-3 ml-auto">
                        <a href={gifUrl} download={true}>
                            <DownloadIcon
                            className="mr-2 size-4"
                            />
                            Download
                        </a>
                    </Button>
                </div>
            )}
        </main>
    )
}