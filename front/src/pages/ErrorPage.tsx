import { Link } from 'react-router'
import Sidebar from '../components/layout/Sidebar'

const ErrorPage = () => {
    return (
        <section className='flex flex-col md:flex-row'>
            <div className="w-full h-[72px] fixed z-30 bottom-0 left-0 right-0 md:relative md:h-screen max-w-[72px] 2xl:max-w-[244px]">
                <Sidebar mini />
            </div>
            <div className='grow-1'>
                <main className='py-6 px-3 flex justify-center items-center flex-col h-[90%]'>
                    <h2 className='text-2xl font-semibold mb-10'>
                        На жаль, ця сторінка недоступна
                    </h2>
                    <p className='flex gap-2'>
                        Посилання, за яким ви перейшли, можливо, пошкоджене або сторінку видалено. <Link to="/" className='text-ig-link-text'>Назад до Instagram</Link>
                    </p>
                </main>
            </div>
        </section>
    )
}

export default ErrorPage;