import DeleteButton from './DeleteButton';

const ChangePostModal = ({ openDeleteModal, closeChangePostModal, handleOpenEdit }: { openDeleteModal: () => void, closeChangePostModal: () => void, handleOpenEdit: () => void }) => {
    return (
        <div className='rounded-lg flex flex-col gap-2'>
            <DeleteButton onClick={openDeleteModal} />
            <div className='py-2 border-y border-y-ig-separator flex justify-center'>
                <button onClick={handleOpenEdit}>
                    Редагувати
                </button>
            </div>
            <div className='py-2 flex justify-center'>
                <button onClick={closeChangePostModal}>
                    Скасувати
                </button>
            </div>
        </div>
    )
}

export default ChangePostModal