import React, { useState } from 'react'
import AuthInput from '../ui/AuthInput'
import { useAuth } from '../../hooks/useAuth';
import { url } from '../../utils/url';
import SubmitButtonBlock from './SubmitButtonBlock';
import ErrorBlock from './ErrorBlock';

const ActivationForm = ({ nickname }: { nickname: string }) => {
    const [code, setCode] = useState('');
    const { auth, loading, error, setError } = useAuth();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setError('');
        const value = e.target.value;

        if (/^\d*$/.test(value)) {
            setCode(value);
        }
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        auth(`${url}/activate`, { code, nickname });
    }

    return (
        <form className='flex flex-col gap-2 items-center' onSubmit={handleSubmit}>
            <div className='px-[40px] w-full'>
                <AuthInput
                    value={code}
                    onChange={handleChange}
                    name="code"
                    type="text"
                    placeholder="Введіть код, який прийшов вам на пошту"
                />
            </div>
            <div>
                <SubmitButtonBlock
                    text='Активувати'
                    loading={loading}
                />
            </div>
            {error && (
                <ErrorBlock error={error} />
            )}
        </form >
    )
}

export default ActivationForm