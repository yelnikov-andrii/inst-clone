import React, { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react'
import { MediaFilesIcon } from '../../icons'
import PrimaryButton from '../../ui/PrimaryButton'
import MediaSwiper from './MediaSwiper';
import Modal from '../../ui/Modal';
import DiscardBlock from './DiscardBlock';
import TextBoxBlock from './TextBoxBlock';
import clsx from 'clsx';
import { useDragFiles } from '../../../hooks/useDragFiles';
import Topbar from './Topbar';
import { useCreatePost } from '../../../hooks/posts/useCreatePost';
import CreatingPostLoader from './CreatingPostLoader';

interface PostStateI {
    files: File[];
    description: string;
    textBoxIsOpen: boolean;
}

const CreatePost = ({ setAreFilesExist, openDiscard, setOpenDiscard }: { setAreFilesExist: Dispatch<SetStateAction<boolean>>, openDiscard: boolean, setOpenDiscard: Dispatch<SetStateAction<boolean>> }) => {

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [discardModalIsOpen, setDiscardModalIsOpen] = useState(false);

    const [post, setPost] = useState<PostStateI>({
        files: [] as File[],
        description: '',
        textBoxIsOpen: false
    });

    const { isDragActive, handleDragLeave, handleDragOver, handleDrop } = useDragFiles(setPost);

    const { createPost, loading, error, success } = useCreatePost();

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

    function handleChangeDescription(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setPost(post => ({ ...post, description: e.target.value }));
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

    if (loading) {
        return (
            <CreatingPostLoader
              type="loading"
              text="Поширення"
            />
        )
    }

    if (error) {
        setAreFilesExist(false);
        return (
            <CreatingPostLoader
              type="error"
              text={error}
            />
        )
    }

    if (success) {
        setAreFilesExist(false);
        return (
            <CreatingPostLoader
              type="success"
              text={success}
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
            {post.files?.length > 0 ? (
                <Topbar 
                  textBoxIsOpen={post.textBoxIsOpen}
                  back={handleDiscardModalOpen}
                  next={() => setPost(post => ({ ...post, textBoxIsOpen: true }))}
                  submit={() => { createPost(post)}}
                />
            ) : (
                <p className='font-semibold mb-15 pb-4 border-b border-b-ig-separator text-center'>
                    Створити допис
                </p>
            )}
            {post.files.length > 0 ? (
                <div className={clsx('w-full', {
                    'flex gap-4': post.textBoxIsOpen,
                })}>
                    <div className={clsx('', {
                        'w-full': !post.textBoxIsOpen,
                        'w-full max-w-[60%]': post.textBoxIsOpen
                    })}>
                        <MediaSwiper files={post.files} />
                    </div>
                    {post.textBoxIsOpen && (
                        <div className='w-80'>
                            <TextBoxBlock value={post.description} onChange={handleChangeDescription} />
                        </div>
                    )}
                </div>
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
                <Modal onClose={closeDiscardModal}>
                    <DiscardBlock discard={handleDiscardChanges} notDiscard={closeDiscardModal} />
                </Modal>
            )}
        </div>
    )
}

export default CreatePost