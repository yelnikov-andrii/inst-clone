import Sidebar from '../layout/Sidebar';
import { LeftArrow } from '../icons';
import { useNavigate } from 'react-router';
import PostPageInfo from './PostPageInfo';

const PostPageDefault = ({ post }: { post: PostI }) => {
  const navigate = useNavigate();

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
            <PostPageInfo
              post={post}
            />
          </div>
        </main>
      </div>
    </section>
  )
}

export default PostPageDefault