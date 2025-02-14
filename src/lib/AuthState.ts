"use server";

import {auth} from "./auth";
import {User} from "@/models/AuthResponse";

const checkIsAuthenticated = async (): Promise<number | null> => {
    let userId: number | null = null;
    try {

        const session = await auth();
        if (session?.user?.userId != null && session?.user?.userId != undefined) {
            userId = session.user.userId;


            console.log("auth insde if1" + userId)
        } else {
            console.log("auth insde else 2" + userId)
        }
    } catch {
        return userId;
    }
    return userId;

};

export async function getUserName(): Promise<string | null> {
    return "hi"
}


export default checkIsAuthenticated;