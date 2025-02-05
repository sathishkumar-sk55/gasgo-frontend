
import Credentials from "next-auth/providers/credentials"
import { saltAndHashPassword } from "@/lib/password"
import {getUserFromDb} from "@/lib/fetechUserFromDB";

import NextAuth, {type DefaultSession,type User, type Session} from 'next-auth';
import { JWT } from "next-auth/jwt"





declare module "next-auth" {
    interface  User{
        userId: number;
        username: string;
        role: string;
        isAuthentication: boolean | undefined;
        token: string | undefined;
    }
    interface Session {
        user: {
            userId: number;
            username: string;
            role: string;
            isAuthentication: boolean | undefined;
            token: string | undefined;

        } & DefaultSession["user"]
    }
}


declare module "next-auth/jwt" {
    interface JWT {
        userId?: number;
        username?: string;
        role?: string;
        isAuthentication?: boolean;
        token?: string;
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth(
    {
        secret: process.env.AUTH_SECRET,
        session: {
        strategy: "jwt",
            maxAge: 60 * 60
        },

    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                username: { label: "username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                let user:any = null
                user = await getUserFromDb(credentials)
                if (!user) {
                    throw new Error("Invalid credentials.")
                }
                return user

            },
        }),
    ],

        callbacks: {
            async jwt({ token, user }) {
                if (user) {
                    return {
                        ...token,
                        userId: user.userId,
                        username: user.username,
                        role: user.role,
                        isAuthentication: user.isAuthentication,
                        token: user.token,

                    }
                }
                return token;
            },

            async session({ session, token,  user}):Promise<Session> {
                return {
                    ...session,
                    user: {
                        ...session.user,
                        userId : token.userId as number,
                        username: token.username as string,
                        role: token.role as string,
                        isAuthentication: token.isAuthentication,
                        token: token.token,
                    },
                }
            },

        },
    });