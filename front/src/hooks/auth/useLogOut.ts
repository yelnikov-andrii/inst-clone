import { useDispatch } from "react-redux";
import { url } from "../../utils/url"
import { logOut } from "../../features/auth/authSlice";
import { useNavigate } from "react-router";

export const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function logout() {
        try {
            await fetch(`${url}/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
        } catch (e) {
            console.error(e);
        } finally {
            localStorage.removeItem('inst_accessToken');
            localStorage.removeItem('inst_user');
            dispatch(logOut());
            console.log('finally')
            navigate('/accounts/login');
        }
    }

    return logout;
}