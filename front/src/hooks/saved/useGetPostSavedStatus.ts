import { useEffect, useState } from "react";
import { url } from "../../utils/url";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

export const useGetPostSavedStatus = (post: PostI, user: UserI | null) => {
    const [savedStatus, setSavedStatus] = useState(false);
    const [error, setError] = useState('');

    async function getSavedStatus() {
        try {
            if (!post.id) {
                setError("Пост не існує");
            }

            if (!user) {
                setError("користувач не існує");
            }

            const response = await fetchWithAuth(`${url}/posts/${post.id}/saved-status?userId=${user?.id}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const res = await response.json();
            setSavedStatus(res.saved);

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

    useEffect(() => {
        if (post && user) {
            getSavedStatus();
        }
    }, [post, user]);

    return { savedStatus, savedError: error, getSavedStatus };
}