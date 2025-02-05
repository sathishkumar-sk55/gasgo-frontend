"use server";

import { auth } from "./auth";

const checkIsAuthenticated = async () => {
    const session = await auth();
    console.log("Auth", session?.user?.userId);
    if (session?.user?.userId != null && session?.user?.userId != undefined) {
        return true;
    } else {
        return false;
    }
};


export default checkIsAuthenticated ;