"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../lib/api";
import SignOutButton from "@/components/SignOutButton";
import AccessTokenDisplay from "@/components/AccessTokenDisplay";
import { getAccessToken } from "../lib/accessToken";

export default function Home() {

    const router = useRouter();
    const [isCreatingRoom, setIsCreatingRoom] = useState(false);


    async function createRoom() {
        setIsCreatingRoom(true);
        try {
            const accessToken = await getAccessToken();

            const response = await api.request("/api/rooms/create-room", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                }
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                sessionStorage.setItem("error", JSON.stringify({
                    status: response.status,
                    message: data.message || "An error occurred while creating the room.",
                    error: data.error || "Unknown error",
                }));
                router.push("/error");
                return;
            }

            router.push(`/meeting/${data.roomId}`);
        }
        catch (error) {
            sessionStorage.setItem("error", JSON.stringify({
                status: 500,
                message: "Network error while creating the room.",
                error: { name: error.name, message: error.message },
            }));
            router.push("/error");
        }
        finally {
            setIsCreatingRoom(false);
        }
    }

    return (
        <div className="p-3 flex flex-col items-start gap-2 text-black text-[0.9rem] font-semibold">
            <button
                onClick={createRoom}
                disabled={isCreatingRoom}
                className="px-3 py-2 cursor-pointer text-white bg-blue-700 rounded-[0.4rem]">
                {isCreatingRoom ? "Creating..." : "Create new meeting"}
            </button>
            <button className="px-3 py-2 cursor-pointer text-white bg-fuchsia-800 rounded-[0.4rem]">Join existing meeting</button>

            <AccessTokenDisplay />
            <SignOutButton
                className="text-white bg-black px-3 py-2 rounded-[0.4rem] cursor-pointer"
            />
        </div>
    );
}
