import { useState } from "react";
import { url } from "../../utils/url";

export const useGetPostsImages = () => {
    const [images, setImages] = useState<any>([]);
    const [error, setError] = useState('');

    async function getImages(post: PostI) {
        try {
            const response = await fetch(`${url}/posts-media/${post.id}`);
            if (response.ok) {
                const imagesFromServer = await response.json();
                setImages(imagesFromServer);
            }
        } catch (e: any) {
            setError(e.message ? e.message : "Помилка при завантаженні картинок");
        }
    }

    return { images, error, getImages };
}