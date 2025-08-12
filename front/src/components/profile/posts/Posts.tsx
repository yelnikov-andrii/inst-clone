import { CameraIcon } from '../../icons';
import PostsDefault from './PostsDefault';
import PostsList from './PostsList';
import { useOutletContext } from 'react-router';

type ProfileOutletContext = {
  isMyProfile: boolean;
  profileInfo: ProfileInfoI;
}

const Posts = () => {
  const { isMyProfile, profileInfo } = useOutletContext<ProfileOutletContext>();
  
  if (isMyProfile && profileInfo?.insta_posts.length === 0) {
    return (
      <div className='pt-10 pb-6'>
        <PostsDefault />
      </div>
    )
  }

  if (!isMyProfile && profileInfo?.insta_posts.length === 0) {
    return (
      <div className='pt-10 pb-6'>
        <div className='flex justify-center items-center'>
          <CameraIcon />
          <h2 className='font-bold text-3xl my-6'>
            Ще немає дописів
          </h2>
        </div>
      </div>
    )
  }

  return (
    <div className='pt-10 pb-6'>
      <PostsList posts={profileInfo?.insta_posts} />
    </div>
  )
}

export default Posts