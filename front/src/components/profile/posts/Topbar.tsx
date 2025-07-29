import { LeftArrow } from '../../icons'
import InlineButton from '../../ui/InlineButton'

const Topbar = ({ textBoxIsOpen, back, next, submit }: { textBoxIsOpen: boolean; back: () => void; next: () => void; submit: any }) => {
    return (
        <div className='flex justify-between mb-4 pb-4 w-full'>
            <button onClick={back}>
                <LeftArrow />
            </button>
            {textBoxIsOpen ? (
                <InlineButton title='Поширити' onClick={submit} />
            ) : (
                <InlineButton title='Далі' onClick={next} />
            )}

        </div>
    )
}

export default Topbar