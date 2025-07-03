import UserIcon from '../../images/user-icon.jpg'

const PostHeader = () => {
    return (
        <div className='flex justify-between items-center w-full mb-5'>
            <div className='flex gap-2 items-center'>
                <img src={UserIcon} alt="Користувач" className='w-[32px] h-[32px]' />
                <span className='font-semibold text-black'>
                    user_nickname
                </span>
                <span className='text-ig-secondary-text'>
                    •
                </span>
                <span className='text-ig-secondary-text'>
                    1 тиж.
                </span>
            </div>
            <button>
                <svg aria-label="Більше" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Більше</title><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
            </button>
        </div>
    )
}

export default PostHeader