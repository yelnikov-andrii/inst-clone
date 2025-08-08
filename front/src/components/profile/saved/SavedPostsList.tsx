import { useGetPostsSaved } from '../../../hooks/saved/useGetPostsSaved';
import Globalsnackbar from '../../common/Globalsnackbar';
import Post from '../../common/Post';

const SavedPostsList = () => {
    const { savedPosts, error } = useGetPostsSaved();

    return (
        <>
            <div className='flex'>
                {savedPosts.map((post: SavedPostI) => (
                    <div key={post.id} className='w-1/3'>
                        <Post
                            post={post.insta_post}
                        />
                    </div>
                ))}
            </div>
            {error && (
                <Globalsnackbar text={error} />
            )}
        </>

    )
}

export default SavedPostsList