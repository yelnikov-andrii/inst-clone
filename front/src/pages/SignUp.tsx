import SignupForm from "../components/auth/SignupForm"
import Footer from "../components/footer/Footer"

const SignUp = () => {
    return (
        <>
            <main className='h-screen flex flex-col items-center justify-center'>
                <div className="max-w-[350px] w-full">
                    <SignupForm />
                </div>
            </main>
            <Footer />
        </>
    )
}

export default SignUp