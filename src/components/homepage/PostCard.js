import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function PostCard({posts}){
    return(
        <div>
            
            {posts && posts.map((post)=>(
                <Card key={post.id}>
                    <CardHeader>
                        <CardTitle>{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <Image src={post.image} alt={post.title} width={500} height={500}/>
                        <p dangerouslySetInnerHTML={{__html: post.content}}/>
                    </CardContent>
                </Card>
            ))}
           
        </div>
    )
}
