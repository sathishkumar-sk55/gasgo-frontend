
import Credentials from "next-auth/providers/credentials"
import { saltAndHashPassword } from "@/lib/password"
import {getUserFromDb} from "@/lib/fetechUserFromDB";

import NextAuth, {type DefaultSession,type User, type Session} from 'next-auth';
import { JWT } from "next-auth/jwt"
import {AdapterUser} from "@auth/core/adapters";




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
// declare module "@auth/core" {
//     interface User {
//         userId: number;
//         username: string;
//         role: string;
//         isAuthentication: boolean,
//         token: string;
//     }
// }
//
// declare module "@auth/core/adapters" {
//     interface AdapterUser {
//         userId: number;
//         username: string;
//         role: string;
//         isAuthentication: boolean,
//         token: string;
//     }
// }

declare module "next-auth/jwt" {
    interface JWT {
        userId?: number;
        username?: string;
        role?: string;
        isAuthentication?: boolean;
        token?: string;
    }
}

// @ts-ignore
export const { handlers, signIn, signOut, auth } = NextAuth(
    {   debug: true,
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
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                let user:any = null

                // logic to salt and hash password
                // const pwHash = saltAndHashPassword(credentials.password)

                // logic to verify if the user exists
                user = await getUserFromDb(credentials)

                if (!user) {
                    // No user found, so this is their first attempt to login
                    // Optionally, this is also the place you could do a user registration
                    throw new Error("Invalid credentials.")
                }

                console.log("user inside autherize " +user)
                return user
                // return user object with their profile data
                // return user
            },
        }),
    ],

        callbacks: {
            async jwt({ token, user }) {
                console.log("jwt token "+JSON.stringify(token))
                console.log("jwt user "+JSON.stringify(user))
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
               console.log("session session"+JSON.stringify(session))
               console.log("session token"+JSON.stringify(token))
               console.log("session user "+JSON.stringify(user))


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