import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { url } from "../../utils/url";

export const useGetFeed = () => {
    const [feed, setFeed] = useState<FeedItemI[]>([]);
    const [feedError, setFeedError] = useState('');
    const user = useSelector((state: RootState) => state.auth.user);

    async function getFeed() {
        try {
            if (!user) {
                return;
            }

            const response = await fetch(`${url}/feed/${user.id}`, {
                headers: {
                    "Content-Type": 'application/json'
                },
                credentials: 'include'
            });

            if (response.ok) {
                const res = await response.json();
                setFeed(res);
            }
        } catch(e) {
            if (e instanceof Error) {
                setFeedError(e.message);
            } else {
                setFeedError("Помилка при отриманні стрічки новин")
            }
        }
    }

    useEffect(() => {
        if (user) {
            getFeed();
        }
    }, [user]);

    return { feed, feedError };
}