import React, { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react'
import { LeftArrow, MediaFilesIcon } from '../../icons'
import PrimaryButton from '../../ui/PrimaryButton'
import InlineButton from '../../ui/InlineButton';
import MediaSwiper from './MediaSwiper';
import Modal from '../../ui/Modal';
import DiscardBlock from './DiscardBlock';
import TextBoxBlock from './TextBoxBlock';
import clsx from 'clsx';

const CreatePost = ({ setAreFilesExist, openDiscard, setOpenDiscard }: { setAreFilesExist: Dispatch<SetStateAction<boolean>>, openDiscard: boolean, setOpenDiscard: Dispatch<SetStateAction<boolean>> }) => {
    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isDragActive, setIsDragActive] = useState(false);
    const [discardModalIsOpen, setDiscardModalIsOpen] = useState(false);
    const [textBoxIsOpen, setTextBoxIsOpen] = useState(false);
    const [description, setDescription] = useState('');

    function handleselectFile() {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    function handleFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
        const selectedFiles = e.target.files;
        if (selectedFiles) {
            const filesArr = Array.from(selectedFiles);
            setFiles(filesArr);
        }
    }

    function handleDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setIsDragActive(false);
        const selectedFiles = Array.from(e.dataTransfer.files);
        setFiles(selectedFiles);
    }

    function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setIsDragActive(true);
    }

    function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setIsDragActive(false);
    }

    function handleDiscardModalOpen() {
        setDiscardModalIsOpen(true);
    }

    function closeDiscardModal() {
        setDiscardModalIsOpen(false);
        setOpenDiscard(false);

    }

    function handleDiscardChanges() {
        setFiles([]);
        closeDiscardModal();
        setTextBoxIsOpen(false);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    useEffect(() => {
        if (files.length > 0) {
            setAreFilesExist(true);
        } else {
            setAreFilesExist(false);
        }
    }, [files])

    useEffect(() => {
        if (openDiscard) {
            handleDiscardModalOpen();
        }

    }, [openDiscard])

    return (
        <div
            className='px-4 pb-10 pt-2 rounded-lg bg-white flex flex-col items-center'
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
        >
            {files?.length > 0 ? (
                <div className='flex justify-between mb-4 pb-4 w-full'>
                    <button onClick={handleDiscardModalOpen}><LeftArrow /></button>
                    {textBoxIsOpen ? (<InlineButton title='Поширити' onClick={() => {}} />) :  (<InlineButton title='Далі' onClick={() => setTextBoxIsOpen(true)} />)}
                    
                </div>
            ) : (
                <p className='font-semibold mb-15 pb-4 border-b border-b-ig-separator text-center'>
                    Створити допис
                </p>
            )}
            {files.length > 0 ? (
                <div className={clsx('w-full', {
                    'flex gap-4': textBoxIsOpen,
                })}>
                    <div className={clsx('', {
                        'w-full': !textBoxIsOpen,
                        'w-full max-w-[60%]': textBoxIsOpen
                    })}>
                        <MediaSwiper files={files} />
                    </div>
                    {textBoxIsOpen && (
                        <div className='w-80'>
                            <TextBoxBlock value={description} onChange={handleChangeDescription} />
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