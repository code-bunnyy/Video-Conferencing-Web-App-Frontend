"use client";


import React from 'react';

import { FiMic } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";


export default function MicSelector({
    selectorUniqueName,
    mics,
    selectedMicId,
    onSelect,
    micPermissionStatus }) {

    if (micPermissionStatus !== "granted") return (
        <div className='flex items-center gap-2 w-40 bg-gray-500/40 text-white/40 text-[0.7rem] 
                            rounded-[0.4rem] px-2 py-[0.35rem] cursor-not-allowed'
        >
            <FiMic />
            <span>Permission Needed</span>
        </div>
    );

    if (mics.length <= 0) return null;

    const selectedMic = mics.find((m) => m.deviceId === selectedMicId);

    return (
        <div className='relative'>
            <button
                popoverTarget={`${selectorUniqueName}-meeting-waiting-room-mic-options-popover`}
                style={{ anchorName: `--${selectorUniqueName}-anchor-for-mic-select-dropdown` }}
                className='camera-selector-trigger flex items-center justify-between gap-2 w-40 bg-gray-500/40 text-white text-[0.7rem] 
                                rounded-[0.4rem] px-2 py-[0.35rem] cursor-pointer'
            >
                <div className='flex items-center gap-2'>
                    <FiMic />
                    <span className='truncate text-gray-200 max-w-24'>
                        {selectedMic?.label || "camera"}
                    </span>
                </div>

                <div className='border-l border-l-gray-300/40 pl-2 py-[0.05rem]'>
                    <IoIosArrowDown />
                </div>
            </button>

            <div
                id={`${selectorUniqueName}-meeting-waiting-room-mic-options-popover`}
                popover='auto'
                style={{
                    positionAnchor: `--${selectorUniqueName}-anchor-for-mic-select-dropdown`,
                    position: "absolute",
                    top: "anchor(bottom)",
                    left: "anchor(left)",
                    marginTop: "4px",
                    positionTryFallbacks: "flip-block",
                }}
                className='camera-selector-popover p-1 bg-gray-600 border border-white/10 rounded-lg mt-1 min-w-48'
            >
                <div className='flex flex-col gap-1'>
                    {
                        mics.map((mic, index) => (
                            <button
                                key={`meeting-waiting-room-mic-popover-option-mic-id-${mic.deviceId}-option-number-${index}`}
                                onClick={mic.deviceId === selectedMicId ? null : () => onSelect(mic.deviceId)}
                                className={`block w-full text-left px-2 py-1 rounded text-xs cursor-pointer
                                            ${mic.deviceId === selectedMicId ? "bg-[#3e6bff]" : "hover:bg-gray-700"}`}
                            >
                                <span className='block max-w-40 truncate text-white'>
                                    {mic.label || `Mic ${mic.deviceId.slice(0, 5)}`}
                                </span>
                            </button>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}


