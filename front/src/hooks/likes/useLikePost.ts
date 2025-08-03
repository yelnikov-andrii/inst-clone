import { useState } from "react";
import { url } from "../../utils/url";

export const useLikePost = () => {
    const [error, setError] = useState('');
    const [liked, setLiked] = useState(false);

    async function likePost(postId: number, userId: number) {
        try {
            if (!postId) {
                setError("Пост не існує");
            }

            if (!userId) {
                setError("Невідомий користувач");
            }

            const response = await fetch(`${url}/posts/${postId}/like`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({ userId })
            });

            console.log(response);
            if (response.ok) {
                const res = await response.json();
                setLiked(res.liked);
            } else {
                setError("Невідома помилка")
            }

        } catch (e: any) {
            setError(e.message || "Помилка сервера");
        } finally {
            setTimeout(() => {
                setError('');
            }, 6000);
        }
    }

    return { error, likePost, liked };
}