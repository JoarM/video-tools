"use client"

import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
import { useEffect, useRef, useState } from "react"

export function useFFmpeg({
    onProgress,
}: {
    onProgress?: (progress: number) => void,
}) {
    const [loading, setLoading] = useState(true);
    const [ffmpeg, setFFmpeg] = useState<null | FFmpeg>(null);

    async function load(onProgress?: (progress: number) => void) {
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
        if (!ffmpeg) return;

        ffmpeg.on("log", ({ message }) => {
            console.log(message);
        })
        ffmpeg.on("progress", ({ progress }) => {
            onProgress && onProgress(progress);
        });

        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
        });

        setLoading(false);
    }

    useEffect(() => {
        setFFmpeg(new FFmpeg());
    }, [])

    useEffect(() => {
        if (!ffmpeg) return;
        load(onProgress);
    }, [ffmpeg]);

    return {
        ffmpeg,
        loading
    }
}