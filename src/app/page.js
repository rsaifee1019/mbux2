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
import Post from '@/models/Post'
import PostCard from '@/components/homepage/PostCard'
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
                <div className='flex flex-col md:flex-row justify-start '>
                    {/* NoticeBoard section */}
                    <NoticeBoardClient notices={notices} className="md:w-1/3" />
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4 m-4 md:w-2/3">
                        {/* Featured Content */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <Link href={`/fees`} className='col-span-1'>
                                <Image src="/tuition.jfif" alt="tuition" width={500} height={500} className="rounded-lg" />
                            </Link>
                            <Link href={`/admissions`} className='col-span-1'>
                                <Image src="/admission.jpg" alt="admission" width={500} height={500} className="rounded-lg" />
                            </Link>
                            <Link href={`/admissions`} className='col-span-2'>
                                <Image src="/admission.jpg" alt="admission" width={500} height={500} className="rounded-lg" />
                            </Link>
                        </div>
                    </div>
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