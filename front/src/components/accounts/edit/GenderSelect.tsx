import React, { type Dispatch, type SetStateAction } from 'react'

const GenderSelect = ({ value, setValue }: { value: string, setValue: Dispatch<SetStateAction<string>> }) => {

    return (
        <select value={value} onChange={(e) => setValue(e.target.value)} className='w-full bg-ig-highlight-background px-4 py-2 rounded-lg border border-ig-separator outline-none'>
            <option value="other" defaultValue="other">Волію не вказувати</option>
            <option value="male">Чоловіча</option>
            <option value="female">Жіноча</option>
        </select>
    )
}

export default GenderSelect