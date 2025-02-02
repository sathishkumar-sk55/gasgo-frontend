"use server";

import { signIn } from "./auth";

export const  handleSignInAction= async (formData:FormData) => {
    try {
        console.log("inside handleSignInAction "+JSON.stringify(formData));
        await signIn("credentials",formData, { redirectTo: "/home" });
    } catch (error) {
        throw error;
    }
};