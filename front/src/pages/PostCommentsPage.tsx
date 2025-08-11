import { useParams } from "react-router"
import Sidebar from "../components/layout/Sidebar"
import { useGetPost } from "../hooks/posts/useGetPost";
import { useEffect } from "react";
import { useGetPostComments } from "../hooks/comments/useGetPostComments";
import PostComments from "../components/postComments/PostComments";
import GlobalLoader from "../components/common/GlobalLoader";

const PostCommentsPage = () => {
    const { postId } = useParams();
    const { getPost, post, loading } = useGetPost();
    const { comments, getPostComments } = useGetPostComments();

    useEffect(() => {
        if (postId) {
            getPost(+postId);
        }
    }, [postId]);

    useEffect(() => {
        if (post) {
            getPostComments(post.id);
        }
    }, [post]);

    if (loading) {
        return (
            <section className='flex flex-col md:flex-row'>
                <div className="w-full h-[72px] fixed z-30 bottom-0 left-0 right-0 md:relative md:h-screen max-w-[72px] 2xl:max-w-[244px]">
                    <Sidebar />
                </div>
                <div className='grow-1'>
                    <main className='py-6 px-3'>
                        <GlobalLoader />
                    </main>
                </div>
            </section>
        )
    }

    return (
        <section className='flex flex-col md:flex-row'>
            <div className="w-full h-[72px] fixed z-30 bottom-0 left-0 right-0 md:relative md:h-screen max-w-[72px] 2xl:max-w-[244px]">
                <Sidebar />
            </div>
            <div className='grow-1'>
                <main className='py-6 px-3'>
                    <PostComments
                        post={post}
                        comments={comments}
                        getPostComments={getPostComments}
                    />
                </main>
            </div>
        </section>
    )
}

export default PostCommentsPage