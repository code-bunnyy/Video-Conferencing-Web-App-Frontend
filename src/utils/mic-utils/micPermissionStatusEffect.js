import micStore from "@/zustand-stores/micStore";

export const micPermissionStatusEffect = async () => {
    const {
        micPermissionStatus,
        setMics,
        selectedMicId,
        setSelectedMicId,
    } = micStore.getState();

    try {
        if(micPermissionStatus !== "granted") return;

        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioInputs = devices.filter((d) => d.kind === "audioinput");

        setMics(audioInputs);
        if(!selectedMicId && audioInputs[0]) {
            setSelectedMicId(audioInputs[0].deviceId);
        }
    }
    catch (error) {
        console.error("Failed to enumerate mics:", error);
        setMics([]);
        setSelectedMicId(null);
    }
}

