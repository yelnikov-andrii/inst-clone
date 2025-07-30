import { CommentIcon, HeartIcon, SavedIcon } from '../icons'
import DateCreated from '../common/DateCreated';

const ActionsBlock = ({ post }: { post: PostI }) => {
    const likes = 0;
    return (
        <div>
            <div className='flex justify-between mb-4'>
                <div className='flex gap-4 items-center'>
                    <button>
                        <HeartIcon active={false} />
                    </button>
                    <button>
                        <CommentIcon />
                    </button>
                </div>
                <div>
                    <button>
                        <SavedIcon />
                    </button>
                </div>
            </div>
            <div>
                {likes > 0 ? (<></>) : (<><p>Станьте першим, хто <button className='text-black font-medium'>вподобає це</button></p></>)}
            </div>
            <DateCreated post={post} />
        </div>
    )
}

export default ActionsBlock