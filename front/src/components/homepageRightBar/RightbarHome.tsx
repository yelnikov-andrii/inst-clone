import { useDispatch, useSelector } from 'react-redux';
import Recomendations from '../../components/recomendations/Recomendations'
import { closeModal, openModal } from '../../features/modal/modalSlice';
import type { RootState } from '../../app/store';
import ModalForm from '../modalForm/ModalForm';
import InlineButton from '../ui/InlineButton';
import UserIcon from '../../images/user-icon.jpg'
import Avatar from '../common/Avatar';
import { createProfileUrl } from '../../utils/createProfileUrl';

const RightbarHome = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.modal.isOpen);
    const user = useSelector((state: RootState) => state.auth.user);
    const myInfo = useSelector((state: RootState) => state.myInfo.myInfo);

    function handleModal(value: boolean) {
        if (value) {
            dispatch(openModal());
        } else {
            dispatch(closeModal());
        }
    }

    const avatarUrl = createProfileUrl(myInfo?.avatar);

    return (
        <>
            <div className='flex justify-between items-center mb-4'>
                <div className='flex gap-2 items-center'>
                    <Avatar src={avatarUrl ? avatarUrl : UserIcon} width={44} height={44} />
                    <b className='font-semibold text-sm'>
                        {user?.nickname}
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