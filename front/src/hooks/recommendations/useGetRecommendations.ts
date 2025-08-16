import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import { url } from "../../utils/url";

export const useGetRecommendations = (followSuccess: boolean) => {
    const [recommendations, setRecommendations] = useState<UserI[]>();
    const [errorRecommendations, setErrorRecommendations] = useState("");
    const [loading, setLoading] = useState(false);
    const user = useSelector((state: RootState) => state.auth.user);

    async function getRecommendations(userId: number) {
        try {
            setErrorRecommendations('');
            setLoading(true);
            const response = await fetchWithAuth(`${url}/followers-recommendations/${userId}`);
            if (response.ok) {
                const res = await response.json();
                setRecommendations(res);
            } else {
                setErrorRecommendations("Не вдалося завантажити рекомендації")
            }
        } catch (e: unknown) {
            if (e instanceof Error) {
                setErrorRecommendations(e.message);
            } else {
                setErrorRecommendations("Не вдалося завантажити рекомендації")
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user) {
            getRecommendations(user.id);
        }
    }, [user, followSuccess]);

    return { recommendations, loading, errorRecommendations };
}