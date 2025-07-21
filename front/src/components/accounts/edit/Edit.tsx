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

const Edit = () => {
    const [avatar, setAvatar] = useState<string | null>(null);
    const user = useSelector((state: RootState) => state.auth.user);
    const [bio, setBio] = useState('');
    const [gender, setGender] = useState('other');
    const [showRecommendations, setShowRecommendatons] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [userInfo, setUserInfo] = useState();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<null | File>(null);

    async function getUserInfo(userId: number) {
        try {
            const response = await fetch(`${url}/userinfo/${userId}`);
            if (response.ok) {
                const res = await response.json();
                setUserInfo(res);
                setBio(res.bio || "");
                setAvatar(`${url}/${res.avatar}`);
                setGender(res.gender || "other");
                setShowRecommendatons(res.showRecommendations || false);
            }
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        if (user) {
            getUserInfo(user.id);
        }

    }, [user]);

    async function sendUserInfo() {
        const formData = new FormData();
        if (file) {
            formData.append('avatar', file);
        }

        if (user) {
            formData.append('userId', user?.id.toString())
        }

        formData.append('bio', bio);
        formData.append('gender', gender);
        formData.append('showRecommendations', showRecommendations ? "true" : "false");
        formData.append("website", "");

        try {
            setLoading(true);
            const response = await fetch(`${url}/userinfo`, {
                method: userInfo ? "PATCH" : "POST",
                credentials: 'include',
                body: formData

            });

            if (!response.ok) {
                setError("Не вдалося оновити дані")
            }
        } catch (e) {
            setError(e.message || "Помилка при відправці даних");
        } finally {
            setLoading(false);
        }
    }

    function handleSend() {
        sendUserInfo();
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
        setAvatar(URL.createObjectURL(selectedFile));
    }

    useEffect(() => {
        if (loading === true) {
            setError('');
        }
    }, [loading]);

    return (
        <div className='w-full py-10 px-12'>
            <h3 className='font-bold text-xl mb-4'>
                Редагувати профіль
            </h3>
            <div className='flex justify-between bg-ig-highlight-background p-4 rounded-lg items-center mb-16'>
                <div className='flex gap-4 items-center'>
                    <img
                        src={avatar ? avatar : UserIcon}
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
                <BioTextArea value={bio} setValue={setBio} />
            </div>

            <div className='mb-16'>
                <SubHeader>
                    Стать
                </SubHeader>
                <GenderSelect value={gender} setValue={setGender} />
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
                    <SwitcherShowRec value={showRecommendations} setValue={setShowRecommendatons} />
                </div>
            </div>

            <div className='mb-16'>
                <InfoText>
                    Певну інформацію профілю, як-от ваше ім’я, біографію та посилання, можуть бачити всі. Переглянути, яка інформація профілю показується
                </InfoText>
            </div>
            <div className='flex justify-end'>
                <PrimaryButton title={loading ? <><Loader /></> : "Надіслати"} height={44} width={255} onClick={handleSend} />
            </div>
            {error && (
                <div className='text-center mt-6'>
                    <ErrorBlock error={error} />
                </div>
            )}
        </div>
    )
}

export default Edit