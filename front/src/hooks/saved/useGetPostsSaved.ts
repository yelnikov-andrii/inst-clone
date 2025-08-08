import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { url } from "../../utils/url";

export const useGetPostsSaved = () => {
    const [savedPosts, setSavedPosts] = useState<SavedPostI[]>([]);
    const [error, setError] = useState('');
    const user = useSelector((state: RootState) => state.auth.user);

    async function getSavedPosts() {
        try {
            if (!user) {
                setError("Невідомий користувач")
            } else {
                const response = await fetch(`${url}/posts-saved?userId=${user.id.toString()}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    const savedPosts = await response.json();
                    console.log(savedPosts, 'savedPosts')
                    setSavedPosts(savedPosts);
                } else {
                    setError("Помилка при отриманні постів")
                }
            }
        } catch (e) {
            console.log(e, 'error get posts saved')
            setError(e?.message || "Невідома помилка");
        } finally {
            setTimeout(() => {
                setError('');
            }, 3500);
        }
    }

    useEffect(() => {
        if (user) {
            getSavedPosts();
        }
    }, [user]);

    return { savedPosts, error };
}