import React from 'react'
import { HeartIconLarge } from '../icons'
import Recomendations from '../recomendations/Recomendations'

const NotificationsSideBlock = () => {
    return (
        <div className='py-10 px-5'>
            <p className='text-2xl text-black font-bold mb-6'>
                Сповіщення
            </p>
            <div className='flex flex-col gap-2 items-center mb-10 text-center text-sm'>
                <HeartIconLarge />
                <p>
                    Діяльність із вашими дописами
                </p>
                <p>
                    Коли хтось уподобає або прокоментує один з ваших дописів, ви бачитимете це тут.
                </p>
            </div>
            <Recomendations />
        </div>
    )
}

export default NotificationsSideBlock