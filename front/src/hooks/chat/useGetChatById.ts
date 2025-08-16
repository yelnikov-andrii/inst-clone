import { useDispatch } from "react-redux"
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import { url } from "../../utils/url";
import { setSelectedChat } from "../../features/chats/chatsSlice";

export const useGetChatById = () => {
    const dispatch = useDispatch();

    async function getChatById(chatId: number) {
        try {
            const response = await fetchWithAuth(`${url}/chats/${chatId}`);

            if (response.ok) {
                const chat = await response.json();
                dispatch(setSelectedChat(chat));
            }
        } catch(e) {
            console.log(e);
        }
    }

    return { getChatById };
}