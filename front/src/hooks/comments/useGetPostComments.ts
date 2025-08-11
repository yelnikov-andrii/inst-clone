import { useState } from "react"
import { url } from "../../utils/url";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

export const useGetPostComments = () => {
    const [comments, setComments] = useState([]);

    async function getPostComments(postId: number) {
        try {
            if (!postId) {
                return;
            }

            const response = await fetchWithAuth(`${url}/comments-post/${postId}`, {
                method: "GET",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (response.ok) {
                const res = await response.json();
                setComments(res);
            }

        } catch (e: unknown) {
            if (e instanceof Error) {
                console.log(e?.message);
            }
        }
    }

    return { comments, getPostComments };
}