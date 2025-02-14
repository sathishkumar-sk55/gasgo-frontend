"use server";

import {auth} from "./auth";
import {User} from "@/models/AuthResponse";
import {Simulate} from "react-dom/test-utils";


const getUserFromAuth = async (): Promise<User | null> => {
    let user: User | null = null;
    try {

        const session = await auth();
        if (session?.user?.userId != null && session?.user?.userId != undefined) {
            user = session?.user;
        }
    } catch (error) {
        console.log("Unable to get user from auth" + error);
    }
    return user;
};

export default getUserFromAuth;