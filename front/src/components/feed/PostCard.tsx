import PostHeader from './PostHeader';
import PostMedia from './PostMedia';
import PostFooter from './PostFooter';

const PostCard = ({ feedItem }: { feedItem: FeedItemI }) => {
    return (
        <article className='w-full border-b border-b-ig-stroke py-6'>
            <PostHeader feedItem={feedItem} />
            <PostMedia media={feedItem.post_media} />
            <PostFooter feedItem={feedItem} />
        </article>
    )
}

export default PostCard