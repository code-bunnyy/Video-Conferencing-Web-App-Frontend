import { cameraStatusOptions } from "./cameraStatusOptions";

export const resetCameraProperties = (
    videoRef, setCameraStream, setCameraStatus, setCameras, setSelectedCameraId
) => {

    if(videoRef?.current) {
        videoRef.current.srcObject = null;
        videoRef.current = null;
    }
    
    setCameraStream(null);
    setCameraStatus(cameraStatusOptions.off);
    setCameras([]);
    setSelectedCameraId(null);
}