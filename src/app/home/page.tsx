"use client"
import React from "react";
import axios from "axios"
import Link from "next/link";
import {CarouselHome} from "@/app/components/CarouseHome";
import {CarouselData} from "@/models/CarouselData";


export default function Login() {

    const carouselCardList: CarouselData[] = [
        {cardName: "Place Order", hyperLink: "/placeOrder"},
        {cardName: "Login", hyperLink: "/login"},
        // Add more cards as needed
    ];


    return (
        <div className="bg-black">
            <div className="relative flex flex-row justify-between border-black text-white text-2xl bg-emerald-200">
                <div>Home</div>
                <Link className="text-2xl bg-amber-300 items-end"
                      href="/placeOrder">PlaceOrder{sessionStorage.getItem("userId")}</Link>
            </div>
            <div className="flex justify-center items-center h-screen text-">
                <CarouselHome carouselCardList={carouselCardList}></CarouselHome>
            </div>
        </div>

    );
}