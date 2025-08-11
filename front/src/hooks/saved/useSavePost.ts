import { useState } from "react"
import { url } from "../../utils/url";
import { useGetPostSavedStatus } from "./useGetPostSavedStatus";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

export const useSavePost = (post: PostI) => {
    const [saved, setSaved] = useState(false);
    const user = useSelector((state: RootState) => state.auth.user);

    const { getSavedStatus } = useGetPostSavedStatus(post, user);
    

    async function savePost(post: PostI, user: UserI) {
        try {
            if (!user || !post) {
                return;
            }

            const response = await fetchWithAuth(`${url}/posts/${post.id}/save`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ userId: user.id, postId: post.id })
            });

            if (response.ok) {
                const res = await response.json();
                setSaved(res.saved);
            }
        } catch (e) {
            console.error(e);
        } finally {
            getSavedStatus();
        }
    }

    return { saved, savePost };
}