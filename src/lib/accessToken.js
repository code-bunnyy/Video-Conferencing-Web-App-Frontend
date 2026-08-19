let accessToken = null;
let refreshPromise = null;

function isTokenExpired(token) {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return Date.now() >= payload.exp * 1000;
    } 
    catch {
        return true;
    }
}


export const getAccessToken = async () => {
    if(accessToken && !isTokenExpired(accessToken)) {
        return accessToken;
    }

    if(refreshPromise) return refreshPromise;

    refreshPromise = fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/renew-access-token`,
        {
            method: "POST",
            credentials: "include",
        }
    ).then(async (response) => {
        if(!response.ok) return null;
        const data = await response.json();
        return accessToken = data.accessToken;
    }).catch(() => {
        return null;
    }).finally(() => { refreshPromise = null });

    return refreshPromise;
}

export const clearAccessToken = () => {
    accessToken = null;
    refreshPromise = null;
}


