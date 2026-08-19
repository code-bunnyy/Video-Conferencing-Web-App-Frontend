import { cookies } from "next/headers";


export async function POST(request) {
    console.log("Request recieved at Next.js Server Side");

    try {
        const { googleIdToken } = await request.json();

        if(!googleIdToken) {
            return Response.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/user-login`, {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({ googleIdToken: googleIdToken }),
        })

        const resHeaders = new Headers();
        const setCookie = response.headers.get("set-cookie");

        if(setCookie) {
            resHeaders.set("set-cookie", setCookie);
        }

        return Response.json({ status: response.status });
    }
    catch (error) {
        return Response.json(
            { error: error.message },
            { status: 400 },
        )
    }    
}