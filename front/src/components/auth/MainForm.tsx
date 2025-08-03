import React, { useState } from 'react'
import AuthInput from '../ui/AuthInput'
import AuthSeparator from '../ui/AuthSeparator';
import AuthBorderlessButton from '../ui/AuthBorderlessButton';
import { handleInputChange } from '../../utils/handleInputChange';
import { LogoIcon } from '../icons';
import { useAuth } from '../../hooks/auth/useAuth';
import { url } from '../../utils/url';
import SubmitButtonBlock from './SubmitButtonBlock';
import ErrorBlock from './ErrorBlock';

const MainForm = ({ mini }: { mini?: boolean }) => {
  const [data, setData] = useState({
    login: '',
    password: ''
  });
  const { auth, loading, error, setError } = useAuth();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError('');
    handleInputChange(e, setData);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    auth(`${url}/login`, { login: data.login, password: data.password })
  }

  return (
    <div className='max-w-[350px] w-full mx-auto lg:mx-0'>
      <p className='mb-10 text-2xl px-[40px]'>
        <LogoIcon />
      </p>
      <form className='flex flex-col gap-2 items-center' onSubmit={handleSubmit}>
        <div className='px-[40px] w-full'>
          <AuthInput
            value={data.login}
            onChange={handleChange}
            name="login"
            type="text"
            placeholder="Номер телефону, ім'я користувача або електронна пошта"
          />
        </div>
        <div className='px-[40px] w-full'>
          <AuthInput
            value={data.password}
            onChange={handleChange}
            name="password"
            type='password'
            placeholder="Пароль"
          />
        </div>
        <div className='px-[40px] w-full'>
          <SubmitButtonBlock
            text='Увійти'
            loading={loading}
          />
        </div>
        {error && (
          <ErrorBlock error={error} />
        )}
        {mini && (
          <button className='text-center text-black text-sm hover:underline font-semibold'>
            Зберегти дані для входу
          </button>
        )}
        {!mini && (
          <>
            <div className='my-4'>
              <AuthSeparator />
            </div>
            <button className='flex items-center justify-center gap-2 mb-4 text-ig-facebook-blue px-[40px] w-full'>
              <svg aria-label="Увійти через Facebook" fill="currentColor" height="20" role="img" viewBox="0 0 16 16" width="20"><title>Увійти через Facebook</title><g clip-path="url(#a)"><path d="M8 0C3.6 0 0 3.6 0 8c0 4 2.9 7.3 6.8 7.9v-5.6h-2V8h2V6.2c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.3V8h2.2l-.4 2.3H9.2v5.6C13.1 15.3 16 12 16 8c0-4.4-3.6-8-8-8Z" fill="currentColor"></path></g><defs><clipPath id="a"><rect fill="currentColor" height="16" width="16"></rect></clipPath></defs></svg>
              <span className='text-sm font-semibold'>
                Увійти через Facebook
              </span>
            </button>
          </>
        )}
        <button className='text-center text-black text-sm hover:underline font-semibold'>
          Забули пароль?
        </button>
        {!mini && (
          <div className='flex justify-center gap-1 items-center text-sm px-[24px] mt-10 flex-wrap'>
            <span>Не маєте облікового запису?</span> <AuthBorderlessButton title="Зареєструйтеся" path='/accounts/emailsignup' />
          </div>
        )}
      </form >
    </div >
  )
}

export default MainForm