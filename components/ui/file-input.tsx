import { cn } from "@/lib/utils";
import { forwardRef, useRef, useState } from "react";
import { FileDrop } from "react-file-drop";

type FileInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange" | "accept"> & {
    setValue: (value: File | null) => void;
    setError?: (error: string) => void;
    mimeType?: string;
}

export function FileInput({ className, setValue, setError, mimeType, ...props }: FileInputProps) {
    const ref = useRef<HTMLInputElement>(null);

    function handleFileChange(file?: File | null) {
        if (!file) {
            setValue(file ?? null);
            return
        }
        setError && setError("");
        if (mimeType && !file.type.match(`${mimeType}.*`)) {
            setError && setError("Invalid file format");
            return
        }
        setValue(file);
    }

    return (
        <FileDrop 
        onTargetClick={() => ref.current?.click()}
        onDrop={(files) => handleFileChange(files?.item(0))}
        className={cn("w-full border border-input border-dashed rounded-lg p-6 h-32 grid place-items-center cursor-pointer", className)}
        >
            <p className="text-sm text-muted-foreground">DRAG FILE HERE OR <span className="text-primary">BROWSE</span></p>
            <input 
            type="file"
            accept={mimeType && `${mimeType}/*`} 
            onChange={(e) => handleFileChange(e.target.files?.item(0))}
            ref={ref}
            className="sr-only"
            {...props}
            />
        </FileDrop>
    )
};