import Sidebar from '../layout/Sidebar'
import { useEffect, useState } from 'react'
import { useGetPostsImages } from '../../hooks/useGetPostsImages';
import { url } from '../../utils/url';
import Avatar from '../common/Avatar';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import DateCreated from '../common/DateCreated';
import ActionsBlock from './ActionsBlock';
import InlineButton from '../ui/InlineButton';
import { LeftArrow } from '../icons';
import { useNavigate } from 'react-router';

const PostPageDefault = ({ post }: { post: PostI }) => {
  const { images, error, getImages } = useGetPostsImages();
  const myInfo = useSelector((state: RootState) => state.myInfo.myInfo);
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  const [comment, setComment] = useState('');

  useEffect(() => {
    if (post) {
      getImages(post);
    }

  }, [post]);

  function back() {
    navigate(-1);
  }
  return (
    <section className='flex flex-col md:flex-row'>
      <div className="w-full h-[72px] fixed z-30 bottom-0 left-0 right-0 md:relative md:h-screen max-w-[72px] 2xl:max-w-[244px]">
        <Sidebar />
      </div>
      <div className='grow-1'>
        <main className='py-6 px-3'>
          {error && (
            <div className='text-red-500 font-bold text-3xl'>
              {error}
            </div>
          )}
          <div className='pb-4 border-b border-b-ig-secondary-text flex justify-between items-center font-medium'>
            <button onClick={back}>
              <LeftArrow />
            </button>
            <p>
              Допис
            </p>
            <div></div>
          </div>
          <div className='flex flex-col md:flex-row'>
            <img src={`${url}/${images[0]?.filename}`} className='object-cover w-full max-h-[335px] md:w-1/2' />
            <div className='w-full md:w-1/2 md:py-4 md:px-10 flex flex-col justify-between mt-4 md:mt-0'>
              <div className='hidden md:block'>
                <div className='flex gap-4 items-center mb-2 xl:mb-6'>
                  <Avatar src={myInfo?.avatar ? `${url}/${myInfo?.avatar}` : ''} width={32} height={32} />
                  <b className='text-black md:text-lg font-medium'>
                    {user?.nickname}
                  </b>
                </div>
                <div className='flex gap-4'>
                  <Avatar src={myInfo?.avatar ? `${url}/${myInfo?.avatar}` : ''} width={32} height={32} />
                  <div>
                    <div className='flex gap-1'>
                      <b className='text-black xl:text-lg font-medium'>
                        {user?.nickname}
                      </b>
                      <p className='xl:text-lg text-black'>
                        {post.description}
                      </p>
                    </div>
                    <DateCreated post={post} mini />
                  </div>
                </div>
              </div>
              <div>
                <ActionsBlock post={post} />
                <div className='mt-2 relative h-8'>
                  <textarea
                    className='w-full pr-20 placeholder:text-ig-secondary-text p-1 h-full'
                    placeholder='Додайте коментар...'
                    value={comment}
                    onChange={(e) => { setComment(e.target.value) }}
                  />
                  <div className='absolute right-2 top-1/2 -translate-y-1/2'>
                    <InlineButton title='Опублікувати' onClick={() => { }} disabled={!comment} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  )
}

export default PostPageDefault