"use client";

import React from 'react';
import MeetingWaitingRoom from '@/components/meeting-waiting-page/MeetingWaitingRoom';

export default function MeetingPage() {

    return (
        <div className="bg-[#080809] text-white w-full min-h-188 p-3 flex flex-col ">
            <MeetingWaitingRoom />
        </div>
    )
}
