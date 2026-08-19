export const api = {
    request(route, options = {}) {
        return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${route}`, {
            ...options,
            credentials: "include",
        });
    }
}