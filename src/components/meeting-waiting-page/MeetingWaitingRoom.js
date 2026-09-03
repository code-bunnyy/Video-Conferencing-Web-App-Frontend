'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import CameraPreviewSection from './CameraPreviewSection';
import JoinPanel from './JoinPanel';

export default function MeetingWaitingRoom() {
    const { roomId } = useParams();

    return (
        <div className='w-full grid grid-cols-20 gap-16 px-8 mt-12'>
            <div className='flex flex-col col-span-14'>
                <CameraPreviewSection />
            </div>
            <div className='col-span-6'>
                <JoinPanel />
            </div>
        </div>
    )
}
