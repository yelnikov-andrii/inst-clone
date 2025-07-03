import MainForm from '../components/auth/MainForm'
import Footer from '../components/footer/Footer'

const Login = () => {
    return (
        <>
            <main className='h-screen flex flex-col items-center justify-center'>
                <div className="max-w-[350px] w-full">
                    <MainForm />
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Login