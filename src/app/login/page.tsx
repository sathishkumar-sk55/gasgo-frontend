"use client"
import axios, {AxiosResponse} from 'axios';
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";

interface AuthResponse {

    userId: number;
    username: string;
    role: string;
    isAuthentication: boolean,
    token: string;

}


export default function Login() {


    const [user, setUser] = React.useState(
        {
            username: "",
            password: ""
        }
    );
    const router = useRouter();
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [loginFailure, setLoginFailure] = React.useState(false);

    useEffect(() => {
        if (user.username.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user]);


    const loginOnClick = async () => {
        console.log("loginOnClick");
        try {
            setLoading(true);
            setButtonDisabled(true);
            console.log(process.env.NEXT_PUBLIC_USERHUB_BASE_URL);
            const response: AxiosResponse<AuthResponse> = await axios.post(process.env.NEXT_PUBLIC_USERHUB_BASE_URL + "/user/verify/auth", user);

            console.log(response);

            if (response.status == 202) {
                sessionStorage.setItem('userId', response.data.userId.toString());
                router.push("/home");
            }

        } catch (error: any) {

            console.log(error.message);
            setLoginFailure(true);
            user.password = "";
            setLoading(false);
        }
    }
    return (
        <div
            className="h-screen flex items-center justify-center text-center text-black bg-[url('/background.jpg')] h-screen bg-cover bg-center">
            <div className="bg-black bg-transparent/5">
                <h1 className="text-center text-4xl pb-2">Login</h1>
                <hr className="border-black border-t-2 border-opacity-50"/>
                <label className="text-center text-red-600"
                       htmlFor="login error"
                >{loginFailure ? "Invalid Credentials!!!" : ""}</label>
                <form className="mt-6">
                </form>

                <div className="">
                    <label htmlFor="username">User Name </label>
                    <input
                        id="username"
                        type="text"
                        placeholder="username"
                        className="input input-bordered input-success w-full max-w-xs text-white text-center bg-transparent/10"
                        onChange={(event) => setUser({...user, username: event.target.value})}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password </label>
                    <input
                        id="password"
                        type="text"
                        placeholder="password"
                        value={user.password}
                        className="input input-bordered input-success w-full max-w-xs text-white text-center bg-transparent/10"
                        onChange={(event) => setUser({...user, password: event.target.value})}
                    />
                </div>
                <div className="flex items-center justify-center pt-2.5 pb-2.5">
                    <button
                        onClick={loginOnClick}
                        disabled={buttonDisabled}
                        className="btn btn-wide flex items-center justify-center bg-emerald-300 pl-1 pr-1 pt-0.5 pb-0.5">{loading ? "Loading..." : "Login"}
                    </button>
                </div>

            </div>
        </div>
    );
}