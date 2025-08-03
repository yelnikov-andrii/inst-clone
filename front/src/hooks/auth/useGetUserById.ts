import { url } from "../../utils/url";
import { useState } from "react";

export const useGetUserById = () => {
    const [user, setUser] = useState<UserI>();

    async function getUserById(userId: number) {
        try {
            const response = await fetch(`${url}/userinfo/${userId}`);
            if (response.ok) {
                const res = await response.json();
                setUser(res);
            }
        } catch (e) {
            console.error(e);
        }
    }

    return { getUserById, user }; 
}