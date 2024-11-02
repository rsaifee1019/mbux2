import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
export default function TuitionCard() {
    return         <div className="relative w-full h-[100px] md:h-[200px] mt-4">
    <Link href={`/fees`}>
        <Image 
            src="/tuition.jfif" 
            alt="tuition" 
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
        />
        <h1 className="absolute text-lg md:text-2xl font-semibold inset-0 self-center w-fit mx-auto text-center bg-black bg-opacity-20 text-white p-2 rounded-b-lg">
            টিউশন 
        </h1>
    </Link>
</div>
}