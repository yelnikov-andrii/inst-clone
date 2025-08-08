import React, { useEffect, useState } from 'react'
import AuthButton from '../ui/AuthButton'
import AuthSeparator from '../ui/AuthSeparator'
import AuthInput from '../ui/AuthInput'
import AuthBorderlessButton from '../ui/AuthBorderlessButton'
import { handleInputChange } from '../../utils/handleInputChange'
import { LogoIcon } from '../icons'
import { url } from '../../utils/url'
import Loader from '../ui/Loader'
import { useNavigate } from 'react-router'

const SignupForm = () => {
    const [data, setData] = useState<RegistrationDataI>({
        login: '',
        password: '',
        fullname: '',
        nickname: ''
    });
    const [isFilled, setIsFilled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setErrorMessage('');
        handleInputChange(e, setData);
    }

    useEffect(() => {
        if (data.login && data.password && data.fullname && data.nickname) {
            setIsFilled(true);
        } else {
            setIsFilled(false);
        }
    }, [data]);

    async function register(data: RegistrationDataI) {
        setLoading(true);
        try {
            const response = await fetch(`${url}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...data })
            });

            if (!response.ok) {
                const res = await response.json();
                setErrorMessage(res.message);
            } else {
                navigate(`/accounts/activation?nickname=${data.nickname}`);
            }

        } catch (e: unknown) {
            if (e instanceof Error) {
                setErrorMessage(e.message);
            } else {
                setErrorMessage("Невідома помилка");
            }
        } finally {
            setLoading(false);
        }
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        register(data)
    }

    return (
        <>
            <form className='py-4 px-10 border border-ig-secondary-text flex flex-col gap-2 mb-2' onSubmit={handleSubmit}>
                <p className="text-center text-2xl text-black mb-4">
                    <LogoIcon />
                </p>
                <p className="text-center text-ig-secondary-text font-semibold mb-4">
                    Зареєструйтеся, щоб переглядати світлини та відео від друзів.
                </p>
                <AuthButton>
                    Увійти через Facebook
                </AuthButton>
                <div className="my-4 mx-auto">
                    <AuthSeparator />
                </div>
                <AuthInput
                    type="text"
                    name="login"
                    value={data.login}
                    onChange={handleChange}
                    placeholder="Номер мобільного телефону або електронна пошта"
                />
                <AuthInput
                    type="password"
                    name="password"
                    value={data.password}
                    placeholder="Пароль"
                    onChange={handleChange}
                />
                <AuthInput
                    type="text"
                    name="fullname"
                    value={data.fullname}
                    placeholder="Повне ім'я"
                    onChange={handleChange}
                />
                <AuthInput
                    type="text"
                    name="nickname"
                    value={data.nickname}
                    placeholder="Ім'я користувача"
                    onChange={handleChange}
                />
                <AuthButton disabled={!isFilled}>
                    {loading ? (
                        <div className='flex justify-center items-center'>
                            <Loader />
                        </div>
                    ) : (
                        <>
                            Зареєструватися
                        </>
                    )}
                </AuthButton>
                {errorMessage && (
                    <div className='mt-4 text-red-500 text-sm text-center font-medium'>
                        {errorMessage}
                    </div>
                )}
            </form>
            <form className="flex flex-col items-center">
                У вас є обліковий запис?
                <AuthBorderlessButton title="Увійдіть" path='/accounts/login' />
            </form>
        </>
    )
}

export default SignupForm