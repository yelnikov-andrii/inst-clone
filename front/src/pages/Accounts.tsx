import Sidebar from '../components/layout/Sidebar'
import Topbar from '../components/layout/Topbar'
import { Outlet } from 'react-router'
import SidebarLink from '../components/layout/SidebarLink'
import { BellIcon, UserIcon } from '../components/icons'

const Accounts = () => {
    return (
        <section className='flex flex-col md:flex-row'>
            <div className="w-full h-[72px] fixed z-30 bottom-0 left-0 right-0 md:relative md:h-screen 2xl:max-w-[244px] md:max-w-[72px] max-w-full">
                <Sidebar />
            </div>
            <Topbar />
            <main className='grow-1 flex justify-center'>
                <aside className='w-80 border-r border-r-ig-separator py-10 px-4 h-screen overflow-y-auto'>
                    <h3 className='font-bold text-xl mb-4'>
                        Налаштування
                    </h3>
                    <span className='text-[12px] text-ig-secondary-text block mb-4'>
                        Як ви використовуєте Instagram
                    </span>
                    <nav className='flex flex-col gap-4'>
                        <SidebarLink
                            title='Налаштування'
                            icon={<UserIcon />}
                            path='/accounts/edit'
                        />
                        <SidebarLink
                            title='Сповіщення'
                            icon={<BellIcon />}
                            path='/accounts/notifications'
                        />
                    </nav>
                </aside>
                <div className='grow-1 h-screen overflow-y-auto'>
                    <Outlet />
                </div>
            </main>
        </section>
    )
}

export default Accounts