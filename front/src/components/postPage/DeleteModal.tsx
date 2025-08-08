import { useSelector } from 'react-redux';
import { useDeletePost } from '../../hooks/posts/useDeletePost'
import DeleteButton from './DeleteButton'
import type { RootState } from '../../app/store';

const DeleteModal = ({ closeModal, post }: { closeModal: () => void, post: PostI }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const { message, deletePost } = useDeletePost();

    function onDeleteHandler() {
        if (user && post) {
            deletePost(post.id, user.id);
        }
    }
    return (
        <div className='rounded-lg p-4'>
            <p className='text-xl font-medium mb-2 text-center'>
                Видалити допис?
            </p>
            <p className='text-sm text-ig-secondary-text text-center mb-4'>
                Ви дійсно хочете видалити цей допис?
            </p>
            <div className='py-2 border-y border-y-ig-separator flex justify-center'>
                <DeleteButton onClick={onDeleteHandler} />
            </div>
            <div className='py-2 flex justify-center'>
                <button onClick={closeModal}>
                    Скасувати
                </button>
            </div>
            {message && (
                <p className='text-lg font-medium'>
                    {message}
                </p>
            )}
        </div>
    )
}

export default DeleteModal