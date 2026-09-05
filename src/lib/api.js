export const api = {
    request(route, options = {}, credentials = "same-origin") {
        return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${route}`, {
            ...options,
            credentials,
        });
    }
}