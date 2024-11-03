import PageHero from "@/components/PageHero";
import Notice from "@/models/Notice";

import NoticeBoardClient from "@/components/NoticeBoardClient";

export default async function Notices() {
    const notices = await Notice.find();
    console.log("notices", notices);
    
    return (
        <div className="container mx-auto px-4 py-8">
          
            <NoticeBoardClient notices={notices} />
        </div>
    )
}