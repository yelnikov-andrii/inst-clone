import UserIcon from '../../images/user-icon.jpg'

const UserItem = ({ conversation }: { conversation: ConversationI }) => {
    const currentUserId = 1;

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

    const partnerId = conversation.sender_one_id === currentUserId ? conversation.sender_two_id : conversation.sender_one_id;
    const foundPartner = users.find(user => user.id === partnerId);

    return (
        <>
            <img
                src={foundPartner?.avatar}
                alt='avatar'
                className='w-[56px] h-[56px] object-cover rounded-full'
            />
            <div className='flex flex-col gap-1'>
                <strong className='text-black font-medium'>
                    {foundPartner?.nickname}
                </strong>
                <p className='text-ig-secondary-text text-sm'>
                    {conversation?.messages[conversation?.messages?.length - 1].text}
                </p>
            </div>
        </>
    )
}

export default UserItem