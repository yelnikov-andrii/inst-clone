import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { url } from "../../utils/url";
import { useGetLikeStatus } from "./useGetLikeStatus";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

export const useLikePost = (postId: number, setCount: Dispatch<SetStateAction<number>>) => {
    const [error, setError] = useState('');
    const [liked, setLiked] = useState(false);
    const user = useSelector((state: RootState) => state.auth.user);

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

    const { likesCount, likeStatus, getLikes, error: errorGetLikes } = useGetLikeStatus();

    useEffect(() => {
        if (likeStatus) {
            setLiked(true);
        } else {
            setLiked(false);
        }

        setCount(likesCount);
    }, [likeStatus, likesCount]);

    useEffect(() => {
        if (user && postId) {
            getLikes(postId, user.id);
        }
    }, [user, postId]);

    return { error, likePost, liked, errorGetLikes };
}