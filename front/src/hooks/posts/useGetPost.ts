import { useState } from "react";
import { url } from "../../utils/url";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

export const useGetPost = () => {
    const [post, setPost] = useState<PostI>();
    const [loading, setLoading] = useState(false);

    async function getPost(postId: number) {

        try {
            setLoading(true);
            if (!postId) {
                return;
            }

            const response = await fetchWithAuth(`${url}/posts/${postId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json"
                }
            });

            if (response.ok) {
                const res = await response.json();

                if (res) {
                    setPost(res);
                }
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    return { getPost, post, loading };
}