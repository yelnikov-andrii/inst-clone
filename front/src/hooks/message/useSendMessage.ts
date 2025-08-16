import { useState } from "react"
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import { url } from "../../utils/url";

export const useSendMessage = () => {
    const [messageLoading, setMessageLoading] = useState(false);
    const [messageError, setMessageError] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    async function sendMessage(text: string, chatId: number, recipientId: number | undefined) {
        try {
            setMessageLoading(true);
            setMessageError("");
            if (!recipientId) {
                setMessageError("Невідомий користувач");
            }
            
            const response = await fetchWithAuth(`${url}/messages`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ chatId, recipientId, text })
            });

            if (response.ok) {
                setIsSuccess(!isSuccess);
            } else {
                setMessageError("Не вдалося відправити повідомлення")
            }
        } catch(e) {
            if (e instanceof Error) {
                setMessageError(e.message);
            } else {
                setMessageError("Не вдалося відправити повідомлення")
            }
        } finally {
            setMessageLoading(false);
        }
    }

    return {
        sendMessage,
        messageError,
        messageLoading,
        isSuccess
    }
}