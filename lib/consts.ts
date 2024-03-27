interface videoFormat {
    fileEnding: string;
    mimeType: string;
}

interface audioFormats {
    fileEnding: string;
    mimeType: string;
}

export const videoFormats: videoFormat[] = [
    {
        fileEnding: ".mp4",
        mimeType: "video/mp4",
    },
    {
        fileEnding: ".avi",
        mimeType: "video/x-msvideo",
    },
    {
        fileEnding: ".mov",
        mimeType: "video/quicktime",
    },
    {
        fileEnding: ".mkv",
        mimeType: "video/x-matroska"
    },
    {
        fileEnding: ".ogv",
        mimeType: "video/ogg",
    }
] as const;

export const audioFormats: audioFormats[] = [
    {
        fileEnding: ".mp3",
        mimeType: "audio/mpeg",
    },
    {
        fileEnding: ".wav",
        mimeType: "audio/x-wav"
    },
    {
        fileEnding: ".ogv",
        mimeType: "audio/ogg",
    },
] as const;