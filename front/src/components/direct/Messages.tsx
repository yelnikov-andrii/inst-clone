import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import ProfileLink from '../ui/ProfileLink';

const Messages = ({ messages, partner }: { messages: MessageI[], partner: UserI | undefined }) => {
    const currentUserId = 1;
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'instant'})
    }, []);

    return (
        <div className='py-4 flex justify-center items-center flex-col relative overflow-y-auto'>
            <div className='flex flex-col gap-1 items-center'>
                <img
                    src={partner?.avatar}
                    alt='avatart'
                    className='w-[96px] h-[96px] object-cover'
                />
                <b className='text-xl font-bold block text-center'>
                    {partner?.fullname}
                </b>
                <p className='text-ig-secondary-text text-sm text-center mb-4'>
                    {partner?.nickname}
                </p>
                <ProfileLink path={`/profile/${partner?.id}`} title='Переглянути профіль' />
            </div>
            <div className='mt-10 flex flex-col gap-5 w-full'>
                {messages.map(message => (
                    <div className={clsx('p-2 rounded-xl max-w-max', {
                        'text-start self-start bg-ig-banner-highlight-background text-black text-[15px]': message.sender_id !== currentUserId,
                        'text-end self-end bg-chat-outgoing-message-bubble-background-color text-white': message.sender_id === currentUserId
                    })}>
                        {message.text}
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>
        </div>
    )
}

export default Messages