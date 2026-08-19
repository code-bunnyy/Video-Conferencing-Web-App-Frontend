import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { cookies } from "next/headers";
import { parseCookie } from "cookie";


export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],

    callbacks: {
        async signIn({ account }) {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/user-login`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ googleIdToken: account.id_token }),
                    },
                )

                const setCookieHeaders = response.headers.getSetCookie();
                const setCookieHeader = setCookieHeaders.find(header => header.includes("refreshToken"));

                if (setCookieHeader) {
                    const parsedCookies = parseCookie(setCookieHeader);
                    const refreshToken = parsedCookies.refreshToken;

                    if (refreshToken) {
                        const cookieStore = await cookies();
                        cookieStore.set("refreshToken", refreshToken, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === "production",
                            sameSite: "strict",
                            maxAge: 7 * 24 * 60 * 60,
                            path: "/api/auth/renew-access-token",
                        });
                    }
                }

                return true;
            }
            catch (error) {
                console.error("Express backend authentication failed: ", error);
                return false;
            }
        },

        async jwt({ token, account }) {
            if (account) {
                token.googleIdToken = account.id_token;
            }

            return token;
        },

        async session({ session, token }) {
            if (token) {
                session.googleIdToken = token.googleIdToken;
            }
            return session
        }
    },

    events: {
        async signOut() {
            const cookieStore = await cookies();
            cookieStore.delete({ name: "refreshToken", path: "/api/auth/renew-access-token" });
        },
    },

    pages: {
        signIn: "/login",
    },

    session: {
        strategy: "jwt"
    }
})