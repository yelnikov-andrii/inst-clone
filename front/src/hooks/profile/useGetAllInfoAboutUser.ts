import { useEffect, useState } from "react"
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import { url } from "../../utils/url";

export const useGetAllInfoAboutUser = (nickname: string | undefined) => {
    const [profileInfo, setProfileInfo] = useState<ProfileInfoI>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function getInfoAboutUser(nickname: string | undefined) {
        try {
            setLoading(true);
            if (!nickname) {
                setError("Невірний нікнейм")
            }
            const response = await fetchWithAuth(`${url}/user-profile/${nickname}`);

            if (response.ok) {
                const profileInfoFromServer = await response.json();
                setProfileInfo(profileInfoFromServer);
            } else {
                setError("Не вдалося отримані дані про профіль")
            }

        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError("Помилка при отриманні профілю")
            }
        } finally {
            setLoading(false);
            setTimeout(() => {
                setError('')
            }, 3500);
        }
    }

    useEffect(() => {
        getInfoAboutUser(nickname);
    }, [nickname])

    return { loading, error, profileInfo };
}