/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from 'react'
import { url } from '../../utils/url';
import Avatar from '../common/Avatar';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import DateCreated from '../common/DateCreated';
import ActionsBlock from './ActionsBlock';
import InlineButton from '../ui/InlineButton';
import { useCreateComment } from '../../hooks/comments/useCreateComment';
import Loader from '../ui/Loader';
import PostComments from './PostComments';

const PostPageInfo = ({ post, images }: { post: PostI, images: any }) => {
    const myInfo = useSelector((state: RootState) => state.myInfo.myInfo);
    const user = useSelector((state: RootState) => state.auth.user);

    const inputRef = useRef<HTMLTextAreaElement>(null);

    function handleFocusInput() {
        if (inputRef?.current) {
            inputRef.current.focus();
        }
    }

    const { createComment, loading, error: errorComment, text, setText } = useCreateComment();

    function hadnleCreateComment() {
        createComment(post.id);
    }

    return (
        <>
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
                    <PostComments post={post} />
                </div>
                <div>
                    <ActionsBlock post={post} handleFocusInput={handleFocusInput} />
                    <div className='mt-2 relative h-8'>
                        <textarea
                            className='w-full pr-20 placeholder:text-ig-secondary-text p-1 h-full'
                            placeholder='Додайте коментар...'
                            value={text}
                            onChange={(e) => { setText(e.target.value) }}
                            ref={inputRef}
                        />
                        <div className='absolute right-2 top-1/2 -translate-y-1/2'>
                            <InlineButton title={loading ? <><Loader /></> : 'Опублікувати'} onClick={hadnleCreateComment} disabled={!text} />
                        </div>
                    </div>
                    {errorComment && (
                        <p className='text-red-500 font-semibold text-sm m-0 mt-1'>
                            {errorComment}
                        </p>
                    )}
                </div>
            </div>
        </>
    )
}

export default PostPageInfo