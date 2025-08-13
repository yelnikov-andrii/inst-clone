import { createProfileUrl } from "../../utils/createProfileUrl"
import Avatar from "../common/Avatar"
import { CloseIcon } from "../icons"
import UserIcon from '../../images/user-icon.jpg'
import PrimaryButton from "../ui/PrimaryButton"
import ProfileLink from "../ui/ProfileLink"
import { useFollowUser } from "../../hooks/subscribes/useFollowUser"
import { useSelector } from "react-redux"
import type { RootState } from "../../app/store"
import { useEffect } from "react"
import { useGetFollowing } from "../../hooks/subscribes/useGetFollowing"
import { Link } from "react-router"

const FollowersBlock = ({ users, handleClose, text, toggleFollow }: { users: SubscriberI[], handleClose: () => void, text: string, toggleFollow: () => void }) => {
    const { followUser, followSuccess, followLoading } = useFollowUser();
    const user = useSelector((state: RootState) => state.auth.user);
    const { followingUser } = useGetFollowing(user?.id, followSuccess);

    function handleFollow(userId: number) {
        followUser(userId)
    }

    useEffect(() => {
        if (!followLoading) {
            toggleFollow();
        }
    }, [followSuccess, followLoading])
    return (
        <div className="py-2 px-3 rounded-lg">
            <div className="flex justify-between">
                <p></p>
                <b className="text-center font-semibold">
                    {text}
                </b>
                <button onClick={handleClose}>
                    <CloseIcon />
                </button>
            </div>
            <input />
            <div className="flex flex-col gap-2">
                {users?.length === 0 ? (
                    <div>
                        Користувачі відсутні
                    </div>
                ) : (
                    users.map(subscriber => {
                        const avatarUrl = createProfileUrl(subscriber?.insta_user_info?.avatar);
                        const isFollowing = followingUser?.Followers.some(sub => sub.id === subscriber.id);
                        const isMyProfile = subscriber.id === user?.id;
                        return (
                            <div className="flex justify-between">
                                <div className="flex items-center gap-2">
                                    <Avatar src={avatarUrl ? avatarUrl : UserIcon} />
                                    <div className="text-sm">
                                        <Link className="font-semibold" to={`/${subscriber.nickname}`}>{subscriber.nickname}</Link>
                                        <p className="text-ig-secondary-text">{subscriber.fullname}</p>
                                    </div>
                                </div>
                                {isMyProfile ?
                                    null
                                    : (
                                        isFollowing ? (
                                            <ProfileLink
                                                title='Відстежується'
                                                type='button'
                                                onClick={() => {
                                                    handleFollow(subscriber.id)
                                                }}
                                            />
                                        ) : (
                                            <PrimaryButton
                                                title="Стежити"
                                                onClick={() => {
                                                    handleFollow(subscriber.id)
                                                }}
                                            />
                                        )
                                    )}
                            </div>
                        )
                    })
                )}

            </div>
        </div>
    )
}

export default FollowersBlock