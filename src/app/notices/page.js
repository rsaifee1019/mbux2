import NoticePage from "@/components/NoticePage";
import Notice from "@/models/Notice";

import NoticeBoardClient from "@/components/NoticeBoardClient";

export default async function Notices() {
    const notices = await Notice.find();
    console.log("notices", notices);
    
    return <NoticeBoardClient notices={notices} />
}