"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../lib/api";
import SignOutButton from "@/components/SignOutButton";
import AccessTokenDisplay from "@/components/AccessTokenDisplay";

export default function Home() {

    const router = useRouter();
    const [isCreatingRoom, setIsCreatingRoom] = useState(false);


    async function createRoom() {
        setIsCreatingRoom(true);
        router.push(`/meeting/nzy-umyb-ghr`);
        setIsCreatingRoom(false);
    }

    return (
        <div className="p-3 flex flex-col items-start gap-2 text-black text-[0.9rem] font-semibold">
            <button
                onClick={createRoom}
                disabled={isCreatingRoom}
                className="px-2 py-1 cursor-pointer bg-blue-600">
                {isCreatingRoom ? "Creating..." : "Create new meeting"}
            </button>
            <button className="px-3 py-1 cursor-pointer bg-fuchsia-500">Join existing meeting</button>
            
            <AccessTokenDisplay />
            <SignOutButton 
                className="text-white bg-black px-3 py-2 rounded-[0.4rem] cursor-pointer"
            />
        </div>
    );
}
