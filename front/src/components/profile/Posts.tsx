import PostsDefault from './PostsDefault';

const Posts = () => {
    const postsAreExist = false;
  return (
    <div className='pt-10 pb-6'>
        {postsAreExist ? null : (
            <PostsDefault />
        )}
    </div>
  )
}

export default Posts