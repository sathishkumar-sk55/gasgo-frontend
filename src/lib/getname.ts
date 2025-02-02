"use server"
import { auth } from "@/lib/auth";


export const getUserName = async () => {
    const session = await auth();

        return session?.user.username

};