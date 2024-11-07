import Image from 'next/image'
import Post from '@/models/Post'
import connectionToDatabase from '@/lib/mongodb'
export default async function PrincipalMessage() {
    await connectionToDatabase()
    const post = {title: 'সালমা শাহাদাত', author: 'অধ্যক্ষ', description: 'আমাদের প্রতিষ্ঠানের সকল শিক্ষার্থী, শিক্ষক ও কর্মচারীদের প্রতি আমি সম্মান ও আন্তরিক শুভেচ্ছা জানাই। আমরা সবাই একসাথে মিলে আমাদের প্রতিষ্ঠানকে উন্নতির পথে এগিয়ে নিয়ে যাবো। আমাদের প্রতিষ্ঠান একটি সমৃদ্ধ ও সমবেত সমাজ গঠনের লক্ষ্যে কাজ করছে। আমরা চাই আমাদের শিক্ষার্থীরা সমাজের সক্রিয় সদস্য হিসেবে অবদান রাখবে এবং তাদের জীবনের লক্ষ্য অর্জন করবে। আমরা আমাদের শিক্ষক ও কর্মচারীদের সহযোগিতায় এই লক্ষ্য অর্জনের চেষ্টা করছি।'}

    if (!post) return null
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">অধ্যক্ষের বার্তা</h2>
      <div className="space-y-4">
      <div className="flex justify-center items-center">
      <Image src="/principal.jpg" alt="Principal" width={400} height={400} />
      </div>
        <div className="text-center mb-4">
   
          <h3 className="font-semibold">{post.title}</h3>
          <p className="text-sm text-gray-500">{post.author}</p>
        </div>
        <div className="text-gray-600">
          <div dangerouslySetInnerHTML={{ __html: post.description }} />
            </div>
        </div>
        </div>
    )
}