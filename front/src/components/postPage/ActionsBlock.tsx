import { CommentIcon, HeartIcon, SavedIcon } from '../icons'
import DateCreated from '../common/DateCreated';
import Globalsnackbar from '../common/Globalsnackbar';
import { useLikePost } from '../../hooks/likes/useLikePost';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { useEffect, useState } from 'react';
import { useSavePost } from '../../hooks/saved/useSavePost';
import { useGetPostSavedStatus } from '../../hooks/saved/useGetPostSavedStatus';
import LikesCount from '../common/LikesCount';

const ActionsBlock = ({ post, handleFocusInput }: { post: PostI, handleFocusInput: () => void }) => {
    const [count, setCount] = useState(0);
    const { error: errorLike, likePost, errorGetLikes } = useLikePost(post.id, setCount);
    const user = useSelector((state: RootState) => state.auth.user);
    const [liked, setLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const { savedStatus } = useGetPostSavedStatus(post, user);

    const { savePost } = useSavePost(post);
 
    function handleLike() {
        if (user && post) {
            likePost(post.id, user.id);

            if (liked) {
                setCount(prev => prev - 1);
                setLiked(false);
            } else {
                setCount(prev => prev + 1);
                setLiked(true);
            }
        }
    }

    useEffect(() => {
        if (savedStatus) {
            setIsSaved(true);
        } else {
            setIsSaved(false);
        }
    }, [savedStatus])

    function handleSavePost() {
        if (post && user) {
            savePost(post, user);
        }
    }

    return (
        <div>
            <div className='flex justify-between mb-4'>
                <div className='flex gap-4 items-center'>
                    <button onClick={handleLike}>
                        <HeartIcon active={liked} color={liked ? "red" : ""} />
                    </button>
                    <button onClick={handleFocusInput}>
                        <CommentIcon />
                    </button>
                </div>
                <div>
                    <button onClick={handleSavePost}>
                        <SavedIcon active={isSaved} />
                    </button>
                </div>
            </div>
            <LikesCount count={count} />
            <DateCreated createdAt={post.createdAt} />
            {(errorGetLikes || errorLike) && (
                <Globalsnackbar text={errorLike ? errorLike : errorGetLikes} />
            )}
        </div>
    )
}

export default ActionsBlock