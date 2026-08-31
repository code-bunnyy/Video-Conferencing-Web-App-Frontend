"use client";

import { useEffect, useRef } from "react";
import { FiMic, FiMicOff } from "react-icons/fi";
import WaveSurfer from "wavesurfer.js";
import RecordPlugin from "wavesurfer.js/dist/plugins/record.esm.js";
import { micStatusOptions } from "@/utils/mic-utils/micStatusOptions";

export default function AudioVisualizer({ micStream, micStatus, className = "" }) {
    const containerRef = useRef(null);

    useEffect(() => {
        if (micStatus !== micStatusOptions.on || !micStream || !containerRef.current) return;

        // Boost gain before visualizing
        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(micStream);
        const gainNode = audioContext.createGain();
        gainNode.gain.value = 4; // boost factor — increase if still flat

        const destination = audioContext.createMediaStreamDestination();
        source.connect(gainNode);
        gainNode.connect(destination);

        const boostedStream = destination.stream;

        const wavesurfer = WaveSurfer.create({
            container: containerRef.current,
            height: 20,
            waveColor: "#ffffff",
            barWidth: 3,
            barGap: 2,
            barRadius: 99,
            cursorWidth: 0,
            interact: false,
        });

        const record = wavesurfer.registerPlugin(RecordPlugin.create({
            scrollingWaveform: true,
            scrollingWaveformWindow: 0.35,
        }));

        const micPreview = record.renderMicStream(boostedStream);

        return () => {
            micPreview.onDestroy();
            wavesurfer.destroy();
            gainNode.disconnect();
            source.disconnect();
            audioContext.close();
        };
    }, [micStatus, micStream]);

    if (micStatus === micStatusOptions.off) {
        return <FiMicOff className={`text-gray-400 text-[0.9rem]`} />;
    }

    if (micStatus === micStatusOptions.turningOn) {
        return <FiMic className={`text-yellow-400 text-[0.9rem] animate-pulse`} />;
    }

    return (
        <div className="@container w-9 h-6 flex items-center justify-center
                         p-2 bg-blue-700 rounded-[1000rem]"
        >
            <div ref={containerRef}
                className={`w-full`}
            />
        </div>
    )
}