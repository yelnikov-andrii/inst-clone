import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import ProfileLink from '../ui/ProfileLink';
import { createProfileUrl } from '../../utils/createProfileUrl';
import Avatar from '../common/Avatar';
import UserIcon from '../../images/user-icon.jpg'
import { useGetMessages } from '../../hooks/message/useGetMessages';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import Loader from '../ui/Loader';

const Messages = ({ foundPartner, selectedChat, isSuccess }: { foundPartner: UserI | undefined, selectedChat: ChatI, isSuccess: boolean }) => {
    const me = useSelector((state: RootState) => state.auth.user);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'instant' })
    }, []);

    const avatarUrl = createProfileUrl(foundPartner?.insta_user_info.avatar);

    const { messages, loading, error, getMessages } = useGetMessages();

    useEffect(() => {
        if (selectedChat) {
            getMessages(selectedChat.id);
        }
    }, [selectedChat, isSuccess]);

    return (
        <div className='py-4 flex justify-between items-center flex-col relative overflow-y-auto'>
            <div className='flex flex-col gap-1 items-center'>
                <Avatar
                    width={96}
                    height={96}
                    src={avatarUrl ? avatarUrl : UserIcon}
                />
                <b className='text-xl font-bold block text-center'>
                    {foundPartner?.fullname}
                </b>
                <p className='text-ig-secondary-text text-sm text-center mb-4'>
                    {foundPartner?.nickname}
                </p>
                <ProfileLink path={`/${foundPartner?.nickname}`} title='Переглянути профіль' />
            </div>
            <div className='mt-10 flex flex-col gap-5 w-full'>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <div className='text-center text-red-500'>
                        {error}
                    </div>
                ) : (
                    messages?.map(message => (
                        <div
                            className={clsx('p-2 rounded-xl max-w-max', {
                                'text-start self-start bg-ig-banner-highlight-background text-black text-[15px]': message.senderId !== me?.id,
                                'text-end self-end bg-chat-outgoing-message-bubble-background-color text-white': message.senderId === me?.id
                            })}
                            key={message.id}
                        >
                            {message?.text}
                        </div>
                    ))
                )}

                <div ref={bottomRef} />
            </div>
        </div>
    )
}

export default Messages