import PostCard from './PostCard'
import { useGetFeed } from '../../hooks/feed/useGetFeed'
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';

const Feed = () => {
    useGetFeed();
    const feedError = useSelector((state: RootState) => state.feed.error);
    const feed = useSelector((state: RootState) => state.feed.feed);

    if (feedError) {
        return (
            <div>
                <p className='text-center font-semibold text-red-500'>
                    {feedError}
                </p>
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-20 items-center w-full'>
            {feed?.map((feedItem: FeedItemI) => (
                <PostCard 
                  feedItem={feedItem}
                  key={feedItem.id}
                />
            ))}
        </div>
    )
}

export default Feed