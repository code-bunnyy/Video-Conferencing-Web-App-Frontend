import React from 'react';
import { signOut } from 'next-auth/react';
import { clearAccessToken } from '@/lib/accessToken';

export default function SignOutButton({ className }) {
    const handleLogOut = async () => {
        clearAccessToken();
        await signOut({ callbackUrl: "/login" })
    }

    return (
        <button 
            className={`${className}`}
            onClick={handleLogOut}
        >
            Sign out
        </button>
    )
}
