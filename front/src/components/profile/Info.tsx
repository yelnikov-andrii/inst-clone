import { useSelector } from 'react-redux';
import { ParametersIcon } from '../icons';
import ProfileLink from '../ui/ProfileLink';
import type { RootState } from '../../app/store';
import { url } from '../../utils/url';
import Avatar from '../common/Avatar';
import FollowersInfo from './FollowersInfo';
import { useResize } from '../../hooks/useResize';

const Info = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const myInfo = useSelector((state: RootState) => state.myInfo.myInfo);
    const { screenWidth } = useResize(768);

    return (
        <>
            <div className='flex gap-2 md:gap-16 justify-center'>
                <div className='min-w-[77px]'>
                    <Avatar src={myInfo?.avatar ? `${url}/${myInfo?.avatar}` : ''} width={screenWidth ? 77 : 150} height={screenWidth ? 77 : 150} />
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='flex gap-4 items-center flex-wrap'>
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
                    <div className='py-2'>
                        {myInfo?.bio}
                    </div>
                    {!screenWidth && (
                        <FollowersInfo />
                    )}
                </div>
            </div>
            {screenWidth && (
                <div className='flex justify-center my-4'>
                    <FollowersInfo />
                </div>

            )}
        </>
    )
}

export default Info