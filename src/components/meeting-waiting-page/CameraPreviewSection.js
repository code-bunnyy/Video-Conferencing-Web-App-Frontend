'use client';

import React, { useState, useRef, useEffect } from 'react';

import cameraStore from '@/zustand-stores/cameraStore';

import { FiMic, FiMicOff, FiVideo, FiVideoOff } from "react-icons/fi";
import { IoVolumeHigh, IoVolumeMute } from "react-icons/io5";

import InputOutputOptionCameraPreviewSection from './InputOutputOptionCameraPreviewSection';

import { cameraPermissionStatusEffect } from '@/utils/camera-utils/cameraPermissionStatusEffect';
import { cameraStatusEffect } from '@/utils/camera-utils/cameraStatusEffect';
import { selectedCameraIdEffect } from '@/utils/camera-utils/selectedCameraIdEffect';
import { permissionManager } from '@/utils/camera-utils/permissionManager';
import { cameraStatusOptions } from '@/utils/camera-utils/cameraStatusOptions';

import CameraOrAvatar from './CameraOrAvatar';
import CameraSelector from './CameraSelector';



export default function CameraPreviewSection({ className }) {

    const videoRef = useRef(null);

    const cameraStream = cameraStore((state) => state.cameraStream);

    const cameraStatus = cameraStore((state) => state.cameraStatus);
    const setCameraStatus = cameraStore((state) => state.setCameraStatus);

    const cameras = cameraStore((state) => state.cameras);

    const selectedCameraId = cameraStore((state) => state.selectedCameraId);
    const setSelectedCameraId = cameraStore((state) => state.setSelectedCameraId);

    const cameraPermissionStatus = cameraStore((state) => state.cameraPermissionStatus);

    const userData = {
        email: "akhilendraojha@gmail.com",
        name: "Akhilendra Ojha",
    }


    useEffect(() => permissionManager(), []);

    useEffect(() => { cameraPermissionStatusEffect() }, [cameraPermissionStatus]);

    useEffect(() => selectedCameraIdEffect(videoRef), [selectedCameraId]);

    useEffect(() => cameraStatusEffect(videoRef), [cameraStatus]);

    useEffect(() => {
        if (cameraStatus === cameraStatusOptions.on && cameraStream && videoRef.current) {
            videoRef.current.srcObject = cameraStream;
        }
    }, [cameraStatus, cameraStream]);


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
                    <CameraSelector
                        selectorUniqueName={"camera-selector-number-1"}
                        cameras={cameras}
                        selectedCameraId={selectedCameraId}
                        onSelect={handleCameraSelect}
                        cameraPermissionStatus={cameraPermissionStatus}
                    />
                </div>

                <div className='absolute bottom-0 flex items-center justify-between w-full px-0 py-3'>
                    <div></div>
                    <div className='flex items-center gap-3 px-3'>
                        <InputOutputOptionCameraPreviewSection
                            iconScaleClass={"scale-[0.92]"}
                            EnabledIcon={FiMic}
                            DisabledIcon={FiMicOff}
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