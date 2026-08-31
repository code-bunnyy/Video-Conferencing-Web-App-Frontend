'use client';

import React from 'react';
import { signIn } from 'next-auth/react';

export default function Login() {
    return (
        <button
            onClick={() => signIn("google", {
                callbackUrl:"/"
            })}
            className='text-sm text-white bg-black px-3 py-2 m-2 rounded-[0.4rem] cursor-pointer'
        >
            Login with Google
        </button>
    )
}
