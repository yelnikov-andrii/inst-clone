import { Link } from 'react-router';
import { url } from '../../../utils/url';
import InlineButton from '../../ui/InlineButton'
import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';

const SavedExists = ({ post }: { post: SavedPostI }) => {
    const post_media = post?.insta_post?.post_media;
    const nickname = useSelector((state: RootState) => state.auth.user?.nickname);
    return (
        <div className='max-w-[935px] mx-auto'>
            <div className='flex justify-between mb-4'>
                <p className='text-ig-secondary-text text-[12px]'>
                    Лише ви можете бачити збережені матеріали
                </p>
                <InlineButton title='Нова колекція' onClick={() => { console.log('create collection') }} />
            </div>
            <div>
                <Link to={`/${nickname}/saved/all-posts`} className='w-[300px] h-[300px] bg-ig-secondary-text flex justify-center items-end py-4 px-3 relative'>
                    <img src={post_media ? `${url}/${post_media[0].filename}` : ''} className='w-1/2 h-1/2 object-cover absolute top-0 left-0'/>
                    <p className='text-white text-xl'>
                        Усі дописи
                    </p>
                </Link>
            </div>
        </div>
    )
}

export default SavedExists