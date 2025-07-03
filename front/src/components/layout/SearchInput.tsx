import React, { useState } from 'react'

const SearchInput = () => {
    const [searchQuery, setSearchQuery] = useState('');

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchQuery(e.target.value);
    }
    return (
        <input
            value={searchQuery}
            onChange={handleChange}
            placeholder='Пошук'
            className='bg-ig-button-secondary-background py-2 w-full px-3 outline-none border-none rounded-lg'
        />
    )
}

export default SearchInput