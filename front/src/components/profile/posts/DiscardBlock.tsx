
const DiscardBlock = ({ discard, notDiscard }: { discard: () => void, notDiscard: () => void }) => {
    return (
        <div className='rounded-xl py-2 px-3 bg-white'>
            <p className='text-center text-xl mb-2'>
                Відхилити допис?
            </p>
            <p className='text-center text-sm mb-4 text-ig-secondary-text'>
                Якщо вийти зміни не буде збережено
            </p>
            <div className='flex justify-center mb-4'>
                <button className='text-red-500 font-medium' onClick={discard}>
                    Відхилити
                </button>
            </div>
            <div className='flex justify-center'>
                <button onClick={notDiscard}>
                    Скасувати
                </button>
            </div>
        </div>
    )
}

export default DiscardBlock