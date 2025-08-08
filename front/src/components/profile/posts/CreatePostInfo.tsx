import clsx from 'clsx'
import type { Dispatch, SetStateAction } from 'react';
import MediaSwiper from './MediaSwiper';
import TextBoxBlock from './TextBoxBlock';

interface PostStateI {
    files: File[];
    description: string;
    textBoxIsOpen: boolean;
}

const CreatePostInfo = ({ post, setPost, postToUpdate }: { post: PostStateI, setPost: Dispatch<SetStateAction<PostStateI>>, postToUpdate?: PostI }) => {
    
    function handleChangeDescription(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setPost(post => ({ ...post, description: e.target.value }));
    }

    return (
        <div className={clsx('w-full', {
            'flex gap-4': post.textBoxIsOpen,
        })}>
            <div className={clsx('', {
                'w-full': !post.textBoxIsOpen,
                'w-full max-w-[60%]': post.textBoxIsOpen
            })}>
                <MediaSwiper files={post.files} postToUpdate={postToUpdate} />
            </div>
            {post.textBoxIsOpen && (
                <div className='w-80'>
                    <TextBoxBlock value={post.description} onChange={handleChangeDescription} />
                </div>
            )}
        </div>
    )
}

export default CreatePostInfo