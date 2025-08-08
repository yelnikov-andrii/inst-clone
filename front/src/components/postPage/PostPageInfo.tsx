/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react'
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
import { ButtonDots } from '../icons';
import Modal from '../ui/Modal';
import ChangePostModal from './ChangePostModal';
import DeleteModal from './DeleteModal';
import CreatePostModal from '../common/CreatePostModal';

const PostPageInfo = ({ post }: { post: PostI }) => {
    const myInfo = useSelector((state: RootState) => state.myInfo.myInfo);
    const user = useSelector((state: RootState) => state.auth.user);
    const [commentWasCreated, setCommentWasCreated] = useState(false);
    const [actionsModal, setActionsModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const inputRef = useRef<HTMLTextAreaElement>(null);

    function handleFocusInput() {
        if (inputRef?.current) {
            inputRef.current.focus();
        }
    }

    const { createComment, loading, error: errorComment, text, setText } = useCreateComment();

    function hadnleCreateComment() {
        createComment(post.id);
        setCommentWasCreated(true);
        setTimeout(() => {
            setCommentWasCreated(false);
        }, 1000);
    }

    function handleOpenActionsMenu() {
        setActionsModal(true);
    }

    function closeDeleteModal() {
        setDeleteModal(false);
    }

    return (
        <>
            <img src={`${url}/${post.post_media[0]?.filename}`} className='object-cover w-full max-h-[335px] md:max-h-none md:w-1/2' />
            <div className='w-full md:w-1/2 md:py-4 md:px-10 flex flex-col justify-between mt-4 md:mt-0'>
                <div className='hidden md:block'>
                    <div className='flex justify-between mb-2 xl:mb-6'>
                        <div className='flex gap-4 items-center'>
                            <Avatar src={myInfo?.avatar ? `${url}/${myInfo?.avatar}` : ''} width={32} height={32} />
                            <b className='text-black md:text-lg font-medium'>
                                {user?.nickname}
                            </b>
                        </div>
                        <button onClick={handleOpenActionsMenu}>
                            <ButtonDots />
                        </button>
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
                            <DateCreated createdAt={post.createdAt} mini />
                        </div>
                    </div>
                    <PostComments post={post} commentWasCreated={commentWasCreated} />
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
                    {actionsModal && (
                        <Modal onClose={() => setActionsModal(false)} styleProps={{ width: "40%" }}>
                            <ChangePostModal
                                openDeleteModal={() => {
                                    setActionsModal(false);
                                    setDeleteModal(true);
                                }}
                                closeChangePostModal={() => {
                                    setActionsModal(false);
                                }}
                                handleOpenEdit={() => {
                                    setActionsModal(false);
                                    setEditModal(true);
                                }}
                            />
                        </Modal>
                    )}
                    {deleteModal && (
                        <Modal onClose={closeDeleteModal} styleProps={{ width: '30%' }}>
                            <DeleteModal closeModal={closeDeleteModal} post={post} />
                        </Modal>
                    )}
                    {editModal && (
                        <CreatePostModal post={post} onClose={() => setEditModal(false)} />
                    )}
                </div>
            </div>
        </>
    )
}

export default PostPageInfo