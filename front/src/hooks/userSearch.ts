import { useEffect, useRef, useState } from "react";

export const useSearch = () => {
    const [search, setSearch] = useState('');
    const [appliedSearch, setAppliedSearch] = useState('');

    function handleChangeSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value);
    }

    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            setAppliedSearch(search);
        }, 1000);

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef?.current);
            }
        }
    }, [search]);

    return { handleChangeSearchInput, appliedSearch, search };
}