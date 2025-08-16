import { useState } from "react"
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import { url } from "../../utils/url";

export const useGetMessages = () => {
    const [messages, setMessages] = useState<MessageI[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function getMessages(chatId: number) {
        try {
            setLoading(true);
            const response = await fetchWithAuth(`${url}/messages?chatId=${chatId}`);
            if (response.ok) {
                const res = await response.json();
                setMessages(res);
            }
        } catch(e) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError("Не вдалося отримати повідомлення");
            }
        } finally {
            setLoading(false);
        }
    }

    return { messages, loading, error, getMessages };
}