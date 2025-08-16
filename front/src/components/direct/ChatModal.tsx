import { useGetAllUsers } from '../../hooks/users/useGetAllUsers';
import { useSearch } from '../../hooks/userSearch'
import Avatar from '../common/Avatar';
import { CloseIcon } from '../icons'
import Loader from '../ui/Loader';
import UserIcon from '../../images/user-icon.jpg'
import { createProfileUrl } from '../../utils/createProfileUrl';
import { useEffect, useState } from 'react';
import PrimaryButton from '../ui/PrimaryButton';
import { useCreateChat } from '../../hooks/chat/useCreateChat';
import { useGetAllChats } from '../../hooks/chat/useGetAllChats';
import { useGetSelectedChat } from '../../hooks/chat/useGetSelectedChat';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';

const ChatModal = ({ handleClose }: { handleClose: () => void }) => {
    const { handleChangeSearchInput, search, appliedSearch } = useSearch();

    const { users, loading, error } = useGetAllUsers(appliedSearch);
    const [selectedUser, setSelectedUser] = useState<UserI>();

    const navigate = useNavigate();

    const { createChat, isCreated } = useCreateChat();
    const { getAllChats } = useGetAllChats();
    const { getSelectedChat } = useGetSelectedChat();

    const selectedChat = useSelector((state: RootState) => state.chats.selectedChat);


    function handleCheckboxChange(user: UserI) {
        setSelectedUser(user);
    }

    function handleCreateOrFindChat() {
        if (selectedUser) {
            createChat(selectedUser)
        }
    }

    useEffect(() => {
        getAllChats();
        if (selectedUser) {
            getSelectedChat(selectedUser.id);
        }
    }, [isCreated]);

    useEffect(() => {
        if (selectedChat) {
            navigate(`/direct/inbox/${selectedChat.id}`)
        }
    }, [selectedChat]);

    return (
        <div className='py-2 rounded-xl'>
            <div className='flex justify-between items-center px-4 mb-4'>
                <div></div>
                <p className='font-medium'>
                    Нове повідомлення
                </p>
                <button className='cursor-pointer' onClick={handleClose}>
                    <CloseIcon />
                </button>
            </div>
            <div className='w-full border-y border-y-ig-separator flex gap-2 items-center py-1'>
                <span>
                    Кому:
                </span>
                <input
                    className='w-full outline-0'
                    placeholder='Пошук'
                    value={search}
                    onChange={handleChangeSearchInput}
                />
            </div>
            <div className='flex flex-col gap-2'>
                {loading && (
                    <Loader />
                )}
                {error && !loading && (
                    <p className='text-red-500 font-medium text-center py-2'>
                        {error}
                    </p>
                )}
                {users?.length > 0 && (
                    users.map((user: UserI) => {
                        const avatarUrl = createProfileUrl(user?.insta_user_info?.avatar);
                        return (
                            <div
                                className='py-1 flex items-center justify-between hover:bg-ig-button-secondary-background cursor-pointer'
                                onClick={() => {
                                    handleCheckboxChange(user);
                                }}
                            >
                                <div className='flex gap-1 items-center'>
                                    <Avatar src={avatarUrl ? avatarUrl : UserIcon} />
                                    <div>
                                        <p className='text-sm'>
                                            {user?.nickname}
                                        </p>
                                        <p className='text-ig-secondary-text text-sm'>
                                            {user.fullname}
                                        </p>
                                    </div>
                                </div>
                                <input
                                    type='checkbox'
                                    className="
                                    appearance-none
                                    w-5 h-5
                                    border border-gray-400
                                    rounded-full
                                    checked:bg-blue-500
                                    checked:border-transparent
                                    focus:outline-none
                                    cursor-pointer
                                    "
                                    checked={selectedUser?.id === user.id}
                                    onChange={() => handleCheckboxChange(user)}
                                />
                            </div>
                        )
                    }
                    ))}
            </div>
            <div className='w-full mt-4'>
                <PrimaryButton
                    title="Чат"
                    disabled={!selectedUser}
                    onClick={handleCreateOrFindChat}
                />
            </div>
        </div>
    )
}

export default ChatModal