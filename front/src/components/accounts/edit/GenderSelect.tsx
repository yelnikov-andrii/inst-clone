import type React from "react"

const GenderSelect = ({ value, onChange }: { value: string, onChange: React.ChangeEventHandler<HTMLSelectElement> }) => {

    return (
        <select value={value} name="gender" onChange={onChange} className='w-full bg-ig-highlight-background px-4 py-2 rounded-lg border border-ig-separator outline-none'>
            <option value="other" defaultValue="other">Волію не вказувати</option>
            <option value="male">Чоловіча</option>
            <option value="female">Жіноча</option>
        </select>
    )
}

export default GenderSelect