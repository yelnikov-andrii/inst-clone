import { useState } from "react";
import { url } from "../utils/url";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { useGetMe } from "./auth/useGetMe";
import { fetchWithAuth } from "../utils/fetchWithAuth";

export const useSendMyInfo = () => {
    const myInfo = useSelector((state: RootState) => state.myInfo.myInfo);
    const [fetchingData, setFetchingData] = useState({
        loading: false,
        error: ''
    });
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const { getUserInfo } = useGetMe();

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
            const response = await fetchWithAuth(`${url}/userinfo`, {
                method: myInfo ? "PATCH" : "POST",
                credentials: 'include',
                body: formData

            });

            if (!response.ok) {
                setFetchingData(prev => ({ ...prev, error: "Не вдалося оновити дані" }));
            } else {
                setSnackbarMessage("Профіль оновлено");
            }
        } catch (e: unknown) {
            if (e instanceof Error) {
                setFetchingData(prev => ({ ...prev, error: e.message }))
            } else {
                setFetchingData(prev => ({ ...prev, error: "Помилка при відправці даних" }))
            }

        } finally {
            setFetchingData(prev => ({ ...prev, loading: false }));
            setTimeout(() => {
                setSnackbarMessage("");
                if (user) {
                    getUserInfo(user.id);
                }

            }, 3500)
        }
    }

    return { fetchingData, setFetchingData, sendUserInfo, snackbarMessage };
}