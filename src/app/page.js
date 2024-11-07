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
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}

            {/* Main content */}
            <main className="">
                {/* Hero section */}
                <div className='mb-4'>
                    <section className="relative h-[60vh] text-white">
                        <Image
                            src="/slider2.jpg"
                            alt="University campus"
                            layout="fill"
                            objectFit="cover"
                            className=""
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <h1 className="text-4xl p-2 bg-black/70 md:text-6xl font-semibold mb-4">মাদার বখ্শ গার্হস্থ অর্থনীতি কলেজ</h1>
                            </div>
                        </div>
                    </section>
                </div>
                <QuickLinks />
                <div className='flex justify-between gap-4 my-4 mx-4'>
                    {/* NoticeBoard section */}
                    <NoticeBoardClient notices={notices} className="" />
                    <EventsCalendar />
                 

                </div>
                <PrincipalMessage />

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