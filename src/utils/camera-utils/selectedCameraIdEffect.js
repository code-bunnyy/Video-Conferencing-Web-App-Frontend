import cameraStore from "@/zustand-stores/cameraStore";
import { getCameraStream } from "./getCameraStream";


export const selectedCameraIdEffect = (videoRef = null) => {
    async function handleDeviceChange() {
        const {
            setCameras,
            selectedCameraId,
        } = cameraStore.getState();

        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoInputs = devices.filter((d) => d.kind === "videoinput");

            setCameras(videoInputs);

            const stillExists = videoInputs.find((d) => d.deviceId === selectedCameraId);

            if (!stillExists) {
                getCameraStream(videoRef);
            }
        }
        catch (error) {
            console.log("Error occurred while handling device change:", error);
        }
    }

    navigator.mediaDevices.addEventListener("devicechange", handleDeviceChange);

    return () => {
        navigator.mediaDevices.removeEventListener("devicechange", handleDeviceChange);
    }
}