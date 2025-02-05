'use client'
import * as React from "react"
import Link from "next/link";
import Image from "next/image";
import logo from '@/../public/HomeLogo.svg'
import profile from '@/../public/Profile.svg'
import {auth} from '@/lib/auth'
import checkIsAuthenticated from '@/lib/AuthState'
import {useEffect, useState} from "react";



export default function Navbar() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const getIsLoggedIn = async () => {
            const isLoggedIn = await checkIsAuthenticated()
                .then((data)=> {setIsLoggedIn(data)})
            console.log('isLoggedIn', isLoggedIn);
        }
        getIsLoggedIn();
    }, [isLoggedIn]);

    return (
        <nav className="flex justify-between bg-black">
            <div className="nav-item ml-5 mr-5 ">
                <Link href="/home"><Image className="m-2" src={logo} alt={"logo"} height={50} /></Link>
            </div>
            <ul className="flex text-white items-center ">
               <li className="nav-item m-2"><Link className="" href="/placeOrder">Place Order</Link></li>
               <li className="nav-item m-2"><Link className="m-2.5" href="/orderHistory">Order History</Link></li>

               <li className="nav-item m-2">
                   {isLoggedIn?
                       (<Link href=""><Image className="m-2" src={profile} alt={"profile"} height={25} /></Link>)
                       :(<Link className="m-2.5" href="/login">Login</Link>)}
               </li>
            </ul>
        </nav>
    )
}
