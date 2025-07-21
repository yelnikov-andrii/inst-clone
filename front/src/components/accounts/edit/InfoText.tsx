import React from 'react'

const InfoText = ({ children }: { children: React.ReactNode }) => {
    return (
        <p className='text-ig-secondary-text text-[12px]'>
            {children}
        </p>
    )
}

export default InfoText