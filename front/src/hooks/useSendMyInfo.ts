import { useState } from "react";
import { url } from "../utils/url";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

export const useSendMyInfo = () => {
    const myInfo = useSelector((state: RootState) => state.myInfo.myInfo);
    const [fetchingData, setFetchingData] = useState({
        loading: false,
        error: ''
    });
    const [snackbarMessage, setSnackbarMessage] = useState('');

    async function sendUserInfo(file: File | null, user: UserI | null, userData: MyInfoI) {
        const formData = new FormData();
        if (file) {
            formData.append('avatar', file);
        }

        if (user) {
            formData.append('userId', user?.id.toString())
        }

        formData.append('bio', userData.bio);
        formData.append('gender', userData.gender);
        formData.append('showRecommendations', userData.showRecommendations ? "true" : "false");
        formData.append("website", "");

        try {
            setFetchingData(prev => ({ ...prev, loading: true }));
            const response = await fetch(`${url}/userinfo`, {
                method: myInfo ? "PATCH" : "POST",
                credentials: 'include',
                body: formData

            });

            if (!response.ok) {
                setFetchingData(prev => ({ ...prev, error: "Не вдалося оновити дані" }));
            } else {
                setSnackbarMessage("Профіль оновлено");
            }
        } catch (e: any) {
            setFetchingData(prev => ({ ...prev, error: e.message || "Помилка при відправці даних" }))
        } finally {
            setFetchingData(prev => ({ ...prev, loading: false }));
            setTimeout(() => {
                setSnackbarMessage("");
            }, 3500)
        }
    }

    return { fetchingData, setFetchingData, sendUserInfo, snackbarMessage };
}