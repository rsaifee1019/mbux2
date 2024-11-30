import Image from 'next/image'
import Post from '@/models/Post'
import connectionToDatabase from '@/lib/mongodb'
export default async function PrincipalMessage() {
    await connectionToDatabase()
    const post = {title: 'সালমা শাহাদাত', author: 'অধ্যক্ষ',
       description: 'আমাদের বিশ্ববিদ্যালয়ের পক্ষ থেকে আপনাদের সকলকে জানাই আন্তরিক শুভেচ্ছা। একজন শিক্ষাবিদ হিসেবে এবং এই প্রতিষ্ঠানের অধ্যক্ষ হিসেবে আপনাদের সাথে কিছু কথা শেয়ার করতে পেরে আমি আনন্দিত।গত তিন দশক ধরে আমাদের বিশ্ববিদ্যালয় উচ্চশিক্ষার ক্ষেত্রে একটি উজ্জ্বল নক্ষত্র হিসেবে আলোকবর্তিকা হয়ে আছে। আমাদের প্রাক্তন শিক্ষার্থীরা আজ দেশের বিভিন্ন গুরুত্বপূর্ণ অবস্থানে কর্মরত থেকে জাতির উন্নয়নে অবদান রেখে চলেছেন। আমাদের গবেষণা কার্যক্রম জাতীয় ও আন্তর্জাতিক স্বীকৃতি অর্জন করেছে। বর্তমানে আমাদের রয়েছে অত্যাধুনিক গবেষণাগার, সমৃদ্ধ লাইব্রেরি, এবং দক্ষ শিক্ষকমণ্ডলী। আমরা শুধু পাঠ্যপুস্তকের জ্ঞান নয়, বরং জীবন দক্ষতা, নৈতিক মূল্যবোধ এবং সামাজিক দায়বদ্ধতার শিক্ষাও প্রদান করে থাকি। আমাদের লক্ষ্য শিক্ষার্থীদের একজন যোগ্য নাগরিক হিসেবে গড়ে তোলা।'}
      
    if (!post) return null
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mx-4 flex flex-row justify-between">
        <div className="flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold mb-8 text-center ">অধ্যক্ষের বার্তা</h2>
      <div className="space-y-4">
   
        <div className="text-gray-600 px-4 max-w-[80vw] ">
          <div dangerouslySetInnerHTML={{ __html: post.description }} />
            </div>

        </div></div>
        
        <div className="flex justify-center items-center mb-8">
        <Image src="/principal.jpeg" alt="Principal" width={350} height={350} className='w-[60vw]'/>
        </div>
        </div>
    )
}