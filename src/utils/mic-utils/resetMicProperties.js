import { micStatusOptions } from "./micStatusOptions";

export const resetMicProperties = (
    audioRef, setMicStream, setMicStatus, setMics, setSelectedMicId
) => {
    if(audioRef?.current) {
        audioRef.current.srcObject = null;
        audioRef.current = null;
    }
    
    setMicStream(null);
    setMicStatus(micStatusOptions.off);
    setMics([]);
    setSelectedMicId(null);
}

