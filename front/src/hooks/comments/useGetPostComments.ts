import { useState } from "react"
import { url } from "../../utils/url";

export const useGetPostComments = () => {
    const [comments, setComments] = useState([]);

    async function getPostComments(postId: number) {
        try {
            if (!postId) {
                return;
            }

            const response = await fetch(`${url}/comments-post/${postId}`, {
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

        } catch (e: any) {
            console.log(e?.message);
        }
    }

    return { comments, getPostComments };
}