import PostCard from './PostCard'
import Card1 from '../../images/postcard1.jpg'
import Card2 from '../../images/postcard2.jpg'
import Card3 from '../../images/postcard3.jpg'
import Card4 from '../../images/postcard4.jpg'

const Feed = () => {
    return (
        <div className='flex flex-col gap-20 items-center w-full'>
            <PostCard post={{ images: [Card1, Card2] }} />
            <PostCard post={{ images: [Card2] }} />
            <PostCard post={{ images: [Card3] }} />
            <PostCard post={{ images: [Card4] }} />
        </div>
    )
}

export default Feed