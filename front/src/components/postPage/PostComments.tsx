import { useEffect } from 'react'
import { useGetPostComments } from '../../hooks/comments/useGetPostComments';
import PostComment from './PostComment';

const PostComments = ({ post }: { post: PostI }) => {
    const { comments, getPostComments } = useGetPostComments();
    useEffect(() => {
        if (post) {
            getPostComments(post.id);
        }
    }, [post]);

    return (
        <div className='flex flex-col gap-1 mt-2'>
            {comments.map(comment => (
                <PostComment comment={comment} />
            ))}
        </div>
    )
}

export default PostComments