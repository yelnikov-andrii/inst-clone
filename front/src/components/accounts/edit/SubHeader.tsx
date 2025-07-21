import React from 'react'

const SubHeader = ({ children }: { children: React.ReactNode }) => {
    return (
        <h3 className='font-bold text-lg mb-4'>
            {children}
        </h3>
    )
}

export default SubHeader