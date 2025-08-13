import { useState } from "react"
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import { url } from "../../utils/url";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

export const useFollowUser = () => {
    const [followError, setFollowError] = useState("");
    const [followLoading, setFollowLoading] = useState(false);
    const [followSuccess, setFollowSuccess] = useState(false);
    const user = useSelector((state: RootState) => state.auth.user);

    async function followUser(userIdToFoolow: number) {
        try {
            setFollowLoading(true);
            const response = await fetchWithAuth(`${url}/followers`, {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({ followingId: user?.id, followerId: userIdToFoolow }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                setFollowSuccess(!followSuccess);
            }
        } catch (e) {
            if (e instanceof Error) {
                setFollowError(e.message);
            } else {
                setFollowError("Помилка, неможливо підписатися на користувача")
            }
        } finally {
            setFollowLoading(false);
            setTimeout(() => {
                setFollowError('');
            }, 3500);
        }
    }

    return {
        followError,
        followLoading,
        followUser,
        followSuccess
    }
}