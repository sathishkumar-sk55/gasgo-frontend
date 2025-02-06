"use client"
import React from "react";
import Image from "next/image";

import backgroundImg1 from  "../../../public/homePage/backgroundImg1.svg"
import bgTruck from "../../../public/homePage/bgTruck.svg";
import BgImage1 from "../../../public/homePage/BgImage1.svg";
import locationIcon from "../../../public/homePage/locationIcon.svg";
import truckIcon from "../../../public/homePage/truckIcon.svg";
import phoneIcon from "../../../public/homePage/phoneIcon.svg";
import bgImage3 from "../../../public/homePage/bg3.svg";
import bgCylinder from "../../../public/homePage/bgCylinder.svg";

export default function Home() {


    return (
        <div className="bg-black h-screen">

        <div className=" relative text-center">
            <Image className="w-full relative" src={backgroundImg1} alt={"backgroundImg1"} height={25}/>
            <div className="w-full absolute top-0 left-0 text-center mt-10 text-white">
                <h2 className="text-4xl font-bold text-center">
                    Order Gas Anytime, Anywhere
                </h2>
                <h1 className="text-3xl font-bold text-center mt-3">
                    Fast Delivery at your doorstep
                </h1>
                <button className="mt-6 bg-blue-200 hover:bg-blue-400 text-black font-bold py-2 px-4 rounded">
                    Order Now
                </button>
            </div>
        </div>

        <div className="relative text-white bg-black">
            <div className="flex flex-row w-full">
            <Image className="w-1/2 h-fit " src={bgTruck} alt={"Bg_truck"} />
                <div className="w-1/2 relative">
                    <Image className="w-full" src={BgImage1} alt={"BgImage1"} />
                    <div className="w-full absolute top-0 left-0  text-center mt-10  items-center">
                        <h2 className="text-4xl font-bold text-center">
                            Getting your gas clinders in 3 east steps
                        </h2>
                        <h1 className="text-3xl text-center m-5">
                            Step 1 : select your deliver location
                        </h1>
                        <h1 className="relative flex flex-row justify-center">
                                <Image className=" " src={locationIcon} alt={"locationIcon"} height={70} width={70} />
                            <h1 className="relative text-2xl mt-5 ">
                                Choose your delivery location
                            </h1>

                        </h1>
                        <h1 className="text-3xl text-center m-5">
                            Step 2 : Choose your Contact Details
                        </h1>
                        <h1 className="relative flex flex-row justify-center">
                            <Image className=" " src={phoneIcon} alt={"phoneIcon"} height={60} width={60} />
                            <h1 className="relative text-2xl mt-5 ">
                                Enter your preferred contact information
                            </h1>

                        </h1>
                        <h1 className="text-3xl text-center m-5">
                            Step 3: Place your order & get your gas cylinder delivered
                        </h1>
                        <h1 className="relative flex flex-row justify-center">
                            <Image className="ml-10" src={truckIcon} alt={"truckIcon"} height={60} width={60} />
                            <h1 className="relative text-2xl mt-5 ">
                                Complete your order and wait for your gas to be delivered right to your doorstep!
                            </h1>
                        </h1>
                    </div>
                </div>
            </div>
            </div>
            <div className=" relative text-center bg-black">
                <Image className="w-full relative" src={bgImage3} alt={"bgImage3"} />

                <div className="w-full absolute top-0 left-0 text-center mt-10 text-white">
                    <div>
                    <h1 className="text-4xl font-bold text-center">
                       Why Choose Us?
                    </h1>
                    <p className="text-3xl font-bold text-center mt-3">
                        Fast Delivery:  Gas Delivered right to your doorstep in just few hours.
                        </p>
                    <p className="text-3xl font-bold text-center mt-3">
                        Reliable Service: Track your order in real-time, every step of the way.
                    </p>
                    <p className="text-3xl font-bold text-center mt-3">
                        Easy Ordering: Select your address and place an order in minutes- no hassle, just convenience.
                    </p>
                    </div>
                    <Image className="" src={bgCylinder} alt={"bgCylinder"} height={50} width={50} />
                </div>
            </div>
        </div>
    );
}