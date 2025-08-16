import { useSelector } from 'react-redux';
import UserIcon from '../../images/user-icon.jpg'
import { createProfileUrl } from '../../utils/createProfileUrl';
import Avatar from '../common/Avatar';
import type { RootState } from '../../app/store';

const UserItem = ({ foundPartner, lastMessage }: { foundPartner: UserI, lastMessage: MessageI }) => {
    const avatarUrl = createProfileUrl(foundPartner?.insta_user_info?.avatar);
    const me = useSelector((state: RootState) => state.auth.user);

    const authorOfLastMessage = me?.id === lastMessage.senderId ? "Ви" : foundPartner.fullname;
    const authorOfLastMessageText = authorOfLastMessage.length > 10 ? authorOfLastMessage.slice(0, 10) + '...' : authorOfLastMessage;
    const lastMessagesText = lastMessage.text.length > 28 ? lastMessage.text.slice(0, 28) + '...' : lastMessage.text;

    return (
        <>
        <Avatar src={avatarUrl ? avatarUrl : UserIcon} />
            <div className='flex flex-col gap-1'>
                <p className='text-black'>
                    {foundPartner?.fullname}
                </p>
                <p className='text-ig-secondary-text text-sm'>
                    {`${authorOfLastMessageText}: ${lastMessagesText}`}
                </p>
            </div>
        </>
    )
}

export default UserItem