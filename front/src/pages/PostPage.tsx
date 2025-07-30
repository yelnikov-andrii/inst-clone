import { useParams } from 'react-router';
import PostPageDefault from '../components/postPage/PostPageDefault';
import PostPageModal from '../components/postPage/PostPageModal';
import { useResize } from '../hooks/useResize'
import { useGetPost } from '../hooks/useGetPost';
import { useEffect } from 'react';
import GlobalLoader from '../components/common/GlobalLoader';

const PostPage = () => {
    const { screenWidth } = useResize(425);
    const { postId } = useParams();

    const { post, getPost, loading } = useGetPost();

    useEffect(() => {
        if (postId) {
            getPost(+postId);
        }
    }, [postId]);

    if (loading) {
        return (
            <GlobalLoader />
        )
    }

    if (!post) {
        return (
            <div className='h-screen flex justify-center items-center text-red-500 font-bold text-4xl'>
                Неочікувана помилка
            </div>
        )
    }

    if (screenWidth) {
        return (
            <PostPageDefault post={post} />
        )
    }

  return (
    <PostPageModal post={post} />
  )
}

export default PostPage