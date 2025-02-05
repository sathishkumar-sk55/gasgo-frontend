import axios, {AxiosResponse} from "axios";
import {User} from "@/models/AuthResponse";
export interface ApplicationUser {
    userId: number | null | undefined,
    username: string
    email: string
}

export async function getUserFromDb(credentials: any): Promise<User | null> {
    try {
        const response: AxiosResponse<User | null> = await axios.post(process.env.NEXT_PUBLIC_USERHUB_BASE_URL + "/user/verify/auth", credentials);

        //TODO : need to change logics for feteching userid in order related APIs
        if (response.status == 202) {

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
    }
    catch (error: any) {
        console.log(error.message);
    }
    return null;
}