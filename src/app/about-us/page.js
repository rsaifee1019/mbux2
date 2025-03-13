// site/src/app/about/page.js
import React from 'react';
import PageHero from '@/components/PageHero';
export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
  <h1 className='text-center text-black md:text-4xl'>আমাদের সম্পর্কে</h1>
    {/*  <p className="my-4">
        আমাদের প্রতিষ্ঠানে স্বাগত! আমরা সকল শিক্ষার্থীর জন্য উচ্চমানের শিক্ষা প্রদান এবং সমর্থনশীল শিক্ষা পরিবেশ তৈরি করতে নিবেদিত।
      </p>*/}
      <div className="container  px-4 py-8 md:max-w-[50vw]">
      <h2 className="text-2xl text-accent font-semibold mb-2">আমাদের মিশন</h2>
      <p className="mb-4">
        আমাদের মিশন হলো শিক্ষার্থীদের তাদের একাডেমিক এবং পেশাগত উদ্যোগে সফল হতে প্রয়োজনীয় জ্ঞান এবং দক্ষতা প্রদান করা। আমরা একটি শিক্ষার্থী সম্প্রদায় তৈরি করতে চাই যারা সক্রিয়, অবহিত এবং অনুপ্রাণিত।
      </p>
      <h2 className="text-2xl text-accent font-semibold mb-2">আমাদের দৃষ্টি</h2>
      <p className="mb-4">
        আমরা এমন একটি ভবিষ্যত দেখতে চাই যেখানে সকলের জন্য শিক্ষা সহজলভ্য হবে, এবং প্রত্যেক শিক্ষার্থী তাদের সম্পূর্ণ সম্ভাবনা অর্জন করতে পারবে। আমরা উদ্ভাবনী শিক্ষা ও শিক্ষা প্রক্রিয়ায় নেতৃত্ব দিতে চাই।
      </p>
      <h2 className="text-2xl text-accent font-semibold mb-2">আমাদের মূল্যবোধ</h2>
      <ul className="list-disc list-inside mb-4">
        <li>নৈতিকতা</li>
        <li>উৎকর্ষ</li>
        <li>সমাবেশ</li>
        <li>সহযোগিতা</li>
        <li>উদ্ভাবন</li>
      </ul>
      <h2 className="text-2xl text-accent font-semibold mb-2">আমাদের সাথে যোগাযোগ করুন</h2>
      <p>আপনার কোনো প্রশ্ন থাকলে বা আমাদের প্রোগ্রামসম্পর্কে আরও জানতে চাইলে, অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন!</p>
    </div>
    </div>
  );
}