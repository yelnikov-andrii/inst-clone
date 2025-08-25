import UserIcon from '../../images/user-icon.jpg'
import { useParams } from 'react-router';
import { InfoIcon, PhoneIcon, VideoIcon } from '../icons';
import Messages from './Messages';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { useEffect, useRef, useState } from 'react';
import { useGetChatById } from '../../hooks/chat/useGetChatById';
import { createProfileUrl } from '../../utils/createProfileUrl';
import Avatar from '../common/Avatar';
import PrimaryButton from '../ui/PrimaryButton';
import { useSendMessage } from '../../hooks/message/useSendMessage';
import Globalsnackbar from '../common/Globalsnackbar';
import Loader from '../ui/Loader';
import { socket } from '../../socket';

const UserMainDirect = () => {
    const { conversationId } = useParams();

    const selectedChat = useSelector((state: RootState) => state.chats.selectedChat);
    const me = useSelector((state: RootState) => state.auth.user);
    const [textMessage, setTextMessage] = useState("");
    const [isConnected, setIsConnected] = useState(socket.connected);

    const { getChatById } = useGetChatById();
    const { sendMessage, isSuccess, messageLoading, messageError } = useSendMessage();

    const typingTimer = useRef<any>(null);

    function handleTyping(e: React.ChangeEvent<HTMLInputElement>) {
        setTextMessage(e.target.value);

        if (selectedChat && me) {
            socket.emit("typing", { chatId: selectedChat?.id, userId: me?.id });

            if (typingTimer.current) {
                clearTimeout(typingTimer.current);
            }
        }

        typingTimer.current = setTimeout(() => {
            socket.emit("stop typing", { chatId: selectedChat?.id, userId: me?.id })
        }, 1500);
    }

    useEffect(() => {
        if (conversationId) {
            getChatById(+conversationId);
        }
    }, [conversationId]);

    useEffect(() => {
        if (selectedChat) {
            socket.emit("join chat", selectedChat?.id);
        }
    }, [selectedChat]);

    useEffect(() => {
        setTextMessage("");
    }, [isSuccess]);

    const foundPartner = selectedChat?.Recipient.id === me?.id ? selectedChat?.Sender : selectedChat?.Recipient;
    const avatarUrl = createProfileUrl(foundPartner?.insta_user_info?.avatar);


    function handleSendMessage(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (isConnected) {

            socket.emit('send message', {
                text: textMessage,
                chatId: selectedChat?.id,
                recipientId: foundPartner?.id,
                senderId: me?.id
            });

            setTextMessage("");

        } else {
            if (textMessage && selectedChat) {
                sendMessage(textMessage, selectedChat?.id, foundPartner?.id);
            }
        }

    }

    function onConnect() {
        setIsConnected(true);
    }

    function onDisconnect() {
        setIsConnected(false);
    }

    useEffect(() => {
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        }
    }, []);

    if (!selectedChat) {
        return null;
    }

    return (
        <div className='pb-8 px-6 h-screen overflow-y-auto'>
            <div className='pb-10 pt-8 border-b border-b-ig-separator sticky top-0 right-0 z-20 bg-ig-bubble-background'>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <Avatar
                            width={44}
                            height={44}
                            src={avatarUrl ? avatarUrl : UserIcon}
                        />
                        <div>
                            <b className='text-black m-0 mb-1 block'>
                                {foundPartner?.fullname}
                            </b>
                            <p className='text-[12px] text-ig-secondary-text'>
                                {foundPartner?.nickname}
                            </p>
                        </div>
                    </div>
                    <div className='flex gap-4 items-center'>
                        <button>
                            <PhoneIcon />
                        </button>
                        <button>
                            <VideoIcon />
                        </button>
                        <button>
                            <InfoIcon />
                        </button>
                    </div>
                </div>
            </div>
            <Messages
                foundPartner={foundPartner}
                selectedChat={selectedChat}
                isSuccess={isSuccess}
            />
            <form className='absolute bg-white bottom-0 pb-5 right-0 left-0 w-full flex justify-center items-center' onSubmit={handleSendMessage}>
                <input
                    className='border border-ig-separator w-9/10 py-2 pl-4 pr-24 rounded-2xl outline-0'
                    value={textMessage}
                    onChange={handleTyping}
                    placeholder='Повідомлення...'
                />
                {textMessage && (
                    <div className='absolute right-15'>
                        <PrimaryButton title={messageLoading ? <Loader /> : "Надіслати"} mini type="submit" />
                    </div>

                )}
            </form>
            {
                messageError && (
                    <div className='text-red-500'>
                        <Globalsnackbar text={messageError} />
                    </div>
                )
            }
        </div >
    )
}

export default UserMainDirect