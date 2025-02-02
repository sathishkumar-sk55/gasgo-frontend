'use client'
import * as React from "react"
import Link from "next/link";
import {useState} from "react";



export default function Navbar() {
    var [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    return (
        <nav className="flex justify-between">
            <div className="nav-item ml-5 mr-5 bg-blue-600">
                <Link href="/">Home</Link>
            </div>
            <ul className="flex bg-amber-300">
               <li className="nav-item m-2 hover:bg-amber-100"><Link className="m-2.5" href="/placeOrder">Place Order</Link></li>
               <li className="nav-item m-2 hover:bg-amber-100"><Link className="m-2.5" href="/orderHistory">Order History</Link></li>
               <li className="nav-item m-2 hover:bg-amber-100"><Link className="m-2.5" href="/api/auth/signin">Login</Link></li>
            </ul>
        </nav>
    )
}
