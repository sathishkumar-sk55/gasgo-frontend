"use server";

import {auth} from "./auth";

let userId: number | null = null;
let isLoggedIn: boolean = false;

const checkIsAuthenticated = async () => {
    try {
        if (!isLoggedIn) {
            const session = await auth();
            console.log("Auth", session?.user?.userId);
            if (session?.user?.userId != null && session?.user?.userId != undefined) {
                userId = session.user.userId;
                isLoggedIn = true;
            }
            return isLoggedIn;
        }
    } catch {
        return isLoggedIn;
    }

};


export default checkIsAuthenticated;