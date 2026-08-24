import cameraStore from "@/zustand-stores/cameraStore";
import { resetCameraProperties } from "./resetCameraProperties";
import { cameraStatusOptions } from "./cameraStatusOptions";


export async function getCameraStream(videoRef = null) {
    const {
        setCameraStream,
        setCameraStatus,
        setCameras,
        setSelectedCameraId,
        selectedCameraId,
    } = cameraStore.getState();

    try {
        const initialStreams = await navigator.mediaDevices.getUserMedia({ video: true });
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputs = devices.filter((d) => d.kind === "videoinput");

        if (videoInputs.length <= 0) {
            resetCameraProperties(videoRef, setCameraStream, setCameraStatus, 
                                  setCameras, setSelectedCameraId);
            return;
        }

        setCameras(videoInputs);

        const actualDeviceId = initialStreams.getVideoTracks()[0]?.getSettings().deviceId;

        const selectedCamera = videoInputs.find((c) => c.deviceId === selectedCameraId);

        const selectedCameraIdToBeSet = selectedCamera ? selectedCamera.deviceId
            : (actualDeviceId || videoInputs[0].deviceId);


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
            setCameraStream(selectedStream);
            setSelectedCameraId(selectedCameraIdToBeSet);
        }

        initialStreams.getTracks().forEach((track) => track.stop());
    }
    catch (error) {
        console.error("some error occured while fetching video media: ", error);
        setCameraStream(null);
        setCameraStatus(cameraStatusOptions.off);
    }
}