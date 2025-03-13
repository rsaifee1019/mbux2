"use client"
import Image from "next/image"
import { Loader2 } from "lucide-react"

export default function Spinner() {
    return <div className="flex justify-center items-center h-[50vh] w-[95vw]">
    <Image src="/Spinner.svg" alt="Loading..." width={100} height={100} />
    </div>
}