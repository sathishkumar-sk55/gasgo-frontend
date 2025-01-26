import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex h-screen items-center justify-between">
            [ Gas GO ]
            <Link href="/login">Go to login page</Link>
        </main>
    );
}
