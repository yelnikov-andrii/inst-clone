import { TaggedLargeIcon } from '../icons'

const TaggedDefault = () => {
    return (
        <div className='flex justify-center items-center flex-col mt-6'>
            <TaggedLargeIcon />
            <p className="font-extrabold text-3xl mb-10">
                Світлини з вами
            </p>
            <p className="text-sm text-black mb-6">
                Коли вас позначать на світлинах, вони відобразяться тут.
            </p>
        </div>
    )
}

export default TaggedDefault