import { useNavigate } from 'react-router';
import UserItem from './UserItem';



const UsersList = () => {
    const conversations: ConversationI[] = [
        {
            id: 1,
            sender_one_id: 1,
            sender_two_id: 2,
            messages: [
                {
                    id: 1,
                    sender_id: 1,
                    text: 'Привіт! Як справи?',
                    created: '2025-07-01T12:00:00Z'
                },
                {
                    id: 2,
                    sender_id: 2,
                    text: 'Все добре! Ти як?',
                    created: '2025-07-01T12:01:00Z'
                }
            ]
        },
        {
            id: 2,
            sender_one_id: 1,
            sender_two_id: 3,
            messages: [
                {
                    id: 1,
                    sender_id: 3,
                    text: 'Домовились, побачимось завтра.',
                    created: '2025-07-01T13:05:00Z'
                }
            ]
        },
        {
            id: 3,
            sender_one_id: 1,
            sender_two_id: 4,
            messages: [
                {
                    id: 1,
                    sender_id: 4,
                    text: 'Ок, дякую!',
                    created: '2025-07-01T14:10:00Z'
                }
            ]
        },
        {
            id: 4,
            sender_one_id: 1,
            sender_two_id: 5,
            messages: [
                {
                    id: 1,
                    sender_id: 5,
                    text: 'Класні фото, до речі!',
                    created: '2025-07-01T15:00:00Z'
                }
            ]
        },
        {
            id: 5,
            sender_one_id: 1,
            sender_two_id: 6,
            messages: [
                {
                    id: 1,
                    sender_id: 6,
                    text: 'Я зараз не можу говорити.',
                    created: '2025-07-01T15:10:00Z'
                }
            ]
        },
        {
            id: 6,
            sender_one_id: 1,
            sender_two_id: 7,
            messages: [
                {
                    id: 1,
                    sender_id: 7,
                    text: 'Готово, перевір пошту.',
                    created: '2025-07-01T15:15:00Z'
                }
            ]
        },
        {
            id: 7,
            sender_one_id: 1,
            sender_two_id: 8,
            messages: [
                {
                    id: 1,
                    sender_id: 8,
                    text: 'Дуже дякую! :)',
                    created: '2025-07-01T15:20:00Z'
                }
            ]
        },
        {
            id: 8,
            sender_one_id: 1,
            sender_two_id: 9,
            messages: [
                {
                    id: 1,
                    sender_id: 9,
                    text: 'Побачимось завтра.',
                    created: '2025-07-01T15:30:00Z'
                }
            ]
        },
        {
            id: 9,
            sender_one_id: 1,
            sender_two_id: 10,
            messages: [
                {
                    id: 1,
                    sender_id: 10,
                    text: 'Файл надіслала в телеграм.',
                    created: '2025-07-01T15:35:00Z'
                }
            ]
        },
        {
            id: 10,
            sender_one_id: 1,
            sender_two_id: 11,
            messages: [
                {
                    id: 1,
                    sender_id: 11,
                    text: 'Дизайн уже готовий.',
                    created: '2025-07-01T15:40:00Z'
                }
            ]
        }
    ];

    const navigate = useNavigate();

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
                {conversations.map(conversation => (
                    <div
                        className='p-2 flex gap-2 itmes-center cursor-pointer hover:bg-ig-secondary-background' key={conversation.id}
                        onClick={() => { navigate(`/direct/inbox/${conversation.id}`) }}
                    >
                        <UserItem
                            conversation={conversation}
                        />
                    </div>
                ))}
            </div>
        </>
    )
}

export default UsersList