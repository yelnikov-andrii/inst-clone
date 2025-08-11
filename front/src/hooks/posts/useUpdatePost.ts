import { useState } from "react"
import { useDispatch } from "react-redux";
import { url } from "../../utils/url";
import { closeModal } from "../../features/modal/modalSlice";
import { useNavigate } from "react-router";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

interface PostStateI {
    files: File[];
    description: string;
    textBoxIsOpen: boolean;
    id?: number;
}

export const useUpdatePost = () => {
    const [updateLoading, setUpdateLoading] = useState(false);
    const [updateError, setUpdateError] = useState("");
    const [updateSuccess, setUpdateSuccess] = useState("");
    const navigate = useNavigate();

    const dispatch = useDispatch();

    async function updatePost(post: PostStateI) {
        setUpdateError("");
        setUpdateSuccess("");
        setUpdateLoading(true);

        try {
            if (!post.id || !post.description) {
                setUpdateError("Невідомий пост");
                return;
            }

            const response = await fetchWithAuth(`${url}/posts`, {
                method: "PATCH",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ description: post.description, id: post.id })
            });

            if (!response.ok) {
                setUpdateError("Не вдалося оновити пост");
            } else {
                setUpdateSuccess("Пост оновлено");
            }

        } catch (e: unknown) {
            if (e instanceof Error) {
                setUpdateError(e.message);
            } else {
                setUpdateError("Помилка невідома");
            }
        }
        finally {
            setUpdateLoading(false);
            setTimeout(() => {
                if (!updateError) {
                    dispatch(closeModal());
                    navigate(0);
                }
            }, (3000));
        }
    }

    return { updateLoading, updateError, updateSuccess, updatePost };
}