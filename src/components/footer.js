import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getSession } from '@auth0/nextjs-auth0';

export default async function Footer() {
  const session = await getSession();
  const isLoggedIn = session?.user;
  return (  
 
  <footer className="font-banglaStraight bg-white text-[#4f4a4a] py-8 border-t border-[#4f4a4a] shadow-md">
  <div className="container mx-auto px-4">
    <div className="grid md:grid-cols-4 gap-8">
      <div>
        <h3 className="text-lg font-bold mb-4">যোগাযোগ</h3>
        <p>ঠিকানা: আপনার বিশ্ববিদ্যালয়ের ঠিকানা</p>
        <p>ফোন: 01760067186</p>
        <p>ইমেইল: mbhec@yahoo.</p>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-4">দ্রুত লিঙ্ক</h3>
        <ul className="space-y-2">
          <li><Link href="#" className="hover:underline">ফ্যাকাল্টি</Link></li>
          <li><Link href="#" className="hover:underline">ভর্তি</Link></li>
          <li><Link href="#" className="hover:underline">অনলাইন টিউশন ফি</Link></li>
          <li><Link href="#" className="hover:underline">আমাদের সম্পর্কে</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-4">সামাজিক মাধ্যম</h3>
        <ul className="space-y-2">
          <li><Link href="#" className="hover:underline">ফেসবুক</Link></li>
          <li><Link href="#" className="hover:underline">টুইটার</Link></li>
          <li><Link href="#" className="hover:underline">ইনস্টাগ্রাম</Link></li>
          <li><Link href="#" className="hover:underline">লিঙ্কডইন</Link></li>
        </ul>
      </div>
      <div>
      <div className='flex flex-col gap-4'>
         <a href="/admin" className="text-primary-foreground text-lg font-bold mb-4 hover:underline">Admin</a>
         {isLoggedIn && (<a href="/api/auth/logout" className="text-primary-foreground text-lg font-bold mb-4 hover:underline">Logout</a>)}
         </div>
         <p className="mb-4">আমাদের নিউজলেটারে সাবস্ক্রাইব করুন</p>
        <form className="flex">
          <Input type="email" placeholder="আপনার ইমেইল" className="rounded-r-none" />
          <Button type="submit" className="rounded-l-none">সাবস্ক্রাইব</Button>
        </form>
       
      </div>
    </div>
    <div className="mt-8 text-center">
      <p>&copy; 2023 আপনার বিশ্ববিদ্যালয়। সর্বস্বত্ব সংরক্ষিত।</p>
    </div>
  </div>
</footer> 
  )
}
