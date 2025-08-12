import { url } from "./url";

export const createProfileUrl = (src: string | undefined) => {
let avatarUrl = '';

    if (src) {
        if (!src.includes('http')) {
            avatarUrl = `${url}/${src}`;
        } else {
            avatarUrl = src;
        }
    }

    return avatarUrl;
}