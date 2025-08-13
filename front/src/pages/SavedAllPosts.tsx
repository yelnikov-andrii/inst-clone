import { Link, Navigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { LeftArrow } from '../components/icons';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import SavedPostsList from '../components/profile/saved/SavedPostsList';

const SavedAllPosts = () => {
    const userNickname = useSelector((state: RootState) => state.auth.user?.nickname);
    const { nickname } = useParams();

    if (userNickname !== nickname) {
        return (
            <Navigate to={`/${nickname}`} replace />
        )
    }

    return (
        <section className='flex flex-col md:flex-row'>
            <div className="w-full h-[72px] fixed z-30 bottom-0 left-0 right-0 md:relative md:h-screen 2xl:max-w-[244px] md:max-w-[72px] max-w-full">
                <Sidebar />
            </div>
            <Topbar />
            <main className='grow-1 py-4 px-8 flex justify-center'>
                <div className='w-3/4'>
                    <Link to={`/${nickname}/saved`} className='flex gap-2 items-center text-ig-secondary-text font-medium'>
                        <LeftArrow />
                        <span>
                            Збережено
                        </span>
                    </Link>
                    <p className='text-2xl mt-4 mb-2'>
                        Усі дописи
                    </p>
                    <SavedPostsList />
                </div>
            </main>
        </section>
    )
}

export default SavedAllPosts