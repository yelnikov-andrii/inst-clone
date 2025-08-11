import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { url } from "../../utils/url";
import { getFeedError, getFeedFromServer } from "../../features/feed/feedSlice";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

export const useGetFeed = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();

    async function getFeed() {
        try {
            if (!user) {
                return;
            }

            const response = await fetchWithAuth(`${url}/feed/${user.id}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            });

            if (response.ok) {
                const res = await response.json();
                dispatch(getFeedFromServer(res));
            }
        } catch (e) {
            if (e instanceof Error) {
                dispatch(getFeedError(e.message))
            } else {
                dispatch(getFeedError("Помилка при отриманні стрічки новин"))
            }
        }
    }

    useEffect(() => {
        if (user) {
            console.log('get feed in useeffect')
            getFeed();
        }
    }, [user]);

    return { getFeed };
}