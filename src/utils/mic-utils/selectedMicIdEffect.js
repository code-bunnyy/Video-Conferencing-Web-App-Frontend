import micStore from "@/zustand-stores/micStore";
import { getMicStream } from "./getMicStream";

export const selectedMicIdEffect = (audioRef = null) => {
    async function handleDeviceChange() {
        const {
            setMics,
            selectedMicId,
        } = micStore.getState();

        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const audioInputs = devices.filter((d) => d.kind === "audioinput");

            setMics(audioInputs);
            const stillExists = audioInputs.find((d) => d.deviceId === selectedMicId);

            if(!stillExists) {
                getMicStream(audioRef);
            }
        }
        catch (error) {
            console.log("Error occurred while handling device (mic) change: ", error);
        }
    }

    navigator.mediaDevices.addEventListener("devicechange", handleDeviceChange);

    return () => {
        navigator.mediaDevices.removeEventListener("devicechange", handleDeviceChange);
    }
}