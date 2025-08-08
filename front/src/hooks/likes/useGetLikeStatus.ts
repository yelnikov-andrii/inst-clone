import { useState } from "react";
import { url } from "../../utils/url";

export const useGetLikeStatus = () => {
    const [likesCount, setLikesCount] = useState<number>(0);
    const [likeStatus, setLikeStatus] = useState(false);
    const [error, setError] = useState('');


    async function getLikes(postId: number, userId: number) {
        try {
            if (!postId) {
                setError("Пост не існує");
            }

            const response = await fetch(`${url}/posts/${postId}/like-status?userId=${userId}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const res = await response.json();
            setLikesCount(res.count);
            setLikeStatus(res.liked);

        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError("Помилка невідома");
            }
        } finally {
            setTimeout(() => {
                setError('');
            }, 6000);
        }
    }

    return { likesCount, likeStatus, error, getLikes };
}