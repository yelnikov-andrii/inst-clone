import { useDispatch } from "react-redux"
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import { url } from "../../utils/url";
import { getChats, getChatsError, getChatsSuccess } from "../../features/chats/chatsSlice";

export const useGetAllChats = () => {
    const dispatch = useDispatch();

    async function getAllChats() {
        try {
            dispatch(getChats());
            const response = await fetchWithAuth(`${url}/chats`);

            if (response.ok) {
                const res = await response.json();
                dispatch(getChatsSuccess(res));
            } else {
                dispatch(getChatsError("Не вдалося завантажити чати"))
            }
        } catch(e: unknown) {
            if (e instanceof Error) {
                dispatch(getChatsError(e.message));
            } else {
                dispatch(getChatsError("Не вдалося завантажити чати"))
            }
        }
    }

    return { getAllChats };
}