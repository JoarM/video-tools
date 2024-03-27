interface videoFormat {
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
    }
] as const;