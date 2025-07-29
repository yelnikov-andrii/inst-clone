import { useState, type Dispatch, type SetStateAction } from "react";

interface PostStateI {
    files: File[];
    description: string;
    textBoxIsOpen: boolean;
}

export const useDragFiles = (setPost: Dispatch<SetStateAction<PostStateI>>) => {
    const [isDragActive, setIsDragActive] = useState(false);

    function handleDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setIsDragActive(false);
        const selectedFiles = Array.from(e.dataTransfer.files);
        setPost(post => ({...post, files: selectedFiles}));
    }

    function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setIsDragActive(true);
    }

    function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setIsDragActive(false);
    }

    return { isDragActive, handleDragLeave, handleDragOver, handleDrop };
}