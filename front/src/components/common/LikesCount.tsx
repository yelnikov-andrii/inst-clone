import React from 'react'

const LikesCount = ({ count }: { count: number }) => {
    return (
        <div>
            {count > 0 ? (<p className='font-semibold'>{`${count} вподобань`}</p>) : (<><p>Станьте першим, хто <button className='text-black font-medium'>вподобає це</button></p></>)}
        </div>
    )
}

export default LikesCount