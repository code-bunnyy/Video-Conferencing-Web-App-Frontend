import { create } from "zustand";
import { cameraStatusOptions } from "@/utils/camera-utils/cameraStatusOptions";

const cameraStore = create((set) => ({
    cameras: [],
    cameraStream: null, 
    cameraStatus: cameraStatusOptions.off, 
    selectedCameraId: null, 
    cameraPermissionStatus: "prompt", 

    setCameras: (newCamerasList) => set({ cameras: newCamerasList }),

    setCameraStream: (newCameraStream) => set({ cameraStream: newCameraStream }),

    setCameraStatus: (newStatus) => set({ cameraStatus: newStatus }),

    setSelectedCameraId: (newCameraId) => set({ selectedCameraId: newCameraId }),

    setCameraPermissionStatus: (newPermissionStatus) => set({ cameraPermissionStatus: newPermissionStatus }),
}));


export default cameraStore;

