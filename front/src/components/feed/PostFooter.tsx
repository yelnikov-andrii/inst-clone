import PostFooterButton from './PostFooterButton'
import { CommentIcon, HeartIcon, ShareIcon } from '../icons'
import { Link } from 'react-router'
import { useLikePost } from '../../hooks/likes/useLikePost'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../app/store'
import LikesCount from '../common/LikesCount'

const PostFooter = ({ feedItem }: { feedItem: FeedItemI }) => {
    const [count, setCount] = useState(0);
    const user = useSelector((state: RootState) => state.auth.user);
    const [liked, setLiked] = useState(false);

    const { likePost } = useLikePost(feedItem.id, setCount);

    function handleLike() {
        if (user && feedItem) {
            likePost(feedItem.id, user.id);

            if (liked) {
                setCount(prev => prev - 1);
                setLiked(false);
            } else {
                setCount(prev => prev + 1);
                setLiked(true);
            }
        }
    }

    console.log(feedItem, 'feed items')

    return (
        <div className='mt-4'>
            <div className='flex gap-4 items-center mb-2'>
                <PostFooterButton onClick={handleLike}>
                    <HeartIcon active={liked} color={liked ? "red" : ""} />
                </PostFooterButton>
                <Link to={`/p/${feedItem.id}/comments`}>
                    <CommentIcon />
                </Link>
                <PostFooterButton onClick={() => { console.log('share') }}>
                    <ShareIcon />
                </PostFooterButton>
            </div>
            <LikesCount count={count} />
            <div className='mb-2'>
                <b className='font-bold mr-1'>{feedItem.Insta_User.nickname}</b>
                {feedItem.description}
            </div>
            {feedItem?.comment_insts?.length > 0 && (
                <div className='mb-1'>
                    <Link to={`/p/${feedItem.id}/comments`} className='text-ig-secondary-text'>
                        Переглянути всі коментарі: {feedItem.comment_insts.length}
                    </Link>
                </div>
            )}
            <form>
                <input
                    className='w-full placeholder:text-ig-secondary-text border-none outline-none py-1'
                    placeholder='Додати коментар...'
                />
            </form>
        </div>
    )
}

export default PostFooter