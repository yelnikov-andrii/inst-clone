import { useState, type Dispatch, type SetStateAction } from "react"
import { url } from "../../utils/url";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

export const useDeleteComment = (setCommentWasDeleted: Dispatch<SetStateAction<boolean>>, setDeleteCommentModal: Dispatch<SetStateAction<boolean>>) => {
    const [deleteCommentError, setDeleteCommentError] = useState('');
    const [loading, setLoading] = useState(false);

    async function deleteComment(commentId: number) {
        try {
            setLoading(true);
            if (!commentId) {
                setDeleteCommentError("Невідомий коментар");
                return;
            }

            const response = await fetchWithAuth(`${url}/comments/${commentId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (!response.ok) {
                setDeleteCommentError("Помилка при видаленні комента")
            } else {
                setCommentWasDeleted(true);
                setDeleteCommentModal(false);
            }

        } catch (e) {
            console.log(e);
            setDeleteCommentError("Не вдалося видалити комент");

        } finally {
            setLoading(false);
            setTimeout(() => {
                setCommentWasDeleted(false);
            }, 2000);
        }
    }

    return { deleteCommentError, deleteComment, loading };
}