import InstaIcon from '../../images/Instagram_icon.png.webp';

const GlobalLoader = () => {
    return (
        <section className='flex flex-col h-screen'>
            <main className='grow-1 flex justify-center items-center'>
                <img src={InstaIcon} alt='Інстаграм значок' className='w-20 h-20 object-cover' />
            </main>
        </section>
    )
}

export default GlobalLoader