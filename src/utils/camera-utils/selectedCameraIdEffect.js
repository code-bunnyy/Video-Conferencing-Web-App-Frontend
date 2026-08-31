import cameraStore from "@/zustand-stores/cameraStore";
import { getCameraStream } from "./getCameraStream";
import { cameraStatusOptions } from "./cameraStatusOptions";

export const selectedCameraIdEffect = (videoRef = null) => {
    async function handleDeviceChange() {
        const {
            setCameras,
            selectedCameraId,
            cameraStatus,
        } = cameraStore.getState();

        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoInputs = devices.filter((d) => d.kind === "videoinput");

            setCameras(videoInputs);

            // Nothing to reconcile if camera was never selected/on
            if (!selectedCameraId || cameraStatus === cameraStatusOptions.off) return;

            const stillExists = videoInputs.find((d) => d.deviceId === selectedCameraId);

            if (!stillExists) {
                getCameraStream(videoRef);
            }
        }
        catch (error) {
            console.log("Error occurred while handling device (camera) change: ", error);
        }
    }

    navigator.mediaDevices.addEventListener("devicechange", handleDeviceChange);

    return () => {
        navigator.mediaDevices.removeEventListener("devicechange", handleDeviceChange);
    }
}