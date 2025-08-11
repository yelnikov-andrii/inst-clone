import { useState, type Dispatch, type SetStateAction } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { url } from "../../utils/url";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

export const useCreateComment = (setCommentWasCreated: Dispatch<SetStateAction<boolean>>) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const user = useSelector((state: RootState) => state.auth.user);
    const [text, setText] = useState('');

    async function createComment(postId: number) {
        setError("");
        setLoading(true);

        try {
            if (!postId) {
                setError("Невідомий пост");
                return;
            }

            const response = await fetchWithAuth(`${url}/comments`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId: user?.id, postId, text })
            });

            if (!response.ok) {
                setError("Не вдалося прокоментувати");
            } else {
                setText("");
                setCommentWasCreated(true);
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
                setError('');
            }, (3500));
        }
    }

    return { createComment, text, setText, error, loading };
}