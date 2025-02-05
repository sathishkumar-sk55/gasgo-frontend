"use client"
import React from "react";
import Link from "next/link";
import {CarouselHome} from "@/app/components/CarouseHome";
import {CarouselData} from "@/models/CarouselData";
import Navbar from "@/app/components/Navbar";
import { useSession } from "next-auth/react"




export default function Home() {



    const carouselCardList: CarouselData[] = [
        {cardName: "Place Order", hyperLink: "/placeOrder"},
        {cardName: "Login", hyperLink: "/login"},
    ];

    return (
        <div>

        <div className="bg-black">
            <div className="relative flex flex-row justify-between border-black text-white text-2xl bg-emerald-200">
                <div>Home</div>
                <Link className="text-2xl bg-amber-300 items-end"
                      href="/placeOrder">PlaceOrder</Link>
            </div>
            <div className="flex justify-center items-center h-screen text-">
                <CarouselHome carouselCardList={carouselCardList}></CarouselHome>
            </div>
        </div>
        </div>
    );
}