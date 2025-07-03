import clsx from 'clsx';
import React, { useState } from 'react'

interface Props extends React.HTMLAttributes<HTMLInputElement> {
    name: string;
    placeholder: string;
    buttonIsExist?: boolean;
    value: string;
    type: string;
}

const AuthInput = ({ value, buttonIsExist, ...rest }: Props) => {
    const [show, setIsShow] = useState(false);

    return (
        <div className={clsx('w-full', { 'relative': show })}>
            <input
                value={value}
                {...rest}
                className='w-full border border-ig-stroke py-2 px-3 rounded-lg placeholder:text-[12px] outline-none bg-ig-secondary-background'
            />
            {buttonIsExist && (
                <button className="absolute right-[5px] top-[50%] translate-y-1/2 hover:text-ig-button-secondary-text" onClick={() => {
                    setIsShow(!show);
                }}>
                    {show ? 'Сховати' : 'Показати'}
                </button>
            )}
        </div>
    )
}

export default AuthInput