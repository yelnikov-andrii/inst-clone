import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { saveData } from "../../utils/saveData";
import { logIn } from "../../features/auth/authSlice";

export const useAuth = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function auth(endpoint: string, body: any) {
        try {
            setLoading(true);
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const res = await response.json();
                setError(res.message);
            } else {
                const res = await response.json();
                saveData(res.accessToken, JSON.stringify(res.user));
                dispatch(logIn({ user: res.user, accessToken: res.accessToken }))
                navigate('/')
            }

        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }

    return { auth, loading, error, setError };

}