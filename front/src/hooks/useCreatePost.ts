import { useState } from "react"
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { url } from "../utils/url";

export const useCreatePost = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const user = useSelector((state: RootState) => state.auth.user);

    async function createPost(post: { description: string; files: File[] }) {
        setError("");
        setSuccess("");
        setLoading(true);
        const formData = new FormData();

        if (post.description) {
            formData.append("description", post.description);
        }

        if (user) {
            formData.append('userId', user?.id.toString())
        }

        const selectedFiles = Array.isArray(post.files) ? post.files : [post.files];

        if (selectedFiles.length) {
            selectedFiles.forEach(file => {
                formData.append("files", file);
            })
        }

        try {
            const response = await fetch(`${url}/posts`, {
                method: "POST",
                credentials: 'include',
                body: formData
            });

            if (!response.ok) {
                setError("Не вдалося створити пост");
            } else {
                setSuccess("Пост створено");
            }

        } catch (e: any) {
            setError(e.message || "Помилка при відправці даних");
        }
        finally {
            setLoading(false);
        }
    }

    return { loading, error, success, createPost };
}