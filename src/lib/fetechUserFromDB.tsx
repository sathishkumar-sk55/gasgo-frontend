import axios, {AxiosResponse} from "axios";
import {User} from "@/models/AuthResponse";
export interface ApplicationUser {
    userId: number | null | undefined,
    username: string
    email: string
}

export async function getUserFromDb(credentials: any): Promise<User | null> {
    try {


        let user = {
            username: credentials.email,
            password: credentials.password
        }

        console.log("user before login"+JSON.stringify(user));



        const response: AxiosResponse<User | null> = await axios.post(process.env.NEXT_PUBLIC_USERHUB_BASE_URL + "/user/verify/auth", user);



        //TODO : need to change logics for feteching userid in order related APIs
        if (response.status == 202) {
            // if (response.data?.userId != null) {
            //     console.log("inside idk "+response.data?.userId);
            //     sessionStorage.setItem('userId', response.data.userId.toString());
            // }
            // return response.data;
            if (response.data != null) {
                return {
                    userId: response.data.userId,
                    username: response.data.username,
                    role: response.data.role,
                    isAuthentication: response.data.isAuthentication,
                    token: response.data.token,
                }
            }

        }

    } catch (error: any) {
        console.log(error.message);
    }
    // return {
    //             userId: 123213,
    //             username:"frost",
    //             email: 'idk@gmail.com'
    //         }

    return null;
}