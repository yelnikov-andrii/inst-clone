import { useState } from "react";
import { url } from "../utils/url";

export const useGetPost = () => {
    const [post, setPost] = useState();
    const [loading, setLoading] = useState(false);

    async function getPost(postId: number) {

        try {
            setLoading(true);
            if (!postId) {
                return;
            }

            const response = await fetch(`${url}/posts/${postId}`, {
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