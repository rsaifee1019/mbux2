'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu } from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const links = [{name: 'ফ্যাকাল্টি', link: "/faculty"} ,
    {name:'ভর্তি',link:"/admissions"},
     {name:'টিউশন ফি',link:"/fees"},
     {name:'আমাদের সম্পর্কে',link:"/about-us"},
     {name:'যোগাযোগ',link:"/contact-us"},
     {name:'নোটিশ',link:"/notices"}]

  return (
      <header className="bg-white text-primary z-0 md:h-24 items-center shadow-sm inset-shadow-sm">
        <div className="px-2 py-2 flex justify-between items-center md:h-full">
          <Link href="/" className="text-2xl font-bold flex text-emerald-950 items-center">
                 <Image
                                  src="/logo.png"
                                  alt="University campus"
                                  width={100}
                                  height={100}
                                  className="w-16 h-16 md:w-20 md:h-20  "
                                />
                            
                                      <div className="text-center md:max-w-[80vw]">
                                          <h1 className="font-banglaStraight text-xl md:text-2xl p-2 font-thin "
                                          style={{ fontWeight: 10 }} >মাদার বখ্শ গার্হস্থ্য অর্থনীতি কলেজ</h1>
                                      </div>
          </Link>
          <Menu className='cursor-pointer text-primary-foreground md:hidden' onClick={() => setIsOpen(!isOpen)} />
          <nav className="hidden md:flex gap-0 text-emerald-500 md:text-xl">
          {
            links.map((link) => (
              <Link 
                key={link.link} 
                href={link.link} 
                className="hover:border-b-4 px-4 hover:border-emerald-500 border-b-4 border-transparent"
              >
                {link.name}
              </Link>
            ))
          }
        </nav>
        </div>
        {/* Simple dropdown menu */}
        {isOpen && (
          <nav className="bg-[#efefef] text-black w-full shadow-lg z-50">
            <div className="flex flex-col space-y-4 p-4">
              <Link href="/faculty" className="hover:underline">ফ্যাকাল্টি</Link>
              <Link href="/admissions" className="hover:underline">ভর্তি</Link>
              <Link href="/fees" className="hover:underline">টিউশন ফি</Link>
              <Link href="/about-us" className="hover:underline">আমাদের সম্পর্কে</Link>
              <Link href="/contact-us" className="hover:underline">যোগাযোগ</Link>
              <Link href="/notices" className="hover:underline">নোটিশ</Link>
            </div>
          </nav>
        )}
      </header>
  )
}
