import React, { useEffect, useState } from 'react'
import { url } from '../../../utils/url';

const Post = ({ post }: { post: PostI }) => {
    const [images, setImages] = useState<any>([]);
    const [error, setError] = useState('');

    async function getImages() {
        try {
            const response = await fetch(`${url}/posts-media/${post.id}`);
            if (response.ok) {
                const imagesFromServer = await response.json();
                setImages(imagesFromServer);
            }
        } catch(e: any) {
            setError(e.message ? e.message : "Помилка при завантаженні картинок");
        }
    }

    useEffect(() => {
        getImages();
    }, []);

    console.log(images, 'im,agaw')

    return (
        <div className='w-[30%]'>
            {error ? (
                <p className='text-red-500 font-semibold'>
                    {error}
                </p>
            ) : (
                <div className='w-full'>
                    <img 
                      src={`${url}/${images[0]?.filename}`}
                      className='object-cover h-auto w-full'
                    />
                </div>
            )}
            {post.description}
        </div>
    )
}

export default Post