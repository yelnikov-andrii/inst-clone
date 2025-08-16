import { useNavigate, useParams } from 'react-router';
import UserItem from './UserItem';
import { useEffect } from 'react';
import { useGetAllChats } from '../../hooks/chat/useGetAllChats';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import Loader from '../ui/Loader';
import clsx from 'clsx';

const ChatList = () => {
    const { conversationId } = useParams();
    const me = useSelector((state: RootState) => state.auth.user);

    const navigate = useNavigate();
    const { getAllChats } = useGetAllChats();

    useEffect(() => {
        getAllChats();
    }, []);

    const { chats, chatsError, chatsLoading } = useSelector((state: RootState) => state.chats);

    if (chatsLoading) {
        return (
            <div>
                <Loader />
            </div>
        )
    }

    if (chatsError) {
        return (
            <div>
                <p className='text-center text-red-500 font-medium'>
                    {chatsError}
                </p>
            </div>
        )
    }

    const conversationIdNum: number = conversationId ? +conversationId : 0;

    return (
        <>
            <div className='flex justify-between items-center mb-4'>
                <span className='text-black font-bold'>
                    Повідомлення
                </span>
                <button className='text-ig-secondary-text'>
                    requests
                </button>
            </div>
            <div className='flex flex-col gap-3 overflow-y-auto'>
                {chats.length > 0 ? (
                    chats?.map((conversation: ChatI) => {
                        const foundPartner = conversation?.Recipient.id === me?.id ? conversation?.Sender : conversation?.Recipient;
                        return (
                            <div
                                className={clsx('p-2 flex gap-2 itmes-center cursor-pointer hover:bg-ig-input-border-secondary', {
                                    'bg-ig-input-border-secondary': conversationIdNum === conversation.id
                                })} key={conversation.id}
                                onClick={() => { navigate(`/direct/inbox/${conversation.id}`) }}
                            >
                                <UserItem
                                    foundPartner={foundPartner}
                                    lastMessage={conversation.inst_messages[conversation.inst_messages?.length - 1]}
                                />
                            </div>
                        )
                    }
                    )
                ) : (
                    <div>
                        <p>
                            Чати відсутні
                        </p>
                    </div>
                )}
            </div>
        </>
    )
}

export default ChatList