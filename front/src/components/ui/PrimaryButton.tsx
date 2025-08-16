import clsx from 'clsx'

const PrimaryButton = ({ mini, title, height, width, onClick = () => { }, disabled }: { mini?: boolean, title: React.ReactNode, height?: number, width?: number, onClick?: () => void, disabled?: boolean }) => {
    const style = {
        width: width ? `${width}px` : 'inherit',
        height: height ? `${height}px` : '32px'
    }

    return (
        <button className={clsx('transition-colors font-medium text-center flex justify-center items-center', {
            'opacity-50 text-white hover:text-white bg-ig-primary-button cursor-default': disabled,
            'text-ig-primary-button hover:text-ig-link text-[12px]': mini && !disabled,
            'text-white bg-ig-primary-button hover:bg-ig-primary-button-hover text-sm py-1 px-2 rounded-md': !mini && !disabled,
            
        })}
            style={style}
            onClick={onClick}
            disabled={disabled}
        >
            {title}
        </button>
    )
}

export default PrimaryButton