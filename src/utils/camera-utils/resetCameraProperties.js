const cameraStatusOptions = {
    turningOn: "turning_on",
    on: "on",
    off: "off",
}

export const resetCameraProperties = (
    videoRef, setCameraStream, setCameraStatus, setCameras, setSelectedCameraId) => {

    videoRef.current = null;
    setCameraStream(null);
    setCameraStatus(cameraStatusOptions.off);
    setCameras([]);
    setSelectedCameraId(null);
}