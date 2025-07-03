import Sidebar from '../components/layout/Sidebar'
import Inbox from '../components/direct/Inbox'
import { Outlet } from 'react-router';

const Direct = () => {
    const inboxWidth = 397;
    const sidebarMiniWidth = 72;
    return (
        <section className='flex flex-col md:flex-row'>
            <div className="w-full h-[72px] fixed z-30 bottom-0 left-0 right-0 md:relative md:h-screen md:max-w-[72px] max-w-full">
                <Sidebar mini />
            </div>
            <div className='grow-1'>
                <Inbox width={inboxWidth} />
                <main className='absolute' style={{ width: `calc(100% - ${inboxWidth + sidebarMiniWidth}px)`, left: `${inboxWidth + sidebarMiniWidth}px` }}>
                    <Outlet />
                </main>
            </div>
        </section>
    )
}

export default Direct