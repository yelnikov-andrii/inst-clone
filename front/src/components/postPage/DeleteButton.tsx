
const DeleteButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <button className='text-red-500 font-semibold' onClick={onClick}>
            Видалити
        </button>
    )
}

export default DeleteButton