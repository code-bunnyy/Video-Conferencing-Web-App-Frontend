import micStore from "@/zustand-stores/micStore";
import { resetMicProperties } from "./resetMicProperties";
import { micStatusOptions } from "./micStatusOptions";


export async function getMicStream(audioRef = null) {
    const {
        setMics,
        setMicStream,
        setMicStatus,
        setSelectedMicId,
        selectedMicId,
    } = micStore.getState();

    try {
        const initialStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioInputs = devices.filter((d) => d.kind === "audioinput");

        if (audioInputs.length <= 0) {
            resetMicProperties(audioRef, setMicStream, setMicStatus, setMics, setSelectedMicId);
            return;
        }

        setMics(audioInputs);

        const actualDeviceId = initialStream.getAudioTracks()[0]?.getSettings().deviceId;

        const selectedMic = audioInputs.find((m) => m.deviceId === selectedMicId);

        const selectedMicIdToBeSet = selectedMic ? selectedMic.deviceId
                            : (actualDeviceId || audioInputs[0].deviceId);
        
        if(selectedMicIdToBeSet) {
            let selectedStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    deviceId: { exact: selectedMicIdToBeSet },
                },
            });

            setMicStatus(micStatusOptions.on);
            setMicStream(selectedStream);
            setSelectedMicId(selectedMicIdToBeSet);
        }

        initialStream.getTracks().forEach((track) => track.stop());
    }
    catch (error) {
        console.error("some error occured while fetching audio input media: ", error);
        setMicStream(null);
        setMicStatus(micStatusOptions.off);
    }
}

