import { useState } from "react";
import { useGetFollowing } from "../../hooks/subscribes/useGetFollowing";
import Modal from "../ui/Modal";
import { useGetFollowers } from "../../hooks/subscribes/useGetFollowers";
import FollowersBlock from "./FollowersBlock";

const FollowersInfo = ({ profileInfo }: { profileInfo: ProfileInfoI | undefined }) => {
    const posts = profileInfo?.insta_posts;
    let postsStr = "";

    const postsCount = posts?.length || 0;
    const postsCountStr = postsCount.toString();
    const lastDigit = +postsCountStr[postsCountStr.length - 1];
    const [isFollowSuccess, setIsFollowSuccess] = useState(false);

    switch (lastDigit) {
        case 1:
            postsStr = 'допис';
            break;
        case 2:
        case 3:
        case 4:
            postsStr = 'дописи';
            break;
        default:
            postsStr = 'дописів';
    }

    const { followingUser } = useGetFollowing(profileInfo?.id, isFollowSuccess);
    const { followerUser } = useGetFollowers(profileInfo?.id, isFollowSuccess);
    const [followingModal, setFollowingModal] = useState(false);
    const [followersModal, setFollowersModal] = useState(false);

    function toggleFollow() {
        setIsFollowSuccess(!isFollowSuccess);
    }

    return (
        <div className='flex gap-6'>
            <p>
                <b className='text-black font-bold'>{posts?.length || 0}</b> <span className='text-ig-secondary-text'>{postsStr}</span>
            </p>
            <button className="cursor-pointer" onClick={() => setFollowersModal(true)}>
                <span className='text-ig-secondary-text'>Читачі: </span> 
                <b className='text-black font-bold'>
                    {followerUser?.Following?.length}
                </b>
            </button>
            <button className="cursor-pointer" onClick={() => setFollowingModal(true)}>
                <span className='text-ig-secondary-text'>Стежить: </span> 
                <b className='text-black font-bold'>
                    {followingUser?.Followers?.length}
                </b>
            </button>
            {(followingModal && profileInfo && followingUser) && (
                <Modal onClose={() => setFollowingModal(false)} styleProps={{ width: '50%'}}>
                    <FollowersBlock
                      users={followingUser?.Followers}
                      handleClose={() => setFollowingModal(false)}
                      text="Відстежується"
                      toggleFollow={toggleFollow}
                    />
                </Modal>
            )}
            {(followersModal && profileInfo && followerUser) && (
                <Modal onClose={() => setFollowersModal(false)} styleProps={{ width: '50%'}}>
                    <FollowersBlock
                      users={followerUser?.Following}
                      handleClose={() => setFollowersModal(false)}
                      text="Читачі"
                      toggleFollow={toggleFollow}
                    />
                </Modal>
            )}
        </div>
    )
}

export default FollowersInfo