import { useEffect, useState } from 'react'
import Modal from '../ui/Modal'
import { useGetPostsImages } from '../../hooks/posts/useGetPostsImages';
import { useNavigate } from 'react-router';
import { useResize } from '../../hooks/useResize';
import PostPageInfo from './PostPageInfo';

const PostPageModal = ({ post }: { post: PostI }) => {
    const [open, setOpen] = useState(true);
    const { images, error, getImages } = useGetPostsImages();
    const navigate = useNavigate();

    const { screenWidth } = useResize(768);

    useEffect(() => {
        if (post) {
            getImages(post);
        }

    }, [post]);

    if (open) {
        return (
            <Modal onClose={() => {
                setOpen(false);
                navigate(-1);
            }}
                styleProps={{ maxWidth: screenWidth ? '60%' : '90%', width: '100%', maxHeight: '90vh', height: '100%' }}
            >
                {error && (
                    <div className='text-red-500 font-bold text-3xl'>
                        {error}
                    </div>
                )}
                <div className='flex flex-col md:flex-row h-full'>
                    <PostPageInfo 
                       images={images}
                       post={post}
                    />
                </div>
            </Modal>
        )
    } else {
        return null
    }


}

export default PostPageModal