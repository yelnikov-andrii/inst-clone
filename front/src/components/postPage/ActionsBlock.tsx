import { CommentIcon, HeartIcon, SavedIcon } from '../icons'
import DateCreated from '../common/DateCreated';
import Globalsnackbar from '../common/Globalsnackbar';
import { useLikePost } from '../../hooks/likes/useLikePost';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { useEffect, useState } from 'react';
import { useGetLikeStatus } from '../../hooks/likes/useGetLikeStatus';

const ActionsBlock = ({ post, handleFocusInput }: { post: PostI, handleFocusInput: () => void }) => {
    const { likesCount, likeStatus, getLikes, error } = useGetLikeStatus();
    const { error: errorLike, likePost } = useLikePost();
    const user = useSelector((state: RootState) => state.auth.user);
    const [liked, setLiked] = useState(false);
    const [count, setCount] = useState(0);

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
        if (user && post) {
            getLikes(post.id, user.id);
        }
    }, [user, post]);

    useEffect(() => {
        if (likeStatus) {
            setLiked(true);
        } else {
            setLiked(false);
        }

        setCount(likesCount);
    }, [likeStatus, likesCount]);

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
                    <button>
                        <SavedIcon />
                    </button>
                </div>
            </div>
            <div>
                {count > 0 ? (<p className='font-semibold'>{`${count} вподобань`}</p>) : (<><p>Станьте першим, хто <button className='text-black font-medium'>вподобає це</button></p></>)}
            </div>
            <DateCreated post={post} />
            {error && (
                <Globalsnackbar text={error} />
            )}
            {errorLike && (
                <Globalsnackbar text={errorLike} />
            )}
        </div>
    )
}

export default ActionsBlock