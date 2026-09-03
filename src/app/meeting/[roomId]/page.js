"use client";

import React from 'react';
import MeetingWaitingRoom from '@/components/meeting-waiting-page/MeetingWaitingRoom';
import Image from 'next/image';

export default function MeetingPage() {

    return (
        <div className="bg-[#080809] text-white w-full min-h-screen flex flex-col ">
            <div className="w-full flex items-center px-8 mt-4">
                <Image 
                    src={"/svgs/app-icon-with-wordmark.svg"}
                    alt="app-icon"
                    width={30}
                    height={30}
                    className='w-30'
                />
            </div>
            <MeetingWaitingRoom />
        </div>
    )
}
