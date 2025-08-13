import ProfileLink from "../ui/ProfileLink"
import { useGetFollowing } from "../../hooks/subscribes/useGetFollowing";
import PrimaryButton from "../ui/PrimaryButton";
import { useFollowUser } from "../../hooks/subscribes/useFollowUser";
import Globalsnackbar from "../common/Globalsnackbar";
import Loader from "../ui/Loader";
import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

const SubscribeAndMessageBtns = ({ profileInfo }: { profileInfo: ProfileInfoI }) => {
    const { followUser, followError, followLoading, followSuccess } = useFollowUser();
    const user = useSelector((state: RootState) => state.auth.user);
    
    const { followingUser } = useGetFollowing(user?.id, followSuccess);
    const [unfollowModal, setUnFollowModal] = useState(false);
    console.log(followingUser, 'following user');

    function handleFollowUser() {
        followUser(profileInfo.id);
    }

    const isFollowing = followingUser?.Followers?.some((followUser: UserI) => followUser?.id === profileInfo.id);

    useEffect(() => {
        if (unfollowModal) {
            setUnFollowModal(false);
        }
    }, [followSuccess]);

    return (
        <div className='flex gap-2 items-center'>
            {isFollowing ? (
                <ProfileLink
                    title='Відстежується'
                    type='button'
                    onClick={() => setUnFollowModal(true)}
                />
            ) : (
                <PrimaryButton
                  title={followLoading ? <Loader /> : "Стежити"}
                  onClick={handleFollowUser}
                />
            )}

            <ProfileLink title='Повідомлення' type='button' onClick={() => { }} />
            {followError && (
                <Globalsnackbar
                  text={followError}
                />
            )}
            {unfollowModal && (
                <Modal onClose={() => setUnFollowModal(false)} styleProps={{ width: "50%"}}>
                    <div className="rounded-xl py-2 bg-white">
                        <button className="w-full py-2 hover:bg-ig-banner-highlight-background font-medium"
                          onClick={() => {
                            handleFollowUser();
                            setTimeout(() => {
                                setUnFollowModal(false);
                            }, 1000);
                          }}
                        >
                            {!followLoading ? "Відписатися" : (<Loader />)}
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    )
}

export default SubscribeAndMessageBtns