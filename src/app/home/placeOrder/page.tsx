"use client"
import {OrderAddressSelection} from "@/app/components/OrderAddressSelection";
import {OrderContactSelection} from "@/app/components/OrderContactSelection";
import OrderPlacementButton from "@/app/components/OrderPlacementButton";
import {user} from "@/app/components/Navbar"
import {redirect} from "next/navigation";
import backgroundImg1 from "@/../public/orderPlacement/bg2.svg"
import Image from "next/image";
import React from "react";


export default function PlaceOrderPage() {
    if (user === null) {
        return redirect("/login");
    } else return (
        <div
            className=" relative flex  justify-center  text-white w-full h-screen bg-[#99E4FF] ">
            <Image className="flex w-auto w-full opacity-50  bg-amber-900  " src={backgroundImg1}
                   alt={"backgroundImg1"}
            />
            <div className="flex flex-col absolute justify-center mt-20">

                <div className="flex flex-row m-5 bg-blue">Address : <OrderAddressSelection/></div>
                <div className="flex flex-row m-5">Contact : <OrderContactSelection/></div>
                <OrderPlacementButton/>
            </div>
        </div>
    );
}
