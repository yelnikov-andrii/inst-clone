import { useState } from "react"
import { url } from "../../utils/url";
import { useNavigate } from "react-router";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

export const useDeletePost = () => {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    async function deletePost(postId: number, userId: number) {
        try {
            const response = await fetchWithAuth(`${url}/posts`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({ userId, postId })
            });

            if (response.ok) {
                setMessage("Пост успішно видалено")
            } else {
                setMessage("Не вдалося видалити пост")
            }
        } catch(e) {
            if (e instanceof Error) {
                setMessage(e.message);
            } else {
                setMessage("Помилка при видаленні поста")
            }
        } finally {
            setTimeout(() => {
                setMessage('');
                navigate(-1);
            }, 3500);
        }
    }

    return { deletePost, message };
}