"use client";

import React, { useState, useEffect, useRef } from "react";
import { FiAlertCircle, FiChevronDown } from "react-icons/fi";

const MESSAGE_LIMIT = 60;

function syntaxHighlight(json) {
    const escaped = json
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    return escaped.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        (match) => {
            let cls = "text-gray-400"; // number
            if (/^"/.test(match)) {
                cls = /:$/.test(match) ? "text-red-400" : "text-gray-300"; // key vs string
            } else if (/true|false/.test(match)) {
                cls = "text-gray-300";
            } else if (/null/.test(match)) {
                cls = "text-red-400/70";
            }
            return `<span class="${cls}">${match}</span>`;
        }
    );
}

export default function Page() {
    const [errorData, setErrorData] = useState(null);
    const [mounted, setMounted] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const contentRef = useRef(null);
    const [maxHeight, setMaxHeight] = useState("1.75rem");

    useEffect(() => {
        setMounted(true);

        const storedError = sessionStorage.getItem("error");

        try {
            setErrorData(storedError ? JSON.parse(storedError) : null);
        } catch (error) {
            console.error("Error parsing stored error:", error);
        }
    }, []);

    useEffect(() => {
        if (!contentRef.current) return;
        setMaxHeight(expanded ? `${contentRef.current.scrollHeight}px` : "1.75rem");
    }, [expanded, errorData]);

    if (!mounted) return null;

    if (!errorData) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-[#080809] text-gray-400">
                <div className="text-sm">No error details found.</div>
            </div>
        );
    }

    const isLongMessage = errorData.message?.length > MESSAGE_LIMIT;

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-[#080809] px-6 py-12 text-white">
            <div className="w-full max-w-2xl">

                {/* Header */}
                <div className="mb-6 flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-400/15 bg-red-400/8">
                        <FiAlertCircle className="text-xl text-red-300" />
                    </div>

                    <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-red-300">
                            Error {errorData.status}
                        </div>

                        <div
                            className="mt-0.5 overflow-hidden transition-[max-height] duration-300 ease-in-out"
                            style={{ maxHeight: isLongMessage ? maxHeight : "none" }}
                        >
                            <div
                                ref={contentRef}
                                className="break-words text-lg font-semibold leading-snug text-gray-100"
                            >
                                {errorData.message}
                            </div>
                        </div>

                        {isLongMessage && (
                            <button
                                onClick={() => setExpanded(!expanded)}
                                className="mt-3 flex items-center gap-1 text-xs font-medium text-gray-500 transition-colors cursor-pointer hover:text-gray-300"
                            >
                                <FiChevronDown
                                    className={`text-sm transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                                />
                                {expanded ? "Show less" : "Show full message"}
                            </button>
                        )}
                    </div>
                </div>

                {/* Error details */}
                <div className="overflow-hidden rounded-xl border border-white/8 bg-[#101012]">
                    <div className="border-b border-white/8 px-4 py-3">
                        <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
                            Error Details
                        </span>
                    </div>

                    <pre
                        className="custom-scrollbar max-h-[400px] overflow-y-auto whitespace-pre-wrap break-words px-4 py-4 font-mono text-xs leading-6"
                        dangerouslySetInnerHTML={{
                            __html: syntaxHighlight(JSON.stringify(errorData.error, null, 4)),
                        }}
                    />
                </div>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: rgba(255, 255, 255, 0.12);
                    border-radius: 9999px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: rgba(255, 255, 255, 0.22);
                }
                .custom-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: rgba(255, 255, 255, 0.12) transparent;
                }
            `}</style>
        </div>
    );
}