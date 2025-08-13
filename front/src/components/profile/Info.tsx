import { useResize } from '../../hooks/useResize';
import { createProfileUrl } from '../../utils/createProfileUrl';
import Avatar from '../common/Avatar'
import UserIcon from '../../images/user-icon.jpg'
import ProfileLink from '../ui/ProfileLink';
import FollowersInfo from './FollowersInfo';
import { ParametersIcon } from '../icons';
import SubscribeAndMessageBtns from './SubscribeAndMessageBtns';

const Info = ({ profileInfo, isMyProfile }: { profileInfo: ProfileInfoI | undefined, isMyProfile: boolean }) => {
    const avatarUrl = createProfileUrl(profileInfo?.insta_user_info?.avatar);
    const { screenWidth } = useResize(768);

    return (
        <>
            <div className='flex gap-2 md:gap-16 justify-center'>
                <div className='min-w-[77px]'>
                    <Avatar src={avatarUrl ? avatarUrl : UserIcon} width={screenWidth ? 77 : 150} height={screenWidth ? 77 : 150} />
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='flex gap-4 items-center flex-wrap'>
                        <b className='text-black text-xl font-medium'>
                            {profileInfo?.nickname}
                        </b>
                        {isMyProfile ? (
                            <div className='flex gap-2 items-center'>
                                <ProfileLink title='Редагувати профіль' path='/accounts/edit' />
                                <ProfileLink title='Переглянути архів' path='/archive/stories' />
                                <button>
                                    <ParametersIcon />
                                </button>
                            </div>
                        ) : (
                            profileInfo && (
                                <SubscribeAndMessageBtns
                                    profileInfo={profileInfo}
                                />
                            )
                        )}
                    </div>
                    <div className='py-2'>
                        {profileInfo?.insta_user_info?.bio}
                    </div>
                    {!screenWidth && (
                        <FollowersInfo
                            profileInfo={profileInfo}
                        />
                    )}
                </div>
            </div >
            {screenWidth && (
                <div className='flex justify-center my-4'>
                    <FollowersInfo profileInfo={profileInfo} />
                </div>

            )
            }
        </>
    )
}

export default Info