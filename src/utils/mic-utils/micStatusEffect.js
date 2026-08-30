import micStore from "@/zustand-stores/micStore";
import { micStatusOptions } from "./micStatusOptions";
import { getMicStream } from "./getMicStream";


export const micStatusEffect = (audioRef = null) => {
    const {
        micStream,
        micStatus,
        setMicStream,
    } = micStore.getState();

    if(micStatus === micStatusOptions.turningOn) {
        getMicStream(audioRef);
    }

    if(micStatus === micStatusOptions.off) {
        micStream?.getTracks()?.forEach((track) => track.stop());
        setMicStream(null);
    }

    return () => {
        micStream?.getTracks()?.forEach((track) => track.stop());
    }
}

