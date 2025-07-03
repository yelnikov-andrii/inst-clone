import UserIcon from '../../images/user-icon.jpg'
import { useParams } from 'react-router';
import { InfoIcon, PhoneIcon, VideoIcon } from '../icons';
import Messages from './Messages';

const UserMainDirect = () => {
    const currentUserId = 1;
    const { conversationId } = useParams();

    const users = [
        {
            id: 1,
            avatar: UserIcon,
            nickname: 'andrii_dev',
            fullname: 'Andrii Yelnikov'
        },
        {
            id: 2,
            avatar: UserIcon,
            nickname: 'julia.smith',
            fullname: 'Julia Smith'
        },
        {
            id: 3,
            avatar: UserIcon,
            nickname: 'michael95',
            fullname: 'Michael Brown'
        },
        {
            id: 4,
            avatar: UserIcon,
            nickname: 'elena_arts',
            fullname: 'Elena Artiukhov'
        },
        {
            id: 5,
            avatar: UserIcon,
            nickname: 'dmytro07',
            fullname: 'Dmytro Petrenko'
        },
        {
            id: 6,
            avatar: UserIcon,
            nickname: 'katya.star',
            fullname: 'Kateryna Star'
        },
        {
            id: 7,
            avatar: UserIcon,
            nickname: 'dev_oleg',
            fullname: 'Oleh Kovalenko'
        },
        {
            id: 8,
            avatar: UserIcon,
            nickname: 'anastasia_89',
            fullname: 'Anastasia Danylko'
        },
        {
            id: 9,
            avatar: UserIcon,
            nickname: 'oleksandr_dev',
            fullname: 'Oleksandr Shulha'
        },
        {
            id: 10,
            avatar: UserIcon,
            nickname: 'viktoria.codes',
            fullname: 'Viktoria Zhukova'
        },
        {
            id: 11,
            avatar: UserIcon,
            nickname: 'roman.ui',
            fullname: 'Roman Demchuk'
        }
    ];

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
                },
                {
                    id: 3,
                    sender_id: 1,
                    text: 'Теж все нормально, дякую.',
                    created: '2025-07-01T12:02:00Z'
                },
                {
                    id: 4,
                    sender_id: 2,
                    text: 'Що нового?',
                    created: '2025-07-01T12:03:00Z'
                },
                {
                    id: 5,
                    sender_id: 1,
                    text: 'Працюю над новим проєктом.',
                    created: '2025-07-01T12:04:00Z'
                },
                {
                    id: 6,
                    sender_id: 2,
                    text: 'Цікаво, про що він?',
                    created: '2025-07-01T12:05:00Z'
                },
                {
                    id: 7,
                    sender_id: 1,
                    text: 'Це соціальна мережа для фотографів.',
                    created: '2025-07-01T12:06:00Z'
                },
                {
                    id: 8,
                    sender_id: 2,
                    text: 'О, круто! Вже щось готове?',
                    created: '2025-07-01T12:07:00Z'
                },
                {
                    id: 9,
                    sender_id: 1,
                    text: 'Так, вже є MVP. Хочеш потестити?',
                    created: '2025-07-01T12:08:00Z'
                },
                {
                    id: 10,
                    sender_id: 2,
                    text: 'Звісно, кидай посилання.',
                    created: '2025-07-01T12:09:00Z'
                },
                {
                    id: 11,
                    sender_id: 1,
                    text: 'Окей, от воно: https://photoapp.dev',
                    created: '2025-07-01T12:10:00Z'
                },
                {
                    id: 12,
                    sender_id: 2,
                    text: 'Дякую! Перевірю сьогодні.',
                    created: '2025-07-01T12:11:00Z'
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

    const foundConversation = conversationId && conversations.find(conv => conv.id === +conversationId);

    if (!foundConversation) {
        return null;
    }

    const partnerId = foundConversation.sender_one_id === currentUserId ? foundConversation.sender_two_id : foundConversation.sender_one_id;
    const foundPartner: UserI | undefined = users.find(user => user.id === partnerId);

    return (
        <div className='pb-8 px-6 h-screen overflow-y-auto'>
            <div className='pb-10 pt-8 border-b border-b-ig-separator sticky top-0 right-0 z-20 bg-ig-bubble-background'>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <img
                            src={foundPartner?.avatar}
                            alt='avatar'
                            className='w-[44px] h-[44px] object-cover'
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
                messages={foundConversation.messages}
                partner={foundPartner}
            />
        </div>
    )
}

export default UserMainDirect