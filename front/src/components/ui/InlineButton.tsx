import clsx from "clsx"

const InlineButton = ({ title, onClick, disabled, type }: { title: React.ReactNode, onClick: () => void, disabled?: boolean, type: "submit" | "button" }) => {
    return (
        <button
            className={clsx('text-ig-primary-button hover:text-ig-link transition-colors cursor-pointer text-[12px] font-medium', {
                'opacity-50': disabled
            })}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {title}
        </button>
    )
}

export default InlineButton