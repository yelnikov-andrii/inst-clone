const InlineButton = ({ title, onClick }: { title: string, onClick: () => void }) => {
    return (
        <button
            className='text-ig-primary-button hover:text-ig-link transition-colors cursor-pointer text-[12px] font-medium'
            onClick={onClick}
        >
            {title}
        </button>
    )
}

export default InlineButton