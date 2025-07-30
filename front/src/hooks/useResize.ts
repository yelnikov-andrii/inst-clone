import { useEffect, useState } from "react";

export const useResize = (width: number) => {
    const [screenWidth, setScreenWidth] = useState(false);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth <= width) {
                setScreenWidth(true);
            } else {
                setScreenWidth(false);
            }
        }

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return { screenWidth };

}