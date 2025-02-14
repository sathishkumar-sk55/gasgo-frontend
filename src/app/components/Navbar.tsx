'use client'
import * as React from "react"
import Link from "next/link";
import Image from "next/image";
import logo from '../../../public/navBar/HomeLogo.svg'
import profile from '../../../public/navBar/Profile.svg'
import getUserFromAuth from '@/lib/AuthState'
import {useEffect, useState} from "react";
import {User} from "@/models/AuthResponse";
import {redirect} from "next/navigation";


export let user: User | null = null;

export default function Navbar() {

    try {
        user = JSON.parse(sessionStorage.user);
    } catch (error: any) {
        user = null;
    }


    return (
        <nav className="flex justify-between bg-black">
            <div className="nav-item ml-5 mr-5 ">
                <Link href="/home"><Image className="m-2 ml-10" src={logo} alt={"logo"} height={50}/></Link>
            </div>
            <ul className="flex text-white items-center mr-10 ">
                <li className="nav-item m-2"><Link className="" href="/home/placeOrder">Place Order</Link></li>
                <li className="nav-item m-2"><Link className="m-2.5" href="/home/orderHistory">Order
                    History {user?.userId}</Link></li>

                <li className="nav-item m-2">
                    {(user != null) ?
                        (<Link href=""><Image className="m-2" src={profile} alt={"profile"} height={25}/></Link>)
                        : (<Link className="m-2.5" href="/login">Login</Link>)}
                </li>
            </ul>
        </nav>
    )
}
