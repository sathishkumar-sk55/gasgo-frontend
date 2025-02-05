import { SessionProvider } from "next-auth/react"
import Dashboard  from "./Dashboard"
import checkIsAuthenticated from "@/lib/AuthState";
import {redirect} from "next/navigation";

export default async function Administrator() {
    const isAuthenticated = await checkIsAuthenticated()


        return(
            <SessionProvider>
                <Dashboard />
            </SessionProvider>

            )

}