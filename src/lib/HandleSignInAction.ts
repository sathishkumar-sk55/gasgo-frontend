"use server";
import { signIn } from '@/lib/auth';

export const  handleSignInAction= async (user:any) => {
    try {
        // await signIn("credentials",user, { redirectTo: "/home" });
        await signIn("credentials", {
                redirect: false,
                username: user.username,
                password: user.password
            }
            ,);


    } catch (error) {
        console.log("error in Sign in "+error);
        return false;
    }
    return true;
};