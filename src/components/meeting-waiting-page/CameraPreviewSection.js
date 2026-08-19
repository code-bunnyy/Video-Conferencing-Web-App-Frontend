'use client';

import React, { useState, useRef, useEffect } from 'react';

import { FiMic, FiMicOff, FiVideo, FiVideoOff } from "react-icons/fi";
import { IoVolumeHigh, IoVolumeMute } from "react-icons/io5";

import CameraOrAvatar from './CameraOrAvatar';
import CameraSelector from './CameraSelector';

const cameraStatusOptions = {
    turningOn: "turning_on",
    on: "on",
    off: "off",
}

export default function CameraPreviewSection({ className }) {

    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [cameraStatus, setCameraStatus] = useState(cameraStatusOptions.off);
    const [cameras, setCameras] = useState([]);
    const [selectedCameraId, setSelectedCameraId] = useState(null);


    const [cameraPermissionStatus, setCameraPermissionStatus] = useState("prompt");
    const [micPermissionStatus, setMicPermissionStatus] = useState("prompt");

    const userData = {
        email: "akhilendraojha@gmail.com",
        name: "Akhilendra Ojha",
    }


    useEffect(() => {
        let cameraPermission, microphonePermission;

        navigator.permissions.query({ name: "camera" })
            .then((result) => {
                cameraPermission = result;
                setCameraPermissionStatus(result.state);
                result.onchange = () => {
                    setCameraPermissionStatus(result.state);
                    if (result.state !== "granted") {
                        stream?.getVideoTracks().forEach((track) => track.stop());
                        setStream(null);
                        setCameraStatus(cameraStatusOptions.off);
                    }
                }
            })
            .catch((error) => console.error("Camera permission query failed: ", error));

        navigator.permissions.query({ name: "microphone" })
            .then((result) => {
                microphonePermission = result;
                setMicPermissionStatus(result.state);

                result.onchange = () => {
                    setMicPermissionStatus(result.state);
                    if (result.state === "denied") {
                        stream?.getAudioTracks().forEach((track) => track.stop());
                    }
                }
            })
            .catch((error) => console.error("Mic permission query failed: ", error));

        return () => {
            if (cameraPermission) cameraPermission.onchange = null;
            if (microphonePermission) microphonePermission.onchange = null;
        }
    }, []);

    useEffect(() => {
        if (cameraPermissionStatus === "granted") {
            navigator.mediaDevices.enumerateDevices().then((devices) => {
                const videoInputs = devices.filter((d) => d.kind === "videoinput");
                setCameras(videoInputs);
                if (!selectedCameraId && videoInputs[0]) {
                    setSelectedCameraId(videoInputs[0].deviceId);
                }
            });
        }
    }, [cameraPermissionStatus]);


    const resetCameraProperties = () => {
        videoRef.current = null;
        setStream(null);
        setCameraStatus(cameraStatusOptions.off);
        setCameras([]);
        selectedCameraId(null);
    }

    async function getCameraStream() {
        try {
            const initialStreams = await navigator.mediaDevices.getUserMedia({ video: true });
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoInputs = devices.filter((d) => d.kind === "videoinput");

            if (videoInputs.length <= 0) {
                resetCameraProperties();
                return;
            }

            setCameras(videoInputs);

            const actualDeviceId = initialStreams.getVideoTracks()[0]?.getSettings().deviceId;


            const selectedCamera = videoInputs.find((c) => c.deviceId === selectedCameraId);

            const selectedCameraIdToBeSet = selectedCamera ? selectedCamera.deviceId
                : (actualDeviceId || videoInputs[0].deviceId);

            console.log("selectedCameraIdToBeSet: ", selectedCameraIdToBeSet);
            if (selectedCameraIdToBeSet) {
                let selectedStream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        deviceId: { exact: selectedCameraIdToBeSet },
                        width: { ideal: 1920 },
                        height: { ideal: 1080 },
                        frameRate: { ideal: 30 },
                    }
                });

                setCameraStatus(cameraStatusOptions.on);
                setStream(selectedStream);
                setSelectedCameraId(selectedCameraIdToBeSet);
            }

            initialStreams.getTracks().forEach((track) => track.stop());
        }
        catch (error) {
            console.error("some error occured while fetching video media: ", error);
            setStream(null);
            setCameraStatus(cameraStatusOptions.off);
        }
    }

    useEffect(() => {
        function handleDeviceChange() {
            navigator.mediaDevices.enumerateDevices().then((devices) => {
                const videoInputs = devices.filter((d) => d.kind === "videoinput");
                setCameras(videoInputs);

                const stillExists = videoInputs.find((d) => d.deviceId === selectedCameraId);

                if (!stillExists) {
                    getCameraStream();
                }
            })
        }

        navigator.mediaDevices.addEventListener("devicechange", handleDeviceChange);

        return () => {
            navigator.mediaDevices.removeEventListener("devicechange", handleDeviceChange);
        }
    }, [selectedCameraId]);

    useEffect(() => {

        if (cameraStatus === cameraStatusOptions.turningOn) {
            getCameraStream();
        }


        if (cameraStatus === cameraStatusOptions.off) {
            stream?.getTracks().forEach((track) => track.stop());
            setStream(null);
        }

        return () => {
            stream?.getTracks().forEach((track) => track.stop());
        }
    }, [cameraStatus]);


    useEffect(() => {
        if (cameraStatus === cameraStatusOptions.on && stream && videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    }, [cameraStatus, stream]);


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
                stream={stream}
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
                    <CameraSelector
                        selectorUniqueName={"camera-selector-number-2"}
                        cameras={cameras}
                        selectedCameraId={selectedCameraId}
                        onSelect={handleCameraSelect}
                        cameraPermissionStatus={cameraPermissionStatus}
                    />

                    <CameraSelector
                        selectorUniqueName={"camera-selector-number-3"}
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



function InputOutputOptionCameraPreviewSection({ className,
    onClick,
    buttonEnabled = false,
    iconScaleClass,
    EnabledIcon,
    DisabledIcon }) {

    return (
        <div className={`${className} flex items-center justify-center h-12 rounded-[1000rem] aspect-square cursor-pointer
                         ${buttonEnabled ? "bg-gray-700" : "bg-red-600"}`}
            onClick={onClick}
        >
            {buttonEnabled ? (<EnabledIcon className={iconScaleClass} />)
                : (<DisabledIcon className={iconScaleClass} />)}
        </div>
    )
}








