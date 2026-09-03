"use client";

import React, { useState } from 'react';

import { getColorFromString } from '@/lib/colorFromString';
import { getInitials } from '@/lib/getInitials';

import { FiCopy, FiCheck } from "react-icons/fi";
import { FiAlertCircle } from "react-icons/fi";

import { useParams } from 'next/navigation';




export default function JoinPanel() {
    const { roomId } = useParams();

    const todaysDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const participants = [
        { name: "Aarav Sharma", email: "aarav@example.com" },
        { name: "Priya Mehta", email: "priya@example.com" },
        { name: "Rohan Verma", email: "rohan@example.com" },
        { name: "Ananya Singh", email: "ananya@example.com" },
        { name: "Vikram Patel", email: "vikram@example.com" },
        { name: "Neha Kapoor", email: "neha@example.com" },
        { name: "Arjun Malhotra", email: "arjun@example.com" },
        { name: "Isha Gupta", email: "isha@example.com" },
    ];

    const maxBadgesToShow = 3;
    const participantsSingularPlural = [null, "participant", "participants"];


    return (
        <div className="">
            <div className='text-gray-300 text-xs'>
                <span className='text-gray-500 uppercase'>Waiting Room &bull;</span> {todaysDate}
            </div>
            <div className='text-[1.5rem] text-gray-200 font-semibold'>
                You are all set to Join!
            </div>

            <div className="flex items-start gap-3 
                            border border-blue-400/15 bg-blue-400/8 
                            px-4 py-3 rounded-lg mt-12">
                <FiAlertCircle className="mt-0.5 shrink-0 text-lg text-blue-300/80" />

                <div>
                    <p className="text-sm font-medium text-blue-200">
                        Check your camera and microphone
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-blue-200/60">
                        Make sure your camera and microphone are working properly before joining.
                    </p>
                </div>
            </div>

            <div className="mt-15 block">
                <div className="inline-flex items-center gap-1">
                    {
                        participants.slice(0, maxBadgesToShow).map((participant, index) => (
                            <ParticipantBadge
                                key={`meeting-waiting-room-join-panel-meeting-participant-number-${index}`}
                                participantData={participant}
                            />
                        ))
                    }


                </div>

                {
                    participants.length > maxBadgesToShow ? (
                        <span className="text-gray-300 text-sm ml-2">{
                            `and ${participants.length - maxBadgesToShow} more 
                        ${participantsSingularPlural[Math.min(participants.length - maxBadgesToShow, 2)]} in this meeting.`
                        }</span>
                    ) : (
                        <span className="text-gray-300 text-sm ml-2">{"in this meeting."}</span>
                    )
                }
            </div>

            <div className="w-full mt-12">
                <button
                    className="w-full flex items-center justify-center 
                            bg-[#FBFBFB] text-[#080809]
                            text-[0.9rem] font-semibold
                            rounded-[0.3rem] py-2 cursor-pointer
                            hover:bg-white/90 active:bg-white/80"
                >
                    Join Meeting
                </button>
            </div>

            <div className="w-full mt-6 flex items-center justify-between
                            bg-gray-800 text-[0.9rem] font-semibold
                            py-2 px-3 rounded-[0.3rem]
                            border border-white/10"
            >
                <div className='text-gray-400'>{roomId}</div>
                <CopyMeetingId meetingId={roomId} />
            </div>
        </div>
    )
}


function ParticipantBadge({ participantData }) {
    const themeColor = getColorFromString(participantData.email);
    const userInitials = getInitials(participantData.name);

    return (
        <div className="relative group">
            {/* Badge */}
            <div
                className="flex h-7 aspect-square items-center justify-center rounded-[1000rem]
                           bg-linear-to-br from-[#505063] to-[#16161f]
                           @container border border-white/7"
            >
                <span
                    className="font-semibold text-[35cqi]"
                    style={{ color: themeColor }}
                >
                    {userInitials}
                </span>
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                            hidden group-hover:block
                            whitespace-nowrap rounded-md bg-white/10 px-3 py-1.5
                            text-xs text-white shadow-lg
                            border border-white/20">
                {participantData.email}
            </div>
        </div>
    );
}


function CopyMeetingId({ meetingId }) {
    const [copied, setCopied] = useState(false);

    const copyMeetingId = async () => {
        await navigator.clipboard.writeText(meetingId);

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <div className="relative group">
            {copied ? (
                <FiCheck className="text-green-400 text-[1.2rem]" />
            ) : (
                <FiCopy
                    onClick={copyMeetingId}
                    className="text-gray-400 text-[1.2rem] cursor-pointer"
                />
            )}

            <div
                className="absolute right-0 top-full mt-2
                           hidden group-hover:block
                           whitespace-nowrap rounded-md bg-black
                           px-3 py-1.5 text-xs text-white shadow-lg"
            >
                {copied ? "Copied!" : "Copy meeting room ID"}
            </div>
        </div>
    );
}

