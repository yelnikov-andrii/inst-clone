import AuthButton from '../ui/AuthButton'
import Loader from '../ui/Loader'

const SubmitButtonBlock = ({ loading, text }: { loading: boolean, text: string }) => {
    return (
        <AuthButton type="submit">
            {loading ? <div className='flex justify-center items-center min-w-[110px]'>
                <Loader />
            </div> : <>{text}</>}
        </AuthButton>
    )
}

export default SubmitButtonBlock