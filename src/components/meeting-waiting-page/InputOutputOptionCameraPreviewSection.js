import React from 'react'

export default function InputOutputOptionCameraPreviewSection({ className,
    onClick,
    buttonEnabled = false,
    iconScaleClass,
    EnabledIcon,
    DisabledIcon }) {


    return (
        <div className={`${className} flex items-center justify-center h-12 rounded-[1000rem] aspect-square cursor-pointer
                         ${buttonEnabled ? "bg-gray-700" : "bg-red-600"}`}
            onClick={onClick}
        >
            {buttonEnabled ? (<EnabledIcon className={iconScaleClass} />)
                : (<DisabledIcon className={iconScaleClass} />)}
        </div>
    )
}
