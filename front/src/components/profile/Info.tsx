import UserIcon from '../../images/user-icon.jpg'
import { ParametersIcon } from '../icons';
import ProfileLink from '../ui/ProfileLink';

const Info = () => {
    const currentUserId = 1;

    const users: UserI[] = [
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

    const foundUser = users.find(user => user.id === currentUserId);

    return (
        <div className='flex gap-16 justify-center'>
            <img
                src={foundUser?.avatar}
                alt='avatar'
                className='w-[150px] h-[150px] rounded-full'
            />
            <div className='flex flex-col gap-4'>
                <div className='flex gap-4 items-center'>
                    <b className='text-black text-xl font-medium'>
                        {foundUser?.nickname}
                    </b>
                    <div className='flex gap-2 items-center'>
                        <ProfileLink title='Редагувати профіль' path='/accounts/edit' />
                        <ProfileLink title='Переглянути архів' path='/archive/stories' />
                        <button>
                            <ParametersIcon />
                        </button>
                    </div>
                </div>
                <div className='flex gap-6'>
                    <p>
                        <b className='text-black font-bold'>0</b> <span className='text-ig-secondary-text'>дописів</span>
                    </p>
                    <p>
                        <span className='text-ig-secondary-text'>Читачі: </span> <b className='text-black font-bold'>8</b>
                    </p>
                    <p>
                        <span className='text-ig-secondary-text'>Стежить: </span> <b className='text-black font-bold'>4</b>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Info