import { url } from '../../utils/url';
import Avatar from '../common/Avatar';
import UserIcon from '../../images/user-icon.jpg';
import DateCreated from '../common/DateCreated';

const Comment = ({ comment }: { comment: CommentI }) => {
    let avatarUrl = '';

    if (comment?.Insta_User?.insta_user_info?.avatar) {
        if (!comment.Insta_User?.insta_user_info.avatar.includes('http')) {
            avatarUrl = `${url}/${comment.Insta_User?.insta_user_info.avatar}`;
        } else {
            avatarUrl = comment.Insta_User?.insta_user_info.avatar;
        }
    }
    return (
        <div>
            <div className='flex gap-3 text-sm'>
                <Avatar width={32} height={32} src={avatarUrl ? avatarUrl : UserIcon} />
                <div>
                    <div className='flex gap-1 items-center'>
                        <b className='text-sm font-medium'>
                            {comment?.Insta_User?.nickname}
                        </b>
                        <p className='text-sm'>
                            {comment?.text}
                        </p>
                    </div>
                    <div>
                        <DateCreated createdAt={comment.createdAt} mini />
                        {/* <LikesCount count={0} /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment