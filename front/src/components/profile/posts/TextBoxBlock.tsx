import Avatar from '../../common/Avatar'
import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import UserIcon from '../../../images/user-icon.jpg'
import type React from 'react';
import { createProfileUrl } from '../../../utils/createProfileUrl';

const TextBoxBlock = ({ value, onChange }: { value: string, onChange: React.ChangeEventHandler<HTMLTextAreaElement> }) => {
    const myInfo = useSelector((state: RootState) => state.myInfo.myInfo);
    const user = useSelector((state: RootState) => state.auth.user);
    const maxLength = 2200;

    const avatarUrl = createProfileUrl(myInfo?.avatar);
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-2 mb-4'>
                <Avatar src={avatarUrl ? avatarUrl : UserIcon} width={28} height={28} />
                <b className='font-semibold'>
                    {user?.nickname}
                </b>
            </div>
            <div>
                <textarea className='w-full bg-ig-highlight-background placeholder:text-ig-secondary-text px-4 py-2 rounded-lg h-90 resize-none' value={value} onChange={onChange} name="description">
                </textarea>
                <span className='text-[12px] text-ig-secondary-text block text-right'>
                    {`${value.length}/${maxLength}`}
                </span>
            </div>
        </div>
    )
}

export default TextBoxBlock