import { url } from '../../utils/url';
import Avatar from '../common/Avatar';
import UserIcon from '../../images/user-icon.jpg';
import DateCreated from '../common/DateCreated';
import { ButtonDots } from '../icons';
import { useEffect, useState } from 'react';
import Modal from '../ui/Modal';
import DeleteButton from '../postPage/DeleteButton';
import { useDeleteComment } from '../../hooks/comments/useDeleteComment';
import Loader from '../ui/Loader';

const Comment = ({ comment, post, getPostComments }: { comment: CommentI, post: PostI | undefined, getPostComments: (postId: number) => void }) => {
    let avatarUrl = '';
    const [deleteCommentModal, setDeleteCommentModal] = useState(false);
    const [commentWasDeleted, setCommentWasDeleted] = useState(false);
    const { deleteComment, deleteCommentError, loading } = useDeleteComment(setCommentWasDeleted, setDeleteCommentModal);

    if (comment?.Insta_User?.insta_user_info?.avatar) {
        if (!comment.Insta_User?.insta_user_info.avatar.includes('http')) {
            avatarUrl = `${url}/${comment.Insta_User?.insta_user_info.avatar}`;
        } else {
            avatarUrl = comment.Insta_User?.insta_user_info.avatar;
        }
    }

    function handleOpenDeleteCommentModal() {
        setDeleteCommentModal(true);
    }

    function handleCloseDeleteCommentModal() {
        setDeleteCommentModal(false);
    }

    function deleteCommentHandler() {
        deleteComment(comment.id);
    }

    useEffect(() => {
        if (commentWasDeleted && post) {
            console.log('get comments after deleting')
            getPostComments(post.id);
        }
    }, [commentWasDeleted])

    return (
        <>
            <div>
                <div className='flex gap-3 text-sm'>
                    <Avatar width={32} height={32} src={avatarUrl ? avatarUrl : UserIcon} />
                    <div>
                        <div className='flex gap-1 items-center'>
                            <b className='text-sm font-medium'>
                                {comment?.Insta_User?.nickname}
                            </b>
                            <p className='text-sm'>
                                {comment?.text}
                            </p>
                            <button onClick={handleOpenDeleteCommentModal}>
                                <ButtonDots />
                            </button>
                        </div>
                        <div>
                            <DateCreated createdAt={comment.createdAt} mini />
                            {/* <LikesCount count={0} /> */}
                        </div>
                    </div>
                </div>
            </div>
            {deleteCommentModal && (
                <Modal onClose={handleCloseDeleteCommentModal} styleProps={{ width: "40%"}}>
                    <div className='rounded-lg flex flex-col gap-2'>
                        {loading ? (<Loader />) : (<DeleteButton onClick={deleteCommentHandler} />)}
                        <div className='py-2 flex justify-center'>
                            <button onClick={handleCloseDeleteCommentModal}>
                                Скасувати
                            </button>
                        </div>
                    </div>
                    {deleteCommentError && (
                        <p className='text-center text-red-500 font-semibold'>
                            {deleteCommentError}
                        </p>
                    )}
                </Modal>
            )}
        </>
    )
}

export default Comment