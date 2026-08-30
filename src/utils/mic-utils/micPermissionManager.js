import micStore from "@/zustand-stores/micStore";
import { micStatusOptions } from "./micStatusOptions";


export const micPermissionManager = () => {
    let micPermission;

    const {
        setMics,
        setMicStream,
        setMicStatus,
        setSelectedMicId,
        setMicPermissionStatus,
    } = micStore.getState();


    navigator.permissions.query({ name: "microphone" })
        .then((result) => {
            micPermission = result;
            setMicPermissionStatus(result.state);
            result.onchange = () => {
                setMicPermissionStatus(result.state);
                if(result.state !== "granted") {
                    const { micStream } = micStore.getState();
                    micStream?.getAudioTracks().forEach((track) => track.stop());
                    setMics([]);
                    setMicStream(null);
                    setMicStatus(micStatusOptions.off);
                    setSelectedMicId(null);
                }
            }
        })
        .catch((error) => console.error("Mic permission query failed: ", error));

    return () => {
        if(micPermission) micPermission.onchange = null;
    }
}

