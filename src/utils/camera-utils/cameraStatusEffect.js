import cameraStore from "@/zustand-stores/cameraStore";
import { cameraStatusOptions } from "./cameraStatusOptions";
import { getCameraStream } from "./getCameraStream";


export const cameraStatusEffect = (videoRef = null) => {
    const {
        cameraStatus,
        cameraStream,
        setCameraStream,
    } = cameraStore.getState();

    if (cameraStatus === cameraStatusOptions.turningOn) {
        getCameraStream(videoRef);
    }

    if (cameraStatus === cameraStatusOptions.off) {
        cameraStream?.getTracks().forEach((track) => track.stop());
        setCameraStream(null);
    }

    return () => {
        cameraStream?.getTracks().forEach((track) => track.stop());
    }
}