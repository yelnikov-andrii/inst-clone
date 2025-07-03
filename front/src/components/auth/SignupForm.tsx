import React, { useState } from 'react'
import AuthButton from '../ui/AuthButton'
import AuthSeparator from '../ui/AuthSeparator'
import AuthInput from '../ui/AuthInput'
import AuthBorderlessButton from '../ui/AuthBorderlessButton'
import { handleInputChange } from '../../utils/handleInputChange'
import { LogoIcon } from '../icons'

const SignupForm = () => {
    const [data, setData] = useState({
        login: '',
        password: '',
        fullname: '',
        nickname: ''
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        handleInputChange(e, setData);
    }
    return (
        <>
            <form className='py-4 px-10 border border-ig-secondary-text flex flex-col gap-2 mb-2'>
                <p className="text-center text-2xl text-black mb-4">
                    <LogoIcon />
                </p>
                <p className="text-center text-ig-secondary-text font-semibold mb-4">
                    Зареєструйтеся, щоб переглядати світлини та відео від друзів.
                </p>
                <AuthButton title="Увійти через Facebook" />
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
                <AuthButton title="Зареєструватися" />
            </form>
            <form className="flex flex-col items-center">
                У вас є обліковий запис?
                <AuthBorderlessButton title="Увійдіть" path='/accounts/login' />
            </form>
        </>
    )
}

export default SignupForm