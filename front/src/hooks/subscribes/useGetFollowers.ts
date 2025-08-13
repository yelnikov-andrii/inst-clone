import { useEffect, useState } from "react"
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import { url } from "../../utils/url";

export const useGetFollowers = (userId: number | undefined, followSucces?: boolean) => {
    const [followerUser, setFollowerUser] = useState<FollowerUserI>();

    async function getMyFollowers(userId: number) {
        try {
            const response = await fetchWithAuth(`${url}/followers?followerId=${userId}`);
            const res = await response.json();
            setFollowerUser(res);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (userId) {
            getMyFollowers(userId);
        }
    }, [userId, followSucces])

    return { followerUser }
}