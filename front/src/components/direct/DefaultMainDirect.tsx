import { MessagesIconLarge } from '../icons'
import AuthButton from '../ui/AuthButton'

const DefaultMainDirect = () => {
    return (
        <div className='center h-screen'>
            <div className='flex flex-col items-center max-w-[406px]'>
                <MessagesIconLarge />
                <b className='text-lg mb-4 font-semibold'>
                    Ваші повідомлення
                </b>
                <p className='text-ig-secondary-text mb-4'>
                    Надсилайте приватні світлини та повідомлення другу або групі
                </p>
                <div className='max-w-[195px] text-sm'>
                    <AuthButton title='Надіслати повідомлення' primary />
                </div>
            </div>
        </div>
    )
}

export default DefaultMainDirect