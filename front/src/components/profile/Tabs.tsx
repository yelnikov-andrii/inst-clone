import { useLocation } from 'react-router'
import { PostsIcon, SavedIconMini, TaggedIcon } from '../icons'
import TabLink from './TabLink'

const Tabs = ({ isMyProfile, nickname }: { isMyProfile: boolean, nickname: string | undefined }) => {
    const location = useLocation();
    const locationParts = location.pathname.split('/');
    const tab = locationParts[2];

    if (!nickname) {
        return null;
    }

    return (
        <div className='border-t border-t-ig-separator flex gap-10 items-center justify-center mb-6'>
            <TabLink path={`/${nickname}`} active={!tab}>
                <PostsIcon /> <span className='uppercase text-sm'>дописи</span>
            </TabLink>
            {isMyProfile && (
                <TabLink path={`/${nickname}/saved`} active={tab === 'saved'}>
                    <SavedIconMini /> <span className='uppercase  text-sm'>збережено</span>
                </TabLink>
            )}

            <TabLink path={`/${nickname}/tagged`} active={tab === 'tagged'}>
                <TaggedIcon /> <span className='uppercase  text-sm'>позначено</span>
            </TabLink>
        </div>
    )
}

export default Tabs