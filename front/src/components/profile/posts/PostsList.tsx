import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import Post from '../../common/Post';

const PostsList = () => {
    const posts = useSelector((state: RootState) => state.posts.posts);

    return (
        <div className='flex flex-wrap'>
            {posts.map(post => (
                <Post post={post} key={post.id} />
            ))}
        </div>
    )
}

export default PostsList