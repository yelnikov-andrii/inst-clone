import { useDispatch } from "react-redux";
import { fetchWithAuth } from "../../utils/fetchWithAuth"
import { url } from "../../utils/url"
import { setSelectedChat } from "../../features/chats/chatsSlice";

export const useGetSelectedChat = () => {
    const dispatch = useDispatch();
    async function getSelectedChat(recipientId: number) {
        try {
            const response = await fetchWithAuth(`${url}/chats-by-user/${recipientId}`);
            if (response.ok) {
                const res = await response.json();
                dispatch(setSelectedChat(res));
            }
        } catch(e) {
            console.log(e);
        }
    }

    return { getSelectedChat };
}