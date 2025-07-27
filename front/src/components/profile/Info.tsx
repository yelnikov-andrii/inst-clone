import { useSelector } from 'react-redux';
import { ParametersIcon } from '../icons';
import ProfileLink from '../ui/ProfileLink';
import type { RootState } from '../../app/store';
import { url } from '../../utils/url';
import Avatar from '../common/Avatar';

const Info = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const myInfo = useSelector((state: RootState) => state.myInfo.myInfo);

    return (
        <div className='flex gap-16 justify-center'>
            <Avatar src={myInfo?.avatar ? `${url}/${myInfo?.avatar}` : ''} width={150} height={150} />
            <div className='flex flex-col gap-4'>
                <div className='flex gap-4 items-center'>
                    <b className='text-black text-xl font-medium'>
                        {user?.nickname}
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