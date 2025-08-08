import React, { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react'
import { MediaFilesIcon } from '../../icons'
import PrimaryButton from '../../ui/PrimaryButton'
import Modal from '../../ui/Modal';
import DiscardBlock from './DiscardBlock';
import { useDragFiles } from '../../../hooks/useDragFiles';
import Topbar from './Topbar';
import { useCreatePost } from '../../../hooks/posts/useCreatePost';
import CreatingPostLoader from './CreatingPostLoader';
import CreatePostInfo from './CreatePostInfo';
import { useUpdatePost } from '../../../hooks/posts/useUpdatePost';

interface PostStateI {
    files: File[];
    description: string;
    textBoxIsOpen: boolean;
    id?: number;
}

const CreatePost = ({ setAreFilesExist, openDiscard, setOpenDiscard, postToUpdate }: { setAreFilesExist: Dispatch<SetStateAction<boolean>>, openDiscard: boolean, setOpenDiscard: Dispatch<SetStateAction<boolean>>, postToUpdate?: PostI }) => {

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [discardModalIsOpen, setDiscardModalIsOpen] = useState(false);

    const [post, setPost] = useState<PostStateI>({
        files: [] as File[],
        description: '',
        textBoxIsOpen: false
    });

    const { isDragActive, handleDragLeave, handleDragOver, handleDrop } = useDragFiles(setPost);

    const { createPost, loading, error, success } = useCreatePost();
    const { updatePost, updateLoading, updateError, updateSuccess } = useUpdatePost();

    function handleselectFile() {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    function handleFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
        const selectedFiles = e.target.files;
        if (selectedFiles) {
            const filesArr = Array.from(selectedFiles);
            setPost(post => ({ ...post, files: filesArr }));
        }
    }

    function handleDiscardModalOpen() {
        setDiscardModalIsOpen(true);
    }

    function closeDiscardModal() {
        setDiscardModalIsOpen(false);
        setOpenDiscard(false);

    }

    function handleDiscardChanges() {
        setPost({ files: [], description: '', textBoxIsOpen: false })
        closeDiscardModal();
    }

    useEffect(() => {
        if (post.files.length > 0) {
            setAreFilesExist(true);
        } else {
            setAreFilesExist(false);
        }
    }, [post.files])

    useEffect(() => {
        if (openDiscard) {
            handleDiscardModalOpen();
        }

    }, [openDiscard])

    useEffect(() => {
        if (postToUpdate) {
            setPost(prev => ({ ...prev, textBoxIsOpen: true, description: postToUpdate.description, id: postToUpdate.id }))
        }
    }, [postToUpdate]);

    if (loading || updateLoading) {
        return (
            <CreatingPostLoader
                type="loading"
                text={loading ? "Поширення" : "Редагування"}
            />
        )
    }

    if (error || updateError) {
        setAreFilesExist(false);
        return (
            <CreatingPostLoader
                type="error"
                text={error || updateError}
            />
        )
    }

    if (success || updateSuccess) {
        setAreFilesExist(false);
        return (
            <CreatingPostLoader
                type="success"
                text={success || updateSuccess}
            />
        )
    }

    return (
        <div
            className='px-4 pb-10 pt-2 rounded-lg bg-white flex flex-col items-center'
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
        >
            {(post.files.length > 0 || postToUpdate) ? (
                <Topbar
                    textBoxIsOpen={post.textBoxIsOpen}
                    back={handleDiscardModalOpen}
                    next={() => setPost(post => ({ ...post, textBoxIsOpen: true }))}
                    submit={() => {
                        if (!postToUpdate) {
                            createPost(post)
                        } else {
                            updatePost(post);
                        }
                    }}
                    postToUpdate={postToUpdate}
                />
            ) : (
                <p className='font-semibold mb-15 pb-4 border-b border-b-ig-separator text-center'>
                    Створити допис
                </p>
            )}
            {(post.files.length > 0 || postToUpdate) ? (
                <CreatePostInfo
                    post={post}
                    setPost={setPost}
                    postToUpdate={postToUpdate}
                />
            ) : (
                <>
                    <MediaFilesIcon active={isDragActive} />
                    <p className='text-xl mt-2 mb-4 text-center'>
                        Перетягніть сюди світлини й відео
                    </p>
                    <input className='sr-only' ref={fileInputRef} type='file' accept='image/*, video/*' onChange={handleFilesChange} />
                    <PrimaryButton title="Вибрати з комп'ютера" onClick={handleselectFile} />
                </>
            )}
            {discardModalIsOpen && (
                <Modal onClose={closeDiscardModal} styleProps={{ width: '40%'}}>
                    <DiscardBlock discard={handleDiscardChanges} notDiscard={closeDiscardModal} />
                </Modal>
            )}
        </div>
    )
}

export default CreatePost