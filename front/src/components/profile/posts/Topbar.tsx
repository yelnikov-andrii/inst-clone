import { LeftArrow } from '../../icons'
import InlineButton from '../../ui/InlineButton'

const Topbar = ({ textBoxIsOpen, back, next, submit, postToUpdate }: { textBoxIsOpen: boolean; back: () => void; next: () => void; submit: () => void, postToUpdate?: PostI }) => {
    return (
        <div className='flex justify-between mb-4 pb-4 w-full'>
            <button onClick={back}>
                <LeftArrow />
            </button>
            {postToUpdate && (
                <span>
                    Редагування поста
                </span>
            )}
            {textBoxIsOpen ? (
                <InlineButton title={postToUpdate ? "Редагувати" : 'Поширити'} onClick={submit} />
            ) : (
                <InlineButton title='Далі' onClick={next} />
            )}

        </div>
    )
}

export default Topbar