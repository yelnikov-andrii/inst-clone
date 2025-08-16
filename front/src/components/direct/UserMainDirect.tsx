import UserIcon from '../../images/user-icon.jpg'
import { useParams } from 'react-router';
import { InfoIcon, PhoneIcon, VideoIcon } from '../icons';
import Messages from './Messages';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { useEffect, useState } from 'react';
import { useGetChatById } from '../../hooks/chat/useGetChatById';
import { createProfileUrl } from '../../utils/createProfileUrl';
import Avatar from '../common/Avatar';
import PrimaryButton from '../ui/PrimaryButton';
import { useSendMessage } from '../../hooks/message/useSendMessage';
import Globalsnackbar from '../common/Globalsnackbar';
import Loader from '../ui/Loader';

const UserMainDirect = () => {
    const { conversationId } = useParams();

    const selectedChat = useSelector((state: RootState) => state.chats.selectedChat);
    const me = useSelector((state: RootState) => state.auth.user);
    const [textMessage, setTextMessage] = useState("");

    const { getChatById } = useGetChatById();
    const { sendMessage, isSuccess, messageLoading, messageError } = useSendMessage();

    useEffect(() => {
        if (conversationId) {
            getChatById(+conversationId);
        }
    }, [conversationId]);

        useEffect(() => {
        setTextMessage("");
    }, [isSuccess]);

    const foundPartner = selectedChat?.Recipient.id === me?.id ? selectedChat?.Sender : selectedChat?.Recipient;
    const avatarUrl = createProfileUrl(foundPartner?.insta_user_info.avatar);


    function handleSendMessage() {
        if (textMessage && selectedChat) {
            sendMessage(textMessage, selectedChat?.id, foundPartner?.id);
        }
    }

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
            <div className='absolute bottom-5 right-0 left-0 w-full flex justify-center items-center'>
                <input
                    className='border border-ig-separator w-9/10 py-2 pl-4 pr-24 rounded-2xl outline-0'
                    value={textMessage}
                    onChange={(e) => setTextMessage(e.target.value)}
                    placeholder='Повідомлення...'
                />
                {textMessage && (
                    <div className='absolute right-15'>
                        <PrimaryButton title={messageLoading ? <Loader /> : "Надіслати"} mini onClick={handleSendMessage}/>
                    </div>

                )}
            </div>
            {messageError && (
                <div className='text-red-500'>
                    <Globalsnackbar text={messageError} />
                </div>
            )}
        </div>
    )
}

export default UserMainDirect