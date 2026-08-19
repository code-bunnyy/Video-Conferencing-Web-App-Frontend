import React, { useState } from 'react';
import { getAccessToken } from '@/lib/accessToken';

export default function AccessTokenDisplay() {
    const [accessToken, setAccessToken] = useState("No access token avaiable yet");
    const [fetchStatus, setFetchStatus] = useState("Fetch");

    const fetchAccessToken = async () => {
        setFetchStatus("Fetching...");

        const token = await getAccessToken();
        console.log("here is the token found : ", token);
        if (token) setAccessToken(token);
        else setAccessToken("No access token avaiable yet");

        setFetchStatus("Fetch");
    }

    return (
        <div className='max-w-full'>
            <button
                onClick={fetchAccessToken}
                disabled={fetchStatus === "Fetching..."}
                className='text-white bg-black px-3 py-2 rounded-[0.4rem] cursor-pointer'
            >
                {fetchStatus}
            </button>

            <div className='wrap-break-word'>
                {accessToken}
            </div>
        </div>
    )
}
