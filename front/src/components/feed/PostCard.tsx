import React from 'react'
import PostHeader from './PostHeader';
import PostMedia from './PostMedia';
import PostFooter from './PostFooter';

interface PostI {
    images: string[]
}

const PostCard = ({ post }: { post: PostI }) => {
    return (
        <article className='w-full border-b border-b-ig-stroke py-6'>
            <PostHeader />
            <PostMedia post={post} />
            <PostFooter />
        </article>
    )
}

export default PostCard