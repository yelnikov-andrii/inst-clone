import React from 'react'
import PostFooterButton from './PostFooterButton'
import { CommentIcon, HeartIcon, ShareIcon } from '../icons'
import { Link } from 'react-router'

const PostFooter = () => {
    return (
        <div className='mt-4'>
            <div className='flex gap-4 items-center mb-2'>
                <PostFooterButton onClick={() => { console.log('like') }}>
                    <HeartIcon />
                </PostFooterButton>
                <Link to="/postId">
                    <CommentIcon />
                </Link>
                <PostFooterButton onClick={() => { console.log('share') }}>
                    <ShareIcon />
                </PostFooterButton>
            </div>
            <div className='font-semibold mb-2'>
                Позначки «Подобається»: 42 690
            </div>
            <div className='mb-2'>
                <b className='font-bold mr-1'>headspa_beauty</b>
                Book your treatment🎀 #ʙᴏᴏᴋɴᴏᴡ
            </div>
            <div className='mb-1'>
                <button className='text-ig-secondary-text'>
                    Переглянути всі коментарі: 1504
                </button>
            </div>
            <form>
                <input
                    className='w-full placeholder:text-ig-secondary-text border-none outline-none py-1'
                    placeholder='Додати коментар...'
                />
            </form>
        </div>
    )
}

export default PostFooter