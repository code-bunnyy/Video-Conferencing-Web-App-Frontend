'use client';

import React from 'react';
import { FiCamera, FiCheck } from 'react-icons/fi';

import { IoIosArrowDown } from "react-icons/io";

export default function CameraSelector({
    selectorUniqueName,
    cameras,
    selectedCameraId,
    onSelect,
    cameraPermissionStatus }) {

    if (cameraPermissionStatus !== "granted") return (
        <div className='flex items-center gap-2 w-40 bg-gray-500/40 text-white/40 text-[0.7rem] 
                        rounded-[0.4rem] px-2 py-[0.35rem] cursor-not-allowed'
        >
            <FiCamera />
            <span>Permission Needed</span>
        </div>
    );

    if (cameras.length <= 1) return null;

    const selectedCamera = cameras.find((c) => c.deviceId === selectedCameraId);

    return (
        <div className='relative'>
            <button
                popoverTarget={`${selectorUniqueName}-meeting-waiting-room-camera-options-popover`}
                style={{ anchorName: `--${selectorUniqueName}-anchor-for-camera-select-dropdown` }}
                className='camera-selector-trigger flex items-center justify-between gap-2 w-40 bg-gray-500/40 text-white text-[0.7rem] 
                            rounded-[0.4rem] px-2 py-[0.35rem] cursor-pointer'
            >
                <div className='flex items-center gap-2'>
                    <FiCamera />
                    <span className='truncate text-gray-200 max-w-24'>
                        {selectedCamera?.label || "camera"}
                    </span>
                </div>

                <div className='border-l border-l-gray-300/40 pl-2 py-[0.05rem]'>
                    <IoIosArrowDown />
                </div>
            </button>

            <div
                id={`${selectorUniqueName}-meeting-waiting-room-camera-options-popover`}
                popover='auto'
                style={{
                    positionAnchor: `--${selectorUniqueName}-anchor-for-camera-select-dropdown`,
                    position: "absolute",
                    top: "anchor(bottom)",
                    left: "anchor(left)",
                    marginTop: "4px",
                    positionTryFallbacks: "flip-block",
                }}
                className='camera-selector-popover bg-[#FBFBFB]
                        py-1 rounded-lg mt-1 min-w-55 shadow-[0_8px_30px_rgba(0,0,0,0.35)]'
            >
                <div className='flex flex-col'>
                    {
                        cameras.map((camera, index) => (
                            <button
                                key={`meeting-waiting-room-camera-popover-option-camera-id-${camera.deviceId}-option-number-${index}`}
                                onClick={camera.deviceId === selectedCameraId ? null : () => onSelect(camera.deviceId)}
                                className={`flex items-center gap-2 w-full text-left py-2 px-2 text-xs cursor-pointer
                                        ${camera.deviceId === selectedCameraId ?
                                        "bg-blue-200 text-[#093C5D]" :
                                        "hover:bg-gray-200 text-gray-500 hover:text-gray-800"}`}
                            >
                                <FiCheck
                                    className={`text-[0.8rem] ${camera.deviceId === selectedCameraId ? "opacity-100" : "opacity-0"}`}
                                />
                                <span className='block max-w-45 truncate'>
                                    {camera.label || `Camera ${camera.deviceId.slice(0, 5)}`}
                                </span>
                            </button>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
