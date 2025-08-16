import { fetchWithAuth } from "../../utils/fetchWithAuth"
import { useState } from "react";
import { url } from "../../utils/url";
import { useDispatch } from "react-redux";
import { setSelectedChat } from "../../features/chats/chatsSlice";

export const useCreateChat = () => {
    const [isCreated, setIsCreated] = useState(false);
    const dispatch = useDispatch();

    async function createChat(selectedUser: UserI) {
        try {
            const response = await fetchWithAuth(`${url}/chats`, {
                method: "POST",
                body: JSON.stringify({ recipientId: selectedUser?.id }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                const res = await response.json();
                if (res.message) {
                    setIsCreated(!isCreated);
                } else {
                    dispatch(setSelectedChat(res));

                }
            }
        } catch(e) {
            console.log(e);
        }
    }

    return { createChat, isCreated };
}