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
            console.log(res)
            setLikesCount(res.count);
            setLikeStatus(res.liked);

        } catch (e: any) {
            setError(e.message || "Помилка сервера");
        } finally {
            setTimeout(() => {
                setError('');
            }, 6000);
        }
    }

    return { likesCount, likeStatus, error, getLikes};
}