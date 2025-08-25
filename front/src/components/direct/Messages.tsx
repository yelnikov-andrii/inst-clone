import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import ProfileLink from '../ui/ProfileLink';
import { createProfileUrl } from '../../utils/createProfileUrl';
import Avatar from '../common/Avatar';
import UserIcon from '../../images/user-icon.jpg'
import { useGetMessages } from '../../hooks/message/useGetMessages';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import Loader from '../ui/Loader';
import { socket } from '../../socket';
import React from 'react';

const Messages = ({ foundPartner, selectedChat, isSuccess }: { foundPartner: UserI | undefined, selectedChat: ChatI, isSuccess: boolean }) => {
    const me = useSelector((state: RootState) => state.auth.user);
    const bottomRef = useRef<HTMLDivElement>(null);

    const avatarUrl = createProfileUrl(foundPartner?.insta_user_info?.avatar);

    const { messages: initialMessages, loading, error, getMessages } = useGetMessages();
    const [messages, setMessages] = useState<MessageI[]>([]);
    const [partnerIsTyping, setPartnerIsTyping] = useState(false);

    useEffect(() => {
        if (initialMessages.length > 0) {
            setMessages(initialMessages);
        }
    }, [initialMessages]);

    useEffect(() => {
        if (selectedChat) {
            getMessages(selectedChat.id);
        }
    }, [selectedChat, isSuccess]);

    useEffect(() => {
        const handler = (message: MessageI) => {
            if (message.chatId === selectedChat?.id) {
                setMessages(prev => [...prev, message]);
            }
        };

        const typingHandler = (userId: number) => {
            console.log('typing handler working')
            setPartnerIsTyping(true);
        }

        const storpTypingHandler = () => {
            setPartnerIsTyping(false);
        }

        if (selectedChat) {
            socket.on("typing", typingHandler);

            socket.on("stop typing", storpTypingHandler);

            socket.on('new message', handler)
        }

        return () => {
            socket.off('typing', typingHandler);
            socket.off("stop typing", storpTypingHandler);
            socket.off('new message', handler);
        }
    }, [selectedChat]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'instant' })
    }, [messages, partnerIsTyping]);

    console.log(partnerIsTyping);

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
                    messages?.map((message, index) => {
                        if (index === messages.length - 1) {
                            return (
                                <React.Fragment key={message.id}>
                                    <div
                                        className={clsx('p-2 rounded-xl max-w-max', {
                                            'text-start self-start bg-ig-banner-highlight-background text-black text-[15px]': message.senderId !== me?.id,
                                            'text-end self-end bg-chat-outgoing-message-bubble-background-color text-white': message.senderId === me?.id
                                        })}
                                        key={message.id}
                                    >
                                        {message?.text}
                                    </div>
                                    {
                                        partnerIsTyping && (
                                            <div className='text-ig-secondary-text text-sm mt-[-5px]'>
                                                Друкує...
                                            </div>
                                        )
                                    }
                                </React.Fragment>
                            )
                        }
                        return (
                            <div
                                className={clsx('p-2 rounded-xl max-w-max', {
                                    'text-start self-start bg-ig-banner-highlight-background text-black text-[15px]': message.senderId !== me?.id,
                                    'text-end self-end bg-chat-outgoing-message-bubble-background-color text-white': message.senderId === me?.id
                                })}
                                key={message.id}
                            >
                                {message?.text}
                            </div>
                        )
                    })
                )}

                <div className='mt-4' ref={bottomRef} />
            </div>
        </div>
    )
}

export default Messages