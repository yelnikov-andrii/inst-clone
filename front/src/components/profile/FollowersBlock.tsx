import { createProfileUrl } from "../../utils/createProfileUrl"
import Avatar from "../common/Avatar"
import { CloseIcon } from "../icons"
import UserIcon from '../../images/user-icon.jpg'
import PrimaryButton from "../ui/PrimaryButton"
import ProfileLink from "../ui/ProfileLink"
import { useFollowUser } from "../../hooks/subscribes/useFollowUser"
import { useSelector } from "react-redux"
import type { RootState } from "../../app/store"
import { useEffect, useState } from "react"
import { useGetFollowing } from "../../hooks/subscribes/useGetFollowing"
import { Link } from "react-router"
import { useSearch } from "../../hooks/userSearch"

const FollowersBlock = ({ users, handleClose, text, toggleFollow }: { users: SubscriberI[], handleClose: () => void, text: string, toggleFollow: () => void }) => {
    const { followUser, followSuccess, followLoading } = useFollowUser();
    const user = useSelector((state: RootState) => state.auth.user);
    const { followingUser } = useGetFollowing(user?.id, followSuccess);
    const [filteredUsers, setFilteredUsers] = useState(users);

    function handleFollow(userId: number) {
        followUser(userId)
    }

    useEffect(() => {
        if (!followLoading) {
            toggleFollow();
        }
    }, [followSuccess, followLoading])

    const { search, appliedSearch, handleChangeSearchInput } = useSearch();

    useEffect(() => {
        if (appliedSearch) {
            const filteredUsers = users.filter((user: UserI) => {
                if (user.fullname.toLowerCase().includes(appliedSearch.toLowerCase()) || user.nickname.toLowerCase().includes(appliedSearch.toLowerCase())) {
                    return user;
                }
            });

            setFilteredUsers(filteredUsers);
        } else {
            setFilteredUsers(users);
        }
    }, [appliedSearch, users]);

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
            <input
                value={search}
                onChange={handleChangeSearchInput}
                className="w-full py-2 px-4 bg-ig-highlight-background rounded-lg mt-2 mb-4 placeholder:text-ig-secondary-text"
                placeholder="Пошук"
            />
            <div className="flex flex-col gap-2">
                {filteredUsers?.length === 0 ? (
                    <div>
                        Користувачі відсутні
                    </div>
                ) : (
                    filteredUsers.map(subscriber => {
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
                                                width={120}
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