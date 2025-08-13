import { useEffect, useState } from "react"
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import { url } from "../../utils/url";

export const useGetFollowing = (userId: number | undefined, followSucces?: boolean) => {
    const [followingUser, setFollowingUser] = useState<FollowingUserI>();

    async function getMyFollowings(userId: number) {
        try {
            const response = await fetchWithAuth(`${url}/followers?followingId=${userId}`);
            const res = await response.json();
            setFollowingUser(res);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (userId) {
            getMyFollowings(userId);
        }
    }, [userId, followSucces])

    return { followingUser }
}