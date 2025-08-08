import { useEffect } from 'react'
import { useGetPostComments } from '../../hooks/comments/useGetPostComments';
import PostComment from './PostComment';

const PostComments = ({ post, commentWasCreated }: { post: PostI, commentWasCreated: boolean }) => {
    const { comments, getPostComments } = useGetPostComments();
    useEffect(() => {
        if (post || commentWasCreated) {
            getPostComments(post.id);
        }
    }, [post, commentWasCreated]);

    return (
        <div className='flex flex-col gap-1 mt-2'>
            {comments.map((comment: CommentI) => (
                <PostComment comment={comment} key={comment.id} />
            ))}
        </div>
    )
}

export default PostComments