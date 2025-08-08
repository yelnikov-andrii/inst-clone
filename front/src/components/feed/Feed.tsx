import PostCard from './PostCard'
import { useGetFeed } from '../../hooks/feed/useGetFeed'

const Feed = () => {
    const { feed, feedError } = useGetFeed();
    console.log(feed, 'feed');

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