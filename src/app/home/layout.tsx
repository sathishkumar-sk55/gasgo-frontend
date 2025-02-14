import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {Toaster} from "@/components/ui/sonner"
import Navbar from "@/app/components/Navbar";
import React from "react";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Gasgo",
    description: "Gasgo",
};


export default function RootLayout(
    {
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <Navbar/>
        {children}<Toaster/></body>
        </html>
    );
}
