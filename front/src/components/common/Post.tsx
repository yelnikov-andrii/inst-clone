import { Link } from 'react-router';
import { url } from '../../utils/url';

const Post = ({ post }: { post: PostI }) => {
    return (
        <Link className='w-1/3 max-w-[320px]' to={`/p/${post.id.toString()}`}>
            <div className='w-full'>
                <img
                    src={`${url}/${post?.post_media[0]?.filename}`}
                    className='object-cover w-full h-[360px]'
                />
            </div>
        </Link>
    )
}

export default Post