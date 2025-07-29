import SucessImg from '../../../images/success.gif';

const CreatingPostLoader = ({ type = "loading", text }: { type: "success" | "loading" | "error"; text: string }) => {
    if (type === 'loading') {
        return (
            <div
                className='px-4 pb-10 pt-2 rounded-lg bg-white flex flex-col items-center'>
                <p className='font-semibold mb-15 pb-4 border-b border-b-ig-separator text-center'>
                    {text}
                </p>
                <div className="w-24 h-24 rounded-full border-4 border-t-[#feda75] border-r-[#fa7e1e] border-b-[#d62976] border-l-[#962fbf] animate-spin">
                </div>
            </div>
        )
    }

    if (type === 'success') {
        return (
            <div
                className='px-4 pb-10 pt-2 rounded-lg bg-white flex flex-col items-center'>
                <p className='font-semibold mb-15 pb-4 border-b border-b-ig-separator text-center'>
                    Допис поширено
                </p>
                <div>
                    <img src={SucessImg} />
                    <p className='mt-2'>
                        {text}
                    </p>
                </div>
            </div>
        )
    }

    if (type === 'error') {
        return (
            <div
                className='px-4 pb-10 pt-2 rounded-lg bg-white flex flex-col items-center'>
                <p className='font-semibold mb-15 pb-4 border-b border-b-ig-separator text-center'>
                    Помилка
                </p>
                <div>
                    <p className='text-2xl uppercase font-bold text-red-500'>
                        Error
                    </p>
                    <p className='mt-2'>
                        {text}
                    </p>
                </div>
            </div>
        )
    }
}

export default CreatingPostLoader