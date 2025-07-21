import { type Dispatch, type SetStateAction } from 'react'

const BioTextArea = ({ value, setValue }: { value: string, setValue: Dispatch<SetStateAction<string>> }) => {
    const maxLength = 150;
    return (
        <div>
            <textarea className='w-full bg-ig-highlight-background placeholder:text-ig-secondary-text px-4 py-2 rounded-lg h-16 resize-none' value={value} onChange={(e) => setValue(e.target.value)} placeholder='Біографія'>
            </textarea>
            <span className='text-[12px] text-ig-secondary-text block text-right'>
                {`${value.length}/${maxLength}`}
            </span>
        </div>
    )
}

export default BioTextArea