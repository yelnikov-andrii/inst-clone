import UserIcon from '../../images/user-icon.jpg'
import { url } from '../../utils/url';
import Avatar from '../common/Avatar';
import DateCreated from '../common/DateCreated';
import { ButtonDots } from '../icons';

const PostHeader = ({ feedItem }: { feedItem: FeedItemI }) => {
    let avatarUrl = '';

    if (feedItem?.Insta_User?.insta_user_info?.avatar) {
        if (!feedItem.Insta_User?.insta_user_info.avatar.includes('http')) {
            avatarUrl = `${url}/${feedItem.Insta_User?.insta_user_info.avatar}`;
        } else {
            avatarUrl = feedItem.Insta_User?.insta_user_info.avatar;
        }
    }

    return (
        <div className='flex justify-between items-center w-full mb-5'>
            <div className='flex gap-2 items-center'>
                <Avatar width={32} height={32} src={avatarUrl ? avatarUrl : UserIcon} />
                <span className='font-semibold text-black'>
                    {feedItem.Insta_User.nickname}
                </span>
                <span className='text-ig-secondary-text'>
                    •
                </span>
                <span className='text-ig-secondary-text'>
                    <DateCreated 
                      createdAt={feedItem.createdAt}
                    />
                </span>
            </div>
            <button>
                <ButtonDots />
            </button>
        </div>
    )
}

export default PostHeader