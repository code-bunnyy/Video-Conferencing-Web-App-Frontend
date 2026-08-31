'use client';

import React, { useState, useRef, useEffect } from 'react';

import cameraStore from '@/zustand-stores/cameraStore';
import micStore from '@/zustand-stores/micStore';

import { FiMic, FiMicOff, FiVideo, FiVideoOff } from "react-icons/fi";
import { IoVolumeHigh, IoVolumeMute } from "react-icons/io5";

import InputOutputOptionCameraPreviewSection from './InputOutputOptionCameraPreviewSection';

import { cameraPermissionStatusEffect } from '@/utils/camera-utils/cameraPermissionStatusEffect';
import { cameraStatusEffect } from '@/utils/camera-utils/cameraStatusEffect';
import { selectedCameraIdEffect } from '@/utils/camera-utils/selectedCameraIdEffect';
import { cameraPermissionManager } from '@/utils/camera-utils/cameraPermissionManager';
import { cameraStatusOptions } from '@/utils/camera-utils/cameraStatusOptions';

import { micPermissionManager } from '@/utils/mic-utils/micPermissionManager';
import { micPermissionStatusEffect } from '@/utils/mic-utils/micPermissionStatusEffect';
import { selectedMicIdEffect } from '@/utils/mic-utils/selectedMicIdEffect';
import { micStatusEffect } from '@/utils/mic-utils/micStatusEffect';
import { micStatusOptions } from '@/utils/mic-utils/micStatusOptions';


import CameraOrAvatar from './CameraOrAvatar';
import CameraSelector from './CameraSelector';
import MicSelector from './MicSelector';
import AudioVisualizer from './AudioVisualizer';


export default function CameraPreviewSection({ className }) {

    //===============================================================================================
    const videoRef = useRef(null);

    const cameraStream = cameraStore((state) => state.cameraStream);

    const cameraStatus = cameraStore((state) => state.cameraStatus);
    const setCameraStatus = cameraStore((state) => state.setCameraStatus);

    const cameras = cameraStore((state) => state.cameras);

    const selectedCameraId = cameraStore((state) => state.selectedCameraId);
    const setSelectedCameraId = cameraStore((state) => state.setSelectedCameraId);

    const cameraPermissionStatus = cameraStore((state) => state.cameraPermissionStatus);

    //================================================================================================
    
    const audioRef = useRef(null);

    const micStream = micStore((state) => state.micStream);
    const setMicStream = micStore((state) => state.setMicStream);

    const mics = micStore((state) => state.mics);
    const setMics = micStore((state) => state.setMics);

    const micStatus = micStore((state) => state.micStatus);
    const setMicStatus = micStore((state) => state.setMicStatus);

    const selectedMicId = micStore((state) => state.selectedMicId);
    const setSelectedMicId = micStore((state) => state.setSelectedMicId);

    const micPermissionStatus = micStore((state) => state.micPermissionStatus);
    const setMicPermissionStatus = micStore((state) => state.setMicPermissionStatus);

    //================================================================================================

    const userData = {
        email: "akhilendraojha@gmail.com",
        name: "Akhilendra Ojha",
    }

    //================================================================================================
    
    useEffect(() => cameraPermissionManager(), []);

    useEffect(() => { cameraPermissionStatusEffect() }, [cameraPermissionStatus]);

    useEffect(() => selectedCameraIdEffect(videoRef), [selectedCameraId]);

    useEffect(() => cameraStatusEffect(videoRef), [cameraStatus]);

    useEffect(() => {
        if (cameraStatus === cameraStatusOptions.on && cameraStream && videoRef.current) {
            videoRef.current.srcObject = cameraStream;
        }
    }, [cameraStatus, cameraStream]);

    //================================================================================================

    useEffect(() => micPermissionManager(), []);

    useEffect(() => { micPermissionStatusEffect() }, [micPermissionStatus]);

    useEffect(() => selectedMicIdEffect(audioRef), [selectedMicId]);

    useEffect(() => micStatusEffect(audioRef), [micStatus]);

    useEffect(() => {
        if(micStatus === micStatusOptions.on && micStream && audioRef.current) {
            audioRef.current.srcObject = micStream;
        }
    }, [micStatus, micStream]);


    //================================================================================================

    const handleCameraIconClick = () => {
        if (cameraStatus === cameraStatusOptions.off) {
            setCameraStatus(cameraStatusOptions.turningOn);
        }
        else setCameraStatus(cameraStatusOptions.off);
    }

    const handleCameraSelect = (deviceId) => {
        setSelectedCameraId(deviceId);
        if (cameraStatus === cameraStatusOptions.on) {
            setCameraStatus(cameraStatusOptions.turningOn);
        }
    }

    //================================================================================================

    const handleMicIconClick = () => {
        if(micStatus === micStatusOptions.off) {
            setMicStatus(micStatusOptions.turningOn);
        }
        else setMicStatus(micStatusOptions.off);
    }

    const handleMicSelect = (deviceId) => {
        setSelectedMicId(deviceId);
        if(micStatus === micStatusOptions.on) {
            setMicStatus(micStatusOptions.turningOn);
        }
    }

    //================================================================================================

    return (
        <div className={`${className} relative w-full aspect-video overflow-hidden
                        flex items-center justify-center
                        border border-white/10 rounded-[0.9rem]`}
        >
            <CameraOrAvatar
                userData={userData}
                cameraStream={cameraStream}
                videoRef={videoRef}
                cameraStatus={cameraStatus}
            />

            <div className='absolute inset-0 bg-linear-to-b from-transparent from-0% via-transparent via-75% to-black/70 to-100%'>
                <div className='absolute top-0 flex items-center justify-end gap-2 w-full pt-3 pr-3'>
                    <MicSelector 
                        selectorUniqueName={"mic-selector-number-1"}
                        mics={mics}
                        selectedMicId={selectedMicId}
                        onSelect={handleMicSelect}
                        micPermissionStatus={micPermissionStatus}
                    />
                    
                    <CameraSelector
                        selectorUniqueName={"camera-selector-number-1"}
                        cameras={cameras}
                        selectedCameraId={selectedCameraId}
                        onSelect={handleCameraSelect}
                        cameraPermissionStatus={cameraPermissionStatus}
                    />
                </div>

                <div className='absolute bottom-0 flex items-center justify-between w-full'>
                    <div className='flex items-center gap-2 px-3'>
                        <AudioVisualizer 
                            micStatus={micStatus}
                            micStream={micStream}
                        />
                        <div className='text-gray-400 text-[0.8rem]'>
                            {userData.name}
                        </div>
                    </div>

                    <div className='flex items-center gap-3 px-3 py-1'>
                        <InputOutputOptionCameraPreviewSection
                            iconScaleClass={"scale-[0.92]"}
                            buttonEnabled={micStatus !== micStatusOptions.off}
                            EnabledIcon={FiMic}
                            DisabledIcon={FiMicOff}
                            onClick={handleMicIconClick}
                        />

                        <InputOutputOptionCameraPreviewSection
                            buttonEnabled={cameraStatus !== cameraStatusOptions.off}
                            EnabledIcon={FiVideo}
                            DisabledIcon={FiVideoOff}
                            onClick={handleCameraIconClick}
                        />

                        <InputOutputOptionCameraPreviewSection
                            EnabledIcon={IoVolumeHigh}
                            DisabledIcon={IoVolumeMute}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
