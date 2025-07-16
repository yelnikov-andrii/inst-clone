import ActivationForm from '../components/auth/ActivationForm'
import Footer from '../components/footer/Footer'
import { useSearchParams } from 'react-router';

const Activate = () => {
    const params = useSearchParams();
    const nickname = params[0].get('nickname');

    if (nickname) {
        return (
            <>
                <main className='h-screen flex flex-col items-center justify-center'>
                    <p className='font-medium text-xl mb-4'>
                        Активація аккаунта
                    </p>
                    <div className="max-w-[350px] w-full">
                        <ActivationForm nickname={nickname} />
                    </div>
                </main>
                <Footer />
            </>
        )
    }

    return (
        <>
            <main className='h-screen flex flex-col items-center justify-center'>
                <p className='font-medium text-xl mb-4'>
                    Невірний нікнейм
                </p>
            </main>
            <Footer />
        </>
    )
}

export default Activate