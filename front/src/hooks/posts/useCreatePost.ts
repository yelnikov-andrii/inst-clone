import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { url } from "../../utils/url";
import { useNavigate } from "react-router";
import { closeModal } from "../../features/modal/modalSlice";

export const useCreatePost = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError("Помилка невідома");
            }
        }
        finally {
            setLoading(false);
            setTimeout(() => {
                if (!error) {
                    dispatch(closeModal());
                    navigate(0);
                }
            }, (1000));
        }
    }

    return { loading, error, success, createPost };
}