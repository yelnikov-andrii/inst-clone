import { Link } from "react-router"

const AuthBorderlessButton = ({ title, path }: { title: string, path: string }) => {
    return (
        <Link to={path} className='text-ig-button-borderless-text font-semibold'>{title}</Link>
    )
}

export default AuthBorderlessButton