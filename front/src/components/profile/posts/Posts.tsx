import { useEffect } from 'react';
import { useGetPosts } from '../../../hooks/useGetPosts';
import PostsDefault from './PostsDefault';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import PostsList from './PostsList';

const Posts = () => {
  const { getAllPosts } = useGetPosts();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (user) {
      getAllPosts(user);
    }

  }, [user]);

  console.log(posts, 'posts form store')

  return (
    <div className='pt-10 pb-6'>
      {(posts && posts.length > 0) ? <PostsList /> : (
        <PostsDefault />
      )}
    </div>
  )
}

export default Posts