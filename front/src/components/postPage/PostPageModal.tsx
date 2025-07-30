import { useEffect, useState } from 'react'
import Modal from '../ui/Modal'
import { useGetPostsImages } from '../../hooks/useGetPostsImages';
import { useNavigate } from 'react-router';
import { url } from '../../utils/url';
import Avatar from '../common/Avatar';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import DateCreated from '../common/DateCreated';
import ActionsBlock from './ActionsBlock';
import InlineButton from '../ui/InlineButton';
import { useResize } from '../../hooks/useResize';

const PostPageModal = ({ post }: { post: PostI }) => {
    const [open, setOpen] = useState(true);
    const { images, error, getImages } = useGetPostsImages();
    const navigate = useNavigate();
    const myInfo = useSelector((state: RootState) => state.myInfo.myInfo);
    const user = useSelector((state: RootState) => state.auth.user);

    const { screenWidth } = useResize(768);

    const [comment, setComment] = useState('');

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
                styleProps={{ maxWidth: screenWidth ? '60%' : '90%', width: '100%' }}
            >
                {error && (
                    <div className='text-red-500 font-bold text-3xl'>
                        {error}
                    </div>
                )}
                <div className='flex flex-col md:flex-row'>
                    <img src={`${url}/${images[0]?.filename}`} className='object-cover w-full max-h-[335px] md:max-h-none md:w-1/2' />
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
                                    onChange={(e) => {setComment(e.target.value)}}
                                />
                                <div className='absolute right-2 top-1/2 -translate-y-1/2'>
                                    <InlineButton title='Опублікувати' onClick={() => { }} disabled={!comment} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    } else {
        return null
    }


}

export default PostPageModal