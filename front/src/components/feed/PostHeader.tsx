import { Link } from 'react-router';
import UserIcon from '../../images/user-icon.jpg'
import Avatar from '../common/Avatar';
import DateCreated from '../common/DateCreated';
import { ButtonDots } from '../icons';
import { createProfileUrl } from '../../utils/createProfileUrl';

const PostHeader = ({ feedItem }: { feedItem: FeedItemI }) => {
    const avatarUrl = createProfileUrl(feedItem?.Insta_User?.insta_user_info?.avatar);

    return (
        <div className='flex justify-between items-center w-full mb-5'>
            <div className='flex gap-2 items-center'>
                <Avatar width={32} height={32} src={avatarUrl ? avatarUrl : UserIcon} />
                <Link className='font-semibold text-black' to={`/${feedItem.Insta_User.nickname}`}>
                    {feedItem.Insta_User.nickname}
                </Link>
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