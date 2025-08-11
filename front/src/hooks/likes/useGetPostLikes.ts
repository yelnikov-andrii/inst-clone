import { useEffect, useState } from "react";
import { url } from "../../utils/url";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

export const useGetPostLikes = (postId: number) => {
    const [likes, setLikes] = useState<LikeInterface[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function getLikes(postId: number) {
        try {
            setLoading(true);
            if (!postId) {
                setError("Пост не існує");
            }

            const response = await fetchWithAuth(`${url}/posts/${postId}/likes`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const likesFromServer = await response.json();
            setLikes(likesFromServer);

        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError("Помилка невідома");
            }
        } finally {
            setLoading(false);
            setTimeout(() => {
                setError('');
            }, 6000);
        }
    }

    useEffect(() => {
        if (postId) {
            getLikes(postId);
        }
    }, []);

    return { likes, error, loading };
}