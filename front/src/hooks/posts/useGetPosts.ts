import { useDispatch } from "react-redux"
import { url } from "../../utils/url";
import { getPosts } from "../../features/posts/postsSlice";

export const useGetPosts = () => {
    const dispatch = useDispatch();

    async function getAllPosts(user: UserI) {
        if (!user) {
            return;
        }
        try {
            const response = await fetch(`${url}/posts?user_id=${user?.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json"
                }
            });

            if (response.ok) {
                const res = await response.json();

                if (res) {
                    dispatch(getPosts(res.posts));
                }
            }
        } catch(e) {
            console.log(e);
        }
    }

    return { getAllPosts };
}