"use client"

import { Button } from "@/components/ui/button";
import { FileInput } from "@/components/ui/file-input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFFmpeg } from "@/hooks/ffmpeg"
import { videoFormats } from "@/lib/consts";
import { cn } from "@/lib/utils";
import { fetchFile } from "@ffmpeg/util";
import { DownloadIcon, VideoIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function Video() {
    const [progess, setProgress] = useState(0);
    const { loading, ffmpeg } = useFFmpeg({
        onProgress: setProgress
    });
    const [video, setVideo] = useState<File | null>(null);
    const [fileError, setFileError] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [converting, setConverting] = useState(false);
    const [conversionFormat, setConversionFormat] = useState<undefined | string>(undefined);

    async function convertVideo() {
        if (!ffmpeg) return;
        if (!conversionFormat) {
            setFileError("Please select output format");
            return;
        }
        if (!video) {
            return;
        }
        setConverting(true);
        setProgress(0);
        ffmpeg.writeFile(video.name, await fetchFile(video));
        
        const mimeType = videoFormats.find((format) => format.fileEnding === conversionFormat)?.mimeType;
        if (!mimeType) {
            return;
        }
        try {
            await ffmpeg.exec(['-i', video.name, `out${conversionFormat}`]);
            const data = (await ffmpeg.readFile(`out${conversionFormat}`)) as any;
            const url = URL.createObjectURL(new Blob([data.buffer], { type: mimeType }));
            setVideoUrl(url);
            setConverting(false);
        } catch (e) {
            setConverting(false);
            setFileError("An error occured when trying to convert.");
        }
    }

    return (
        <main className="w-full max-w-lg mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold">Video converter</h1>
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
                    <Select value={conversionFormat} onValueChange={(e) => setConversionFormat(e)}>
                        <SelectTrigger className="w-44 ml-auto">
                            <SelectValue placeholder="Convert to" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {videoFormats.map(({ fileEnding }) => (
                                    <SelectItem value={fileEnding} key={fileEnding}>{fileEnding}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </span>
            )}
            <div className="flex flex-wrap items-center gap-4 mt-4">
                {converting && (
                    <div className="flex flex-wrap items-center flex-grow gap-2">
                        <Progress value={progess * 100} className="w-4/5" />
                        <span className="text-sm font-medium flex-shrink-0">{Math.round(progess * 100)}%</span>
                    </div>
                )}
                <Button 
                aria-disabled={!video || converting || loading || !conversionFormat}
                className={cn("ml-auto flex-shrink-0", (!video || loading) ? "bg-muted-foreground" : "")}
                onClick={convertVideo}
                >
                    {!!video ? conversionFormat ? `Convert to ${conversionFormat}` : "Select conversion format" : "Select video"}
                </Button>
            </div>
            
            {videoUrl && (
                <div className="mt-4 flex flex-col">
                    <video src={videoUrl} className="rounded-md" controls></video>
                    <Button asChild className="mt-3 ml-auto">
                        <a href={videoUrl} download={true}>
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