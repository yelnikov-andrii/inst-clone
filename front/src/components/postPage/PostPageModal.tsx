import { useState } from 'react'
import Modal from '../ui/Modal'
import { useNavigate } from 'react-router';
import { useResize } from '../../hooks/useResize';
import PostPageInfo from './PostPageInfo';

const PostPageModal = ({ post }: { post: PostI }) => {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();

    const { screenWidth } = useResize(768);

    if (open) {
        return (
            <Modal onClose={() => {
                setOpen(false);
                navigate(-1);
            }}
                styleProps={{ maxWidth: screenWidth ? '60%' : '90%', width: '100%', maxHeight: '90vh', height: '100%' }}
            >
                <div className='flex flex-col md:flex-row h-full'>
                    <PostPageInfo
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