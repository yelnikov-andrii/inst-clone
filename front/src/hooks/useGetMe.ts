import { useDispatch } from "react-redux";
import { url } from "../utils/url";
import { getMyInfo } from "../features/myInfo/myInfoSlice";

export const useGetMe = () => {
    const dispatch = useDispatch();

    async function getUserInfo(userId: number) {
        try {
            const response = await fetch(`${url}/userinfo/${userId}`);
            if (response.ok) {
                const res = await response.json();
                dispatch(getMyInfo(res));
            }
        } catch (e) {
            console.error(e);
        }
    }

    return { getUserInfo }; 
}