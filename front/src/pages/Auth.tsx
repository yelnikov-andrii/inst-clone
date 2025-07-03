import MainImg from '../images/instagram-web-main.png'
import MainForm from '../components/auth/MainForm'

const Auth = () => {
    return (
        <div className='flex flex-col'>
            <section className='h-screen max-w-[935px] w-full mx-auto flex items-center'>
                <img
                    src={MainImg}
                    alt='Головна картинка'
                    className='h-[450px] hidden lg:block'
                />
                <MainForm />
            </section>
            <footer className='text-ig-secondary-text mt-10 text-center mb-6'>
                © Instagram from Meta, 2025
            </footer>
        </div>
    )
}

export default Auth