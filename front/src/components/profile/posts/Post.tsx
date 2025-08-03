import { useEffect } from 'react'
import { url } from '../../../utils/url';
import { Link } from 'react-router';
import { useGetPostsImages } from '../../../hooks/posts/useGetPostsImages';

const Post = ({ post }: { post: PostI }) => {
    const { images, error, getImages } = useGetPostsImages();

    useEffect(() => {
        getImages(post);
    }, []);

    return (
        <Link className='w-1/3 max-w-[320px]' to={`/p/${post.id.toString()}`}>
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
        </Link>
    )
}

export default Post