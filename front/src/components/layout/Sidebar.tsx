import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { CreateIcon, HeartIcon, HomeIcon, LogoIcon, LogoIconMini, MessagesIcon, SearchIcon } from '../icons'
import SidebarLink from './SidebarLink'
import SidebarButton from './SidebarButton'
import Drawer from './Drawer'
import { useDispatch, useSelector } from 'react-redux';
import { openDrawer } from '../../features/drawer/drawerReducer';
import type { RootState } from '../../app/store'
import SearchSIdeBlock from './SearchSIdeBlock'
import NotificationsSideBlock from './NotificationsSideBlock'
import clsx from 'clsx'
import { useLogout } from '../../hooks/auth/useLogOut'
import Avatar from '../common/Avatar'
import { url } from '../../utils/url'
import { openModal } from '../../features/modal/modalSlice'
import CreatePostModal from '../common/CreatePostModal'

enum BlockNameEnum {
    SEARCH = 'search',
    NOTIFICATIONS = 'notifications',
    CREATE = 'create'
}

const Sidebar = ({ mini }: { mini?: boolean }) => {
    const dispatch = useDispatch()
    const isOpen = useSelector((state: RootState) => state.drawer.isOpen);
    const [blockName, setBlockName] = useState<BlockNameEnum | ''>(BlockNameEnum.SEARCH);
    const [isSidedbarBottom, setIsSidebarBottom] = useState(false);
    const [isSidebarMini, setIsSidebarMini] = useState(false);
    const myInfo = useSelector((state: RootState) => state.myInfo.myInfo);
    const isModalOpen = useSelector((state: RootState) => state.modal.isOpen);
    const posts = useSelector((state: RootState) => state.posts.posts);

    function handleOpen(value: BlockNameEnum) {
        setBlockName(value);
        dispatch(openDrawer());
    }

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth <= 768) {
                setIsSidebarBottom(true);
                setIsSidebarMini(true);
            } else if (window.innerWidth <= 1260) {
                setIsSidebarMini(true);
                setIsSidebarBottom(false);
            } else {
                setIsSidebarMini(false);
                setIsSidebarBottom(false);
            }
        }

        handleResize();

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    useEffect(() => {
        if (!isOpen) {
            setBlockName('');
        }
    }, [isOpen]);

    const logout = useLogout();

    function handleLogout() {
        logout();
    }

    return (
        <aside className={clsx('fixed right-0 z-30 overflow-x-hidden md:top-0 bottom-0 left-0 h-full pt-0 md:pt-10 border-r border-r-ig-separator border-t border-t-ig-separator bg-ig-secondary-background', {
            'right-shift top-shift': !mini,
            'right-shift-mini': mini
        })}
        >
            <nav className='flex md:flex-col gap-6 md:gap-2 px-2 py-6 md:py-1 justify-center'>
                {!isSidedbarBottom && (
                    <Link to="/" className='px-3 py-2 md:mb-6'>
                        {(isOpen || isSidebarMini || mini) ? <LogoIconMini /> : <LogoIcon />}
                    </Link>
                )}
                <SidebarLink
                    path='/'
                    title={(isSidebarMini || mini) ? '' : 'Головна'}
                    icon={<HomeIcon active={!blockName} />}
                    active={!blockName}
                />
                {!isSidedbarBottom && (
                    <SidebarButton
                        title={(isSidebarMini || mini) ? '' : 'Пошук'}
                        icon={<SearchIcon active={blockName === BlockNameEnum.SEARCH} />}
                        onClick={() => { handleOpen(BlockNameEnum.SEARCH) }}
                        active={blockName === BlockNameEnum.SEARCH}
                    />
                )}
                <SidebarLink
                    path='/direct/inbox'
                    title={(isSidebarMini || mini) ? '' : 'Повідомлення'}
                    icon={<MessagesIcon />}
                />
                {!isSidedbarBottom && (
                    <SidebarButton
                        title={(isSidebarMini || mini) ? '' : 'Сповіщення'}
                        icon={<HeartIcon active={blockName === BlockNameEnum.NOTIFICATIONS} />}
                        onClick={() => { handleOpen(BlockNameEnum.NOTIFICATIONS) }}
                        active={blockName === BlockNameEnum.NOTIFICATIONS}
                    />
                )}
                <SidebarLink
                    path='/profile'
                    title={(isSidebarMini || mini) ? '' : 'Профіль'}
                    icon={<Avatar src={myInfo?.avatar ? `${url}/${myInfo?.avatar}` : ''} width={24} height={24} />}
                />
                {posts.length > 0 && (
                    <SidebarButton
                        title={(isSidebarMini || mini) ? '' : 'Створити'}
                        icon={<CreateIcon />}
                        onClick={() => { dispatch(openModal()) }}
                        active={blockName === BlockNameEnum.CREATE}
                    />
                )}
                <button onClick={handleLogout}>
                    Logout
                </button>
            </nav>
            <Drawer>
                {blockName === 'search' ? <SearchSIdeBlock /> : blockName === 'notifications' ? <NotificationsSideBlock /> : null}
            </Drawer>
            {isModalOpen && (
                <CreatePostModal onClose={() => {}}/>
            )}
        </aside>
    )
}

export default Sidebar