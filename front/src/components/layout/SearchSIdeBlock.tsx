import SearchInput from './SearchInput';

const SearchSIdeBlock = () => {
    return (
        <div className='py-10 px-5'>
            <b className='text-2xl text-black mb-6 block font-semibold'>
                Пошук
            </b>
            <div className='mb-6'>
                <SearchInput />
            </div>
            <div className='h-[1px] bg-ig-stroke w-full my-4' />
            <div>
                <p className='text-lg text-black mb-4 font-medium'>
                    Недавні
                </p>
                <div className='flex justify-center items-center text-ig-secondary-text text-sm'>
                    Немає нещодавніх запитів
                </div>
            </div>
        </div>
    )
}

export default SearchSIdeBlock