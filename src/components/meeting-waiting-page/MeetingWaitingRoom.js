'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import CameraPreviewSection from './CameraPreviewSection';

export default function MeetingWaitingRoom() {
    const { roomId } = useParams();

    return (
        <div className='w-full h-180 grid grid-cols-20 gap-8 p-5'>
            <div className='flex flex-col col-span-14'>
                <CameraPreviewSection />
            </div>
            <div className='col-span-6'>

            </div>
        </div>
    )
}
