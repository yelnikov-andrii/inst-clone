// import { useEffect, useState } from 'react';
import Feed from '../components/feed/Feed'
import Stories from '../components/feed/Stories'
import Sidebar from '../components/layout/Sidebar'
import RightbarHome from '../components/homepageRightBar/RightbarHome';
import Topbar from '../components/layout/Topbar';

const Home = () => {
    return (
        <section className='flex flex-col md:flex-row'>
            <div className="w-full h-[72px] fixed z-30 bottom-0 left-0 right-0 md:relative md:h-screen 2xl:max-w-[244px] md:max-w-[72px] max-w-full">
                <Sidebar />
            </div>
            <Topbar />
            <main className='grow-1 flex justify-center'>
                <div className='max-w-[630px] w-full'>
                    <div className='py-4 mb-6 w-full'>
                        <Stories />
                    </div>
                    <div className='py-4 max-w-[470px] mx-auto'>
                        <Feed />
                    </div>
                </div>
                <aside className='max-w-[383px] w-full pt-4 pl-16 hidden xl:block'>
                    <RightbarHome />
                </aside>
            </main>
        </section>
    )
}

export default Home