import clsx from 'clsx'

const PrimaryButton = ({ mini, title, height, width, onClick = () => { } }: { mini?: boolean, title: React.ReactNode, height?: number, width?: number, onClick?: any }) => {
    const style = {
        width: width ? `${width}px` : 'inherit',
        height: height ? `${height}px` : '32px'
    }

    return (
        <button className={clsx('transition-colors font-medium', {
            'text-ig-primary-button hover:text-ig-link text-[12px]': mini,
            'text-white bg-ig-primary-button hover:bg-ig-primary-button-hover text-sm py-1 px-2 rounded-md': !mini
        })}
            style={style}
            onClick={onClick}
        >
            {title}
        </button>
    )
}

export default PrimaryButton