// site/src/app/contact/page.js
import React from 'react';
import PageHero from '@/components/PageHero';
import connectionToDatabase from '@/lib/mongodb';
import Teacher3 from '@/models/Teacher';

export default async function ContactPage() {
  await connectionToDatabase();
  const teachers = await Teacher3.find();
  console.log(teachers);
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHero text="আমাদের সাথে যোগাযোগ করুন" />
     
      <p className="my-4">
        আমাদের সাথে যোগাযোগ করতে আগ্রহী? নিচের তথ্যগুলি ব্যবহার করুন।
      </p>
      <h2 className="text-2xl font-semibold mb-2">আমাদের ঠিকানা</h2>
      <p className="mb-4">
        ১২৩ শিক্ষা লেন, <br />
        জ্ঞান নগর, <br />
        শিক্ষা রাজ্য, ১২৩৪৫
      </p>
      <h2 className="text-2xl font-semibold mb-2">ফোন</h2>
      <p className="mb-4">+১ (১২৩) ৪৫৬-৭৮৯০</p>
      <h2 className="text-2xl font-semibold mb-2">ইমেইল</h2>
      <p className="mb-4">info@educationinstitution.com</p>
      <h2 className="text-2xl font-semibold mb-2">আমাদের অনুসরণ করুন</h2>
      <p className="mb-4">
        সামাজিক মিডিয়ায় আমাদের সাথে সংযুক্ত থাকুন:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li><a href="https://facebook.com" className="text-blue-600">ফেসবুক</a></li>
        <li><a href="https://twitter.com" className="text-blue-400">টুইটার</a></li>
        <li><a href="https://instagram.com" className="text-pink-600">ইনস্টাগ্রাম</a></li>
      </ul>
      <h2 className="text-2xl font-semibold mb-2">যোগাযোগ ফর্ম</h2>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            বার্তা পাঠান
          </button>
        </div>
      </form>
    </div>
  );
}