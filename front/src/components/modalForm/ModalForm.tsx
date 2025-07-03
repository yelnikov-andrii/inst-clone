import Modal from '../ui/Modal'
import { CloseIcon } from '../icons'
import MainForm from '../auth/MainForm'
import { useDispatch } from 'react-redux'
import { closeModal } from '../../features/modal/modalSlice'

const ModalForm = () => {
    const dispatch = useDispatch();
    return (
        <Modal>
            <div className='py-3'>
                <div className='flex justify-end items-center mb-10'>
                    <button onClick={() => { dispatch(closeModal()) }}>
                        <CloseIcon />
                    </button>
                </div>
                <MainForm mini />
            </div>
        </Modal>
    )
}

export default ModalForm