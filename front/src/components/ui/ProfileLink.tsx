import { Link } from 'react-router';

const ProfileLink = ({ title, path }: { title: string; path: string }) => {
    return (
        <Link to={path} className='py-2 px-3 text-sm font-medium bg-ig-secondary-button-background hover:bg-ig-secondary-button-hover text-black rounded-lg transition-colors'>
            {title}
        </Link>
    )
}

export default ProfileLink