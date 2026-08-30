import cameraStore from "@/zustand-stores/cameraStore";
import { cameraStatusOptions } from "./cameraStatusOptions";

export const cameraPermissionManager = () => {
    let cameraPermission;

    const {
        setCameraPermissionStatus,
        setCameraStream,
        setCameraStatus,
        setCameras,
        setSelectedCameraId,
    } = cameraStore.getState();

    navigator.permissions.query({ name: "camera" })
        .then((result) => {
            cameraPermission = result;
            setCameraPermissionStatus(result.state);
            result.onchange = () => {
                setCameraPermissionStatus(result.state);
                if (result.state !== "granted") {
                    const { cameraStream } = cameraStore.getState();
                    cameraStream?.getVideoTracks().forEach((track) => track.stop());
                    setCameras([]);
                    setCameraStream(null);
                    setCameraStatus(cameraStatusOptions.off);
                    setSelectedCameraId(null);
                }
            }
        })
        .catch((error) => console.error("Camera permission query failed: ", error));

    return () => {
        if (cameraPermission) cameraPermission.onchange = null;
    }
}