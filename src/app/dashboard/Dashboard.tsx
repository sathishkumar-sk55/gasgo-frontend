"use client"
import {getUserName} from "@/lib/getname";
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";


export default function Dashboard() {
    const { data: session } = useSession()
    console.log("1"+JSON.stringify(session))

    if (session?.user?.role === "USER") {
        return <p>You are an admin, welcome!</p>
    }
    const username =  session?.user.username;
    return (
<p>You are not authorized to view this page! {username}</p>

    )

}
