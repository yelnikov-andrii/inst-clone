import Avatar from '../common/Avatar'
import { url } from '../../utils/url';
import UserIcon from '../../images/user-icon.jpg';
import Comment from './Comment';

const PostComments = ({ post, comments, getPostComments }: { post: PostI | undefined, comments: CommentI[], getPostComments: (postId: number) => void }) => {
    let avatarUrl = '';

    if (post?.Insta_User?.insta_user_info?.avatar) {
        if (!post.Insta_User?.insta_user_info.avatar.includes('http')) {
            avatarUrl = `${url}/${post.Insta_User?.insta_user_info.avatar}`;
        } else {
            avatarUrl = post.Insta_User?.insta_user_info.avatar;
        }
    }
    
    return (
        <div>
            <div className='flex gap-2 items-center'>
                <Avatar width={32} height={32} src={avatarUrl ? avatarUrl : UserIcon} />
                <b className='text-sm font-medium'>
                    {post?.Insta_User.nickname}
                </b>
                <p className='text-sm'>
                    {post?.description}
                </p>
            </div>
            <div className='w-full bg-ig-separator h-[1px] my-4' />
            <div>
                {comments.map((comment) => (
                    <Comment 
                      comment={comment}
                      key={comment.id}
                      post={post}
                      getPostComments={getPostComments}
                    />
                ))}
            </div>
        </div>
    )
}

export default PostComments