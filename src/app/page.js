'use server'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import mongoose from 'mongoose';
import Notice from "@/models/Notice"
import NoticeBoardClient from "@/components/NoticeBoardClient"
import connectionToDatabase from '@/lib/mongodb';
import TuitionCard from '@/components/homepage/tuitionCard';
import AdmissionCard from '@/components/homepage/AdmissionCard'
import PrincipalMessage from '@/components/homepage/PrincipalMessage'
import Post from '@/models/Post'
import PostCard from '@/components/homepage/PostCard'
import QuickLinks from '@/components/QuickLinks'
import EventsCalendar from '@/components/homepage/EventsCalendar'
import { Suspense } from 'react';
const HomePage = async () => {
    await connectionToDatabase();
    const notices = await Notice.find();
    const posts = await Post.findOne({category: 'principal'});

    const fact = {title: 'রাজশাহীতে একমাত্র গার্হস্থ্য অর্থনীতি কলেজ',description: 'আমরা গর্বিত যে মাদার বক্স হোম ইকোনমিক্স কলেজ বাংলাদেশের অল্প কয়েকটি হোম ইকোনমিক্স কলেজের মধ্যে একটি এবং রাজশাহীতে একমাত্র হোম ইকোনমিক্স কলেজ। ১৯৮৫ সাল থেকে আমরা বিশেষায়িত শিক্ষা প্রদান করে আসছি যা ছাত্রছাত্রীদের পারিবারিক জীবন, পুষ্টি, শিশু বিকাশ, বস্ত্র ও টেক্সটাইল বিজ্ঞান এবং গৃহ ব্যবস্থাপনায় দক্ষতা অর্জনে সহায়তা করে। আমাদের অভিজ্ঞ শিক্ষকমণ্ডলী, আধুনিক গবেষণাগার, এবং হাতে-কলমে শিক্ষার মাধ্যমে আমরা শিক্ষার্থীদের পেশাদার ক্যারিয়ারের জন্য প্রস্তুত করি এবং পারিবারিক ও সামাজিক উন্নয়নে অবদান রাখার জন্য উদ্বুদ্ধ করি।'}
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}

            {/* Main content */}
            <main className="">
                {/* Hero section */}
                <div className='mb-4'>
                    <section className="relative h-[60vh] md:h-[90vh] text-white">\
                    <div className="absolute top-0 z-20 bg-transparent/30  h-full w-full"> </div>
                        <Image
                            src="/collegeFront.jpg"
                            alt="University campus"
                            layout="fill"
                            objectFit="cover"
                            className="absolute z-10"
                        />
                        <div className="absolute z-20  top-[5%] left-0 right-0 flex flex-col items-center justify-center">
                        <Image
                        src="/logo.png"
                        alt="University campus"
                        width={100}
                        height={100}
                        className="w-8 h-8 md:w-20 md:h-20 mb-2 md:mb-10 "
                      />
                  
                            <div className="text-center md:max-w-[80vw] border-b border-b-1 border-gray-200">
                                <h1 className="font-banglaStraight text-5xl md:text-7xl md:p-2  "
                                style={{ fontWeight: 10 }} >মাদার বখ্শ গার্হস্থ্য অর্থনীতি কলেজ</h1>
                            </div>
                            <p className=" text-lg md:text-3xl p-2  text-gray-100 md:mt-2 mb-8 md:mb-20">"প্রতিটি শিক্ষার্থী, প্রতিটি স্বপ্নকে সম্মান"</p>
                            <div className="flex gap-4 ">
                            
                           
                           {/* <Button className='font-banglaStraight bg-trasparent text-gray-200  border-2 px-8 py-4 text-xl hover:bg-gray-200 hover:text-emerald-950'>আমাদের সম্পর্কে </Button>
                            */}
                              <Link
                                    
                                        href='/admissions'
                                        className=" "
                                      >   
                            <Button className='font-banglaStraight bg-[#007741] ring-lime-500 ring-1 md:ring-2 rounded-none text-white  h-fit md:h-10 py-0 px-2 md:px-8 md:py-4 text-xl md:text-2xl hover:bg-white hover:ring-lime-500 hover:ring-2 hover:text-emerald-950'>আবেদন করুন</Button>
                          
                            </Link>
                            </div>
                            </div>
                    </section>
                </div>
                <QuickLinks />
                <div className='bg-transparent/90 py-8 md:px-40 md:py-14 justify-center flex flex-col items-center gap-8'>
                    <h1 className='text-white text-2xl md:text-8xl text-center'>{fact.title}</h1>
                    <p className='text-center font-banglaStraight text-white text-sm md:text-2xl'> {fact.description}</p>
                
                
                </div>
                <div className='flex flex-col md:flex-row justify-between gap-4 my-4 mx-4'>
                    {/* NoticeBoard section */}
                    <NoticeBoardClient notices={notices} className="" />
                    <EventsCalendar />
                 

                </div>
          

                <Suspense fallback={<div>Loading...</div>}>
                    <div className='flex flex-col md:flex-row justify-start '>
                        <PostCard posts={posts} className="md:w-1/3"/>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4 m-4 md:w-2/3">

                </div>
             </div>   
             </Suspense>
            </main>
        </div>
    )
}

export default HomePage;