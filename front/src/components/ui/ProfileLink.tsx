import { Link } from 'react-router';

const ProfileLink = ({ title, path, type, onClick, style }: { title: string; path?: string, type?: "button" | "submit", onClick?: () => void, style?: React.CSSProperties }) => {

    if (type) {
        return (
            <button
                className='py-2 px-3 text-sm font-medium bg-ig-secondary-button-background hover:bg-ig-secondary-button-hover text-black rounded-lg transition-colors'
                style={style ? style : {}}
                onClick={onClick}
            >
                {title}
            </button>
        )
    }

    if (path) {
        return (
            <Link to={path} className='py-2 px-3 text-sm font-medium bg-ig-secondary-button-background hover:bg-ig-secondary-button-hover text-black rounded-lg transition-colors'>
                {title}
            </Link>
        )
    }

    return null;

}

export default ProfileLink