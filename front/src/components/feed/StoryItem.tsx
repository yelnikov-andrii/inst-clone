import clsx from 'clsx';
import UserIcon from '../../images/user-icon.jpg';

interface UserI {
    image: string;
}

const StoryItem = ({ user, isWatched, itemWidth }: { user?: UserI, isWatched?: boolean, itemWidth: number }) => {
    return (
        <div className={clsx('p-[3px] rounded-full', {
            'bg-ig-secondary-text': isWatched,
            'bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5]': !isWatched
        })}
          style={{width: `${itemWidth}px`, height: `${itemWidth}px`}}
        >
            <div className='p-[3px] bg-white rounded-full'>
                <img
                    src={UserIcon}
                    alt='Користувач'
                    className='rounded-full object-cover'
                />
            </div>
        </div>
    )
}

export default StoryItem