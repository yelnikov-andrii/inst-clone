import { useState } from 'react'
import Modal from '../ui/Modal'
import { useDispatch } from 'react-redux';
import { closeModal } from '../../features/modal/modalSlice';
import CreatePost from '../profile/posts/CreatePost';

const CreatePostModal = ({ post, onClose }: { post?: PostI, onClose: () => void }) => {
    const [areFilesExist, setAreFilesExist] = useState(false);
    const dispatch = useDispatch();
    const [openDiscard, setOpenDiscard] = useState(false);


    function onCloseModal() {
        onClose();
        if (areFilesExist) {
            setOpenDiscard(true);
        } else {
            dispatch(closeModal());
            setOpenDiscard(false);
        }
    }
    return (
        <Modal styleProps={{ maxWidth: 700 }} onClose={onCloseModal}>
            <CreatePost 
                setAreFilesExist={setAreFilesExist} 
                openDiscard={openDiscard} 
                setOpenDiscard={setOpenDiscard} 
                postToUpdate={post} 
            />
        </Modal>
    )
}

export default CreatePostModal