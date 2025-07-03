import React from 'react'
import InlineButton from '../ui/InlineButton'

const SavedDefault = () => {
    return (
        <div className='max-w-[935px] mx-auto'>
            <div className='flex justify-between mb-4'>
                <p className='text-ig-secondary-text text-[12px]'>
                    Лише ви можете бачити збережені матеріали
                </p>
                <InlineButton title='Нова колекція' onClick={() => {console.log('create collection')}} />
            </div>
            <div>
                <div className='w-[300px] h-[300px] bg-ig-secondary-text flex justify-center items-end py-4 px-3'>
                    <p className='text-white text-xl'>
                        Усі дописи
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SavedDefault