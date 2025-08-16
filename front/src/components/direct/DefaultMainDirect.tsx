import { useState } from 'react'
import { MessagesIconLarge } from '../icons'
import Modal from '../ui/Modal';
import ChatModal from './ChatModal';
import PrimaryButton from '../ui/PrimaryButton';

const DefaultMainDirect = () => {
    const [chatModal, setChatModal] = useState(false);

    function handleClose() {
        setChatModal(false);
    }

    return (
        <div className='center h-screen'>
            <div className='flex flex-col items-center max-w-[406px]'>
                <MessagesIconLarge />
                <b className='text-lg mb-4 font-semibold'>
                    Ваші повідомлення
                </b>
                <p className='text-ig-secondary-text mb-4'>
                    Надсилайте приватні світлини та повідомлення другу або групі
                </p>
                <div className='max-w-[195px] text-sm'>
                    <PrimaryButton title="Надіслати повідомлення" onClick={() => setChatModal(true)} />
                </div>
            </div>
            {chatModal && (
                <Modal styleProps={{ width: '50%'}} onClose={handleClose}>
                    <ChatModal 
                      handleClose={handleClose}
                    />
                </Modal>
            )}
        </div>
    )
}

export default DefaultMainDirect