import cameraStore from "@/zustand-stores/cameraStore";

export const cameraPermissionStatusEffect = async () => {
    const {
        cameraPermissionStatus,
        setCameras,
        setSelectedCameraId,
        selectedCameraId,
    } = cameraStore.getState();

    try {
        if (cameraPermissionStatus !== "granted") return;

        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputs = devices.filter((d) => d.kind === "videoinput");

        setCameras(videoInputs);
        if (!selectedCameraId && videoInputs[0]) {
            setSelectedCameraId(videoInputs[0].deviceId);
        }
    }
    catch (error) {
        console.error("Failed to enumerate cameras:", error);
        setCameras([]);
        setSelectedCameraId(null);
    }
}
