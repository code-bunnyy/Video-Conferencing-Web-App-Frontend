"use client";


import React from 'react';

import { FiMic, FiCheck } from "react-icons/fi";
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
                className='camera-selector-popover bg-[#2a2626] py-1 
                        rounded-lg mt-1 min-w-55 shadow-[0_8px_30px_rgba(0,0,0,0.35)]'
            >
                <div className='flex flex-col gap-0.5'>
                    {
                        mics.map((mic, index) => (
                            <button
                                key={`meeting-waiting-room-mic-popover-option-mic-id-${mic.deviceId}-option-number-${index}`}
                                onClick={mic.deviceId === selectedMicId ? null : () => onSelect(mic.deviceId)}
                                className={`flex items-center gap-2 w-full text-left px-2 py-2 text-xs cursor-pointer
                                            ${mic.deviceId === selectedMicId ?
                                        "bg-white/80 text-[#051b29] font-semibold" :
                                        "hover:bg-gray-700 text-gray-200 hover:text-gray-100"}`}
                            >
                                <FiCheck
                                    className={`text-[0.8rem] stroke-3 ${mic.deviceId === selectedMicId ? "opacity-100" : "opacity-0"}`}
                                />

                                <span className='block max-w-45 truncate '>
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


