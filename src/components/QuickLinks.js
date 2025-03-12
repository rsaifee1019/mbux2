import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'

export default function QuickLinks() {
    const links = [
      { title: 'অনলাইন ফি', href: '/fees', icon: '💰', description: 'আমাদের অভিজ্ঞ ও বিশেষজ্ঞ শিক্ষকদের সাথে পরিচিত হোন। আমাদের অধ্যাপকগণ তাদের ক্ষেত্রে শীর্ষস্থানীয় গবেষক এবং পেশাদার, যারা শিক্ষার্থীদের সর্বোচ্চ মানের শিক্ষা প্রদানে প্রতিশ্রুতিবদ্ধ।', image:'/onlinePay.jpg', cta:'প্রদান করুন  ' },
      { title: 'শিক্ষকমণ্ডলী', href: '/faculty', icon: '👥', description: 'আমাদের অভিজ্ঞ ও বিশেষজ্ঞ শিক্ষকদের সাথে পরিচিত হোন। আমাদের অধ্যাপকগণ তাদের ক্ষেত্রে শীর্ষস্থানীয় গবেষক এবং পেশাদার, যারা শিক্ষার্থীদের সর্বোচ্চ মানের শিক্ষা প্রদানে প্রতিশ্রুতিবদ্ধ।', image:'/faculty.webp', cta:'সব দেখুন ' },

      { title: 'ভর্তি', href: '/admissions', icon: '📝', description: 'আমাদের বিশ্ববিদ্যালয়ে ভর্তির প্রক্রিয়া, যোগ্যতা এবং সময়সীমা সম্পর্কে সমস্ত প্রয়োজনীয় তথ্য পান। অনলাইন আবেদন, মেধা বৃত্তি,  আর্থিক সহায়তার এবং প্রয়োজনীয় ডকুমেন্টস সম্পর্কে বিস্তারিত জানুন।', image:'/admission.jpg', cta:' আবেদন করুন ' },
    ]
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 m-4">
        {links.map((link, index) => (
          <div key={link.title} className=' py-4'>
            <div key={link.title} className={`flex flex-col md:gap-8 items-center ${index < 2 ? 'border-r-2 border-gray-300': null}`}>
            <div className="relative md:w-[440px] md:h-[280px]">
            <Image
              src={link.image}
              alt={link.title || link.href}
              fill
              objectFit="cover"
              className="rounded"
            />

          </div>
          <div className='flex flex-col md:px-14 md: gap-4'>
          <h1 className='text-[#51a744] font-bangla text-5xl align-self:flex-start;'> {link.title}</h1>
          <p className='text-[#6b6461] text:medium font-banglaStraight'>{link.description}</p>   
          </div>
          <Link
            key={link.title}
            href={link.href}
            className=" "
          >      
            <Button className='bg-[#51a744] rounded-none font-bangla text-white md:text-lg'> {link.cta}</Button>
          </Link>
          </div>
        </div>
        ))}
      </div>
    )
  }