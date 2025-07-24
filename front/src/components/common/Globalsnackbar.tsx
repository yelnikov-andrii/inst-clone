import clsx from "clsx";
import { useEffect, useState } from "react"

const Globalsnackbar = ({ text, duration=3500 }: { text: string, duration?: number }) => {
    const [isVisible, setisVisible] = useState(false);

    useEffect(() => {
        setisVisible(true);

        const timer = setTimeout(() => {
            setisVisible(false);
        }, duration);

        return () => {
            clearTimeout(timer);
        }
    }, [])

    return (
        <div className={clsx('bg-black absolute bottom-0 left-0 right-0 h-15 text-white py-3 px-4 z-50 transform transition-transform', {
            'translate-y-0': isVisible,
            'translate-y-20': !isVisible
        })}>
            {text}
        </div>
    )
}

export default Globalsnackbar