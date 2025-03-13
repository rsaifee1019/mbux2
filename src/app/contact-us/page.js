// site/src/app/contact/page.js
import React from 'react';
import PageHero from '@/components/PageHero';
import connectionToDatabase from '@/lib/mongodb';
import Teacher3 from '@/models/Teacher';
import { Button } from '@/components/ui/button';

export default async function ContactPage() {
  await connectionToDatabase();
  const teachers = await Teacher3.find();
  console.log(teachers);
  return (
    <div className="container mx-auto px-4 py-8">
    
     
      <p className=" md:text-center text-accent md:text-4xl my-4">
      আমাদের সাথে যোগাযোগ করুন
      </p>
      <h2 className="text-2xl text-accent font-semibold mb-2">আমাদের ঠিকানা</h2>
      <p className="mb-4">
        ১২৩ শিক্ষা লেন, <br />
        জ্ঞান নগর, <br />
        শিক্ষা রাজ্য, ১২৩৪৫
      </p>
      <h2 className="text-2xl text-accent font-semibold mb-2">ফোন</h2>
      <p className="mb-4">+১ (১২৩) ৪৫৬-৭৮৯০</p>
      <h2 className="text-2xl text-accent font-semibold mb-2">ইমেইল</h2>
      <p className="mb-4">info@educationinstitution.com</p>
      
      <h2 className="text-2xl text-accent  font-semibold mb-2">যোগাযোগ ফর্ম</h2>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 md:max-w-[50vw]">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            নাম
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="আপনার নাম" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            ইমেইল
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="আপনার ইমেইল" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
            বার্তা
          </label>
          <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message" placeholder="আপনার বার্তা" rows="4"></textarea>
        </div>
        <div className="flex items-center justify-end self-end">
          <Button className=" text-white  py-2 px-4 rounded ">
            বার্তা পাঠান
          </Button>
        </div>
      </form>
    </div>
  );
}