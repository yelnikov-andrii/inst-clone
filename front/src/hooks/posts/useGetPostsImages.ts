import { useState } from "react";
import { url } from "../../utils/url";

export const useGetPostsImages = () => {
    const [images, setImages] = useState<{ type: string; image: string}[]>([]);
    const [error, setError] = useState('');

    async function getImages(post: PostI) {
        try {
            const response = await fetch(`${url}/posts-media/${post.id}`);
            if (response.ok) {
                const imagesFromServer = await response.json();
                setImages(imagesFromServer);
            }
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError("Помилка невідома");
            }
        }
    }

    return { images, error, getImages };
}