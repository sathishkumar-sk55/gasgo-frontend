"use client"
import React, {useEffect} from "react";
import {redirect, useRouter} from "next/navigation";

import {handleSignInAction} from "@/lib/HandleSignInAction";
import getUserFromAuth from "@/lib/AuthState";
import {User} from "@/models/AuthResponse";

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

        try {
            setLoading(true);
            setButtonDisabled(true);

            await handleSignInAction(user).then(async (isLoggedin: boolean) => {
                    if (isLoggedin) {
                        await getUserFromAuth()
                            .then((LoggedInUser: User | null) => {
                                    sessionStorage.setItem("user", JSON.stringify(LoggedInUser));
                                    console.log(LoggedInUser)
                                    router.push("/home")
                                }
                            )

                    } else {
                        console.log("error in loginOnClick 1");
                        setLoginFailure(true);
                        user.password = "";
                        setLoading(false);
                    }
                }
            )
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

                    <div className="">
                        <label htmlFor="username">User Name </label>
                        <input
                            id="username"
                            name="username"
                            type="username"
                            placeholder="username"
                            className="input input-bordered input-success w-full max-w-xs text-white text-center bg-transparent/10"
                            onChange={(event) => setUser({...user, username: event.target.value})}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password </label>
                        <input
                            id="password"
                            name="Password"
                            type="password"
                            placeholder="password"
                            value={user.password}
                            className="input input-bordered input-success w-full max-w-xs text-white text-center bg-transparent/10"
                            onChange={(event) => setUser({...user, password: event.target.value})}
                        />
                    </div>
                    <div className="flex items-center justify-center pt-2.5 pb-2.5">
                        <button
                            type={"submit"}
                            disabled={buttonDisabled}
                            onClick={() => loginOnClick()}
                            className="btn btn-wide flex items-center justify-center bg-emerald-300 pl-1 pr-1 pt-0.5 pb-0.5">{loading ? "Loading..." : "Login"}
                        </button>
                    </div>
                </form>


            </div>
        </div>
    );
}