import type React from "react";

const BioTextArea = ({ value, onChange }: { value: string, onChange: React.ChangeEventHandler<HTMLTextAreaElement> }) => {
    const maxLength = 150;
    return (
        <div>
            <textarea className='w-full bg-ig-highlight-background placeholder:text-ig-secondary-text px-4 py-2 rounded-lg h-16 resize-none' value={value} onChange={onChange} placeholder='Біографія' name="bio">
            </textarea>
            <span className='text-[12px] text-ig-secondary-text block text-right'>
                {`${value.length}/${maxLength}`}
            </span>
        </div>
    )
}

export default BioTextArea