import clsx from "clsx"

const AuthButton = ({ title, primary }: { title: string, primary?: boolean }) => {
    return (
        <button 
            className={clsx('text-white py-1 px-4 bg-ig-button-primary-background hover:bg-ig-button-primary-background--hover w-full rounded-lg', {
                'bg-ig-primary-button hover:bg-ig-primary-button-hover': primary,
                
            })} onClick={() => { console.log('login') }}>
            {title}
        </button>
    )
}

export default AuthButton