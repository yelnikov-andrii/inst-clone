/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import UserIcon from '../../../images/user-icon.jpg';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import PrimaryButton from '../../ui/PrimaryButton';
import BioTextArea from './BioTextArea';
import GenderSelect from './GenderSelect';
import SubHeader from './SubHeader';
import InfoText from './InfoText';
import SwitcherShowRec from './SwitcherShowRec';
import { url } from '../../../utils/url';
import ErrorBlock from '../../auth/ErrorBlock';
import Loader from '../../ui/Loader';
import { useSendMyInfo } from '../../../hooks/useSendMyInfo';
import Globalsnackbar from '../../common/Globalsnackbar';

const Edit = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const myInfo = useSelector((state: RootState) => state.myInfo.myInfo);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<null | File>(null);
    const { fetchingData, setFetchingData, sendUserInfo, snackbarMessage } = useSendMyInfo();

    const [userData, setUserData] = useState({
        avatar: '',
        bio: '',
        gender: 'other',
        showRecommendations: false,
        website: ''
    });

    useEffect(() => {
        if (myInfo) {
            setUserData(prev => ({ ...prev, bio: myInfo.bio, gender: myInfo.gender, showRecommendations: myInfo.showRecommendations, avatar: myInfo.avatar }))
        }
    }, [myInfo])

    function handleSend() {
        sendUserInfo(file, user, userData);
    }

    function handleAvatarClick() {
        if (fileInputRef?.current) {
            fileInputRef?.current?.click();
        }
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const selectedFile = e?.target?.files?.[0];

        if (!selectedFile) {
            return;
        }

        setFile(selectedFile);
        setUserData(prev => ({ ...prev, avatar: URL.createObjectURL(selectedFile) }));
    }

    useEffect(() => {
        if (fetchingData.loading === true) {
            setFetchingData(prev => ({ ...prev, error: '' }));
        }
    }, [fetchingData.loading]);

    function changeDataHandler(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const target = e.target;
        const name = target.name;

        if (target instanceof HTMLInputElement && target.type === 'checkbox') {
            setUserData(prev => ({ ...prev, [name]: target.checked }));
            return;
        }

        setUserData(prev => ({ ...prev, [name]: target.value }));
    }

    let avatarUrl = '';

    if (userData.avatar) {
        if (!userData.avatar.includes('http')) {
            avatarUrl = `${url}/${userData.avatar}`;
        } else {
            avatarUrl = userData.avatar;
        }
    }

    return (
        <div className='w-full py-10 px-12'>
            <h3 className='font-bold text-xl mb-4'>
                Редагувати профіль
            </h3>
            <div className='flex justify-between bg-ig-highlight-background p-4 rounded-lg items-center mb-16'>
                <div className='flex gap-4 items-center'>
                    <img
                        src={avatarUrl ? avatarUrl : UserIcon}
                        alt='Фото користувача'
                        className='w-[56px] h-[56px] rounded-full object-cover cursor-pointer'
                        onClick={handleAvatarClick}
                    />
                    <input
                        type='file'
                        ref={fileInputRef}
                        accept='image/*'
                        className='sr-only'
                        onChange={handleFileChange}
                    />
                    <p className='font-medium text-lg'>
                        {user?.nickname}
                    </p>
                </div>
                <PrimaryButton
                    title='Змінення світлини'
                    onClick={handleAvatarClick}
                />
            </div>

            <div className='mb-16'>
                <SubHeader>
                    Сайт
                </SubHeader>
                <input placeholder='Сайт' className='w-full outline-none py-2 px-4 rounded-xl bg-ig-highlight-background mb-2' readOnly />
                <InfoText>
                    Редагування посилань доступне лише на мобільному телефоні. Відкрийте додаток Instagram і відредагуйте профіль, щоб змінити сайти в біографії.
                </InfoText>
            </div>

            <div className='mb-16'>
                <SubHeader>
                    Біографія
                </SubHeader>
                <BioTextArea value={userData.bio} onChange={changeDataHandler} />
            </div>

            <div className='mb-16'>
                <SubHeader>
                    Стать
                </SubHeader>
                <GenderSelect value={userData.gender} onChange={changeDataHandler} />
                <InfoText>
                    Ця інформація не буде показана у вашому публічному профілі.
                </InfoText>
            </div>

            <div className='mb-16'>
                <SubHeader>
                    Показувати рекомендації облікових записів у профілях
                </SubHeader>
                <div className='p-2 border border-ig-separator rounded-lg flex gap-2 items-center'>
                    <div>
                        Показувати рекомендації облікових записів у профілях
                        <InfoText>
                            Налаштуйте, чи можуть інші бачити рекомендації схожих облікових записів у вашому профілі й чи можна рекомендувати ваш обліковий запис в інших профілях.
                        </InfoText>
                    </div>
                    <SwitcherShowRec value={userData.showRecommendations} onChange={changeDataHandler} />
                </div>
            </div>

            <div className='mb-16'>
                <InfoText>
                    Певну інформацію профілю, як-от ваше ім’я, біографію та посилання, можуть бачити всі. Переглянути, яка інформація профілю показується
                </InfoText>
            </div>
            <div className='flex justify-end'>
                <PrimaryButton title={fetchingData.loading ? <><Loader /></> : "Надіслати"} height={44} width={255} onClick={handleSend} />
            </div>
            {fetchingData.error && (
                <div className='text-center mt-6'>
                    <ErrorBlock error={fetchingData.error} />
                </div>
            )}
            {snackbarMessage && (
                <Globalsnackbar text={snackbarMessage} />
            )}
        </div>
    )
}

export default Edit