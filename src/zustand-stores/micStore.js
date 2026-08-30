import { create } from "zustand";
import { micStatusOptions } from "@/utils/mic-utils/micStatusOptions";


const micStore = create((set) => ({
    mics: [],
    micStream: null,
    micStatus: micStatusOptions.off,
    selectedMicId: null,
    micPermissionStatus: "prompt",

    setMics: (newMics) => set({ mics: newMics }),

    setMicStream: (newMicStream) => set({ micStream: newMicStream }),

    setMicStatus: (newMicStatus) => set({ micStatus: newMicStatus }),

    setSelectedMicId: (newSelectedMicId) => set({ selectedMicId: newSelectedMicId }),

    setMicPermissionStatus: (newMicPermissionStatus) => set({ micPermissionStatus: newMicPermissionStatus }),
}));

export default micStore;



