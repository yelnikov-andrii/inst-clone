
const SwitcherShowRec = ({ value, onChange }: { value: boolean, onChange: React.ChangeEventHandler<HTMLInputElement> }) => {
    return (
        <label className='relative cursor-pointer w-10'>
            <input type='checkbox' className='sr-only peer' checked={value} onChange={onChange} name='showRecommendations' />
            <div className='w-11 h-6 bg-ig-input-text-and-icon-secondary peer-checked:bg-black rounded-2xl transition-colors'></div>
            <div className='absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white peer-checked:translate-x-full transition-transform'></div>
        </label>
    )
}

export default SwitcherShowRec