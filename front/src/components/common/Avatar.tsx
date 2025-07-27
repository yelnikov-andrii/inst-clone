import UserIcon from '../../images/user-icon.jpg';

const Avatar = ({ src, width, height }: { src: string, width?: number, height?: number }) => {
    const style = {
        width: width ? `${width}px` : '44px',
        height: height ? `${height}px` : '44px'
    }

    return (
        <img
            src={src ? src : UserIcon}
            alt="User icon"
            className='object-cover rounded-full'
            style={style}
        />
    )
}

export default Avatar