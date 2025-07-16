import React from 'react'

const ErrorBlock = ({ error }: { error: string }) => {
    return (
        <p className='text-red-500 font-medium'>
            {error}
        </p>
    )
}

export default ErrorBlock