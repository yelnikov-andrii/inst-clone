import { useEffect, useState } from "react"
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import { url } from "../../utils/url";

export const useGetAllUsers = (query: string) => {
    const [users, setUsers] = useState<UserI[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function fetchUsers(query: string) {
        try {
            setLoading(true);
            setError("");
            const response = await fetchWithAuth(`${url}/users?query=${query}`);
            if (response.ok) {
                const res = await response.json();
                setUsers(res);
            }
        }   catch(e) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError("Неможливо отримати список користувачів")
            }
        }     
    }

    useEffect(() => {
        if (query) {
            fetchUsers(query);
        } else {
            setUsers([]);
        }

    }, [query]);

    return { users, loading, error };

}