"use client";

import React from 'react';

import { getColorFromString } from '@/lib/colorFromString';
import { getInitials } from '@/lib/getInitials';



const cameraStatusOptions = {
    turningOn: "turning_on",
    on: "on",
    off: "off",
}


export default function CameraOrAvatar({ cameraStatus, cameraStream, videoRef, userData }) {
    if (cameraStatus === "turning_on") {
        return (
            <div className='w-full h-full flex items-center justify-center bg-[#1d1d21] text-white'>
                Fetching camera
            </div>
        );
    }

    if(cameraStatus === cameraStatusOptions.on && cameraStream) {
        return (
            <div 
                className='w-full h-full'
            > 
                <video 
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className='w-full h-full object-cover'
                />
            </div>
        );
    }

    return (
        <div className='w-full h-full flex items-center justify-center bg-[#1d1d21]'>
            <AvatarElement
                userData={userData}
                className={"h-20"}
                borderClass={"border border-white/7"}
            />
        </div>
    );
}



function AvatarElement({ className, borderClass, userData }) {
    const avatarThemeColor = getColorFromString(userData.email);
    const userInitials = getInitials(userData.name);
    
    return (
        <div className={`${className} aspect-square`}>
            <div className={`w-full h-full flex items-center justify-center rounded-[1000rem]
                        bg-linear-to-br from-[#232336] to-[#16161f]
                        @container ${borderClass}`}
            >
                <div
                    className={`font-semibold text-[35cqi]`}
                    style={{ color: avatarThemeColor }}
                >
                    {userInitials}
                </div>
            </div>
        </div>

    )
}