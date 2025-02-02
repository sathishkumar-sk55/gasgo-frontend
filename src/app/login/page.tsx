"use client"
import React, {useEffect} from "react";
import {redirect, useRouter} from "next/navigation";
import { signIn } from "@/lib/auth"
// import { signIn } from "next-auth/react"
import {handleSignInAction} from "@/lib/HandleSignInAction";



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


    const loginOnClick = async (formData:FormData) => {
        console.log("loginOnClick");
        try {
            setLoading(true);
            setButtonDisabled(true);

            console.log(formData);

            signIn("credentials",formData)

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
                <form className="mt-6" action={ (formData:FormData) => {
                    console.log("inside 135654"+formData.get("Email"));
                    handleSignInAction(formData)
                }}>

                    <div className="">
                        <label htmlFor="username">User Name </label>
                        <input
                            id="username"
                            name="Email"
                            type="email"
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
                            className="btn btn-wide flex items-center justify-center bg-emerald-300 pl-1 pr-1 pt-0.5 pb-0.5">{loading ? "Loading..." : "Login"}
                        </button>
                    </div>
                </form>


            </div>
        </div>
    );
}