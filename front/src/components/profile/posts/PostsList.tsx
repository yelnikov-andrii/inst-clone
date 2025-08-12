import Post from '../../common/Post';

const PostsList = ({ posts }: { posts: PostI[]}) => {
    return (
        <div className='flex flex-wrap'>
            {posts?.map(post => (
                <Post post={post} key={post.id} />
            ))}
        </div>
    )
}

export default PostsList