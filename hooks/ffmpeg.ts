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
    const ffmpeg = useRef(new FFmpeg());

    async function load(onProgress?: (progress: number) => void) {
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'

        ffmpeg.current.on("progress", ({ progress }) => {
            onProgress && onProgress(progress);
        });

        await ffmpeg.current.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
        });

        setLoading(false);
    }

    useEffect(() => {
        load(onProgress);
    }, []);

    return {
        ffmpeg,
        loading
    }
}