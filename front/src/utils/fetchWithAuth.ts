import { url as baseUrl } from "./url";

export async function fetchWithAuth(url: string, options: any = {}) {
    try {
        const accessToken = localStorage.getItem("inst_accessToken");

        const fetchOptions = { ...options, headers: { ...options?.headers, Authorization: `Bearer ${accessToken}` }, credentials: 'include' };

        const response = await fetch(url, fetchOptions);

        if (response.status === 401) {
            console.log('response 401')
            const refreshResponse = await fetch(`${baseUrl}/refresh`, {
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                method: "POST"
            });

            if (refreshResponse.ok) {
                const res = await refreshResponse.json();
                localStorage.setItem("inst_accessToken", res.accessToken);
                fetchOptions.headers.Authorization = `Bearer ${accessToken}`;
                return await fetchWithAuth(url, fetchOptions);
            } else {
                localStorage.removeItem("inst_user");
                localStorage.removeItem("inst_aceesToken");
                // window.location.href = '/login';
            }
        }

        return response;
    } catch (e) {
        console.log(e);
        throw e;
    }
}