import clsx from "clsx"

const InlineButton = ({ title, onClick, disabled }: { title: string, onClick: () => void, disabled?: boolean }) => {
    return (
        <button
            className={clsx('text-ig-primary-button hover:text-ig-link transition-colors cursor-pointer text-[12px] font-medium', {
                'opacity-50': disabled
            })}
            onClick={onClick}
            disabled={disabled}
        >
            {title}
        </button>
    )
}

export default InlineButton