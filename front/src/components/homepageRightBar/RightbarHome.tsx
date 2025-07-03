import { useDispatch, useSelector } from 'react-redux';
import Recomendations from '../../components/recomendations/Recomendations'
import UserIcon from '../../images/user-icon.jpg';
import { closeModal, openModal } from '../../features/modal/modalSlice';
import type { RootState } from '../../app/store';
import ModalForm from '../modalForm/ModalForm';
import InlineButton from '../ui/InlineButton';

const RightbarHome = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.modal.isOpen);

    function handleModal(value: boolean) {
        if (value) {
            dispatch(openModal());
        } else {
            dispatch(closeModal());
        }
    }

    return (
        <>
            <div className='flex justify-between items-center mb-4'>
                <div className='flex gap-2 items-center'>
                    <img
                        src={UserIcon}
                        alt="User icon"
                        className='w-[44px] h-[44px]'
                    />
                    <b className='font-semibold text-sm'>
                        nickname
                    </b>
                </div>
                <InlineButton title='Перейти' onClick={() => { handleModal(true) }} />
                {isOpen && (
                    <ModalForm />
                )}
            </div>
            <Recomendations mini />
        </>
    )
}

export default RightbarHome