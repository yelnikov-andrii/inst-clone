import { useSelector } from 'react-redux';
import { ParametersIcon } from '../icons';
import ProfileLink from '../ui/ProfileLink';
import type { RootState } from '../../app/store';
import Avatar from '../common/Avatar';
import FollowersInfo from './FollowersInfo';
import { useResize } from '../../hooks/useResize';
import { createProfileUrl } from '../../utils/createProfileUrl';
import UserIcon from '../../../images/user-icon.jpg'

const MyInfo = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const myInfo = useSelector((state: RootState) => state.myInfo.myInfo);
    const { screenWidth } = useResize(768);

    const avatarUrl = createProfileUrl(myInfo?.avatar);

    return (
        <>
            <div className='flex gap-2 md:gap-16 justify-center'>
                <div className='min-w-[77px]'>
                    <Avatar src={avatarUrl ? avatarUrl : UserIcon} width={screenWidth ? 77 : 150} height={screenWidth ? 77 : 150} />
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

export default MyInfo