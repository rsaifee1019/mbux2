// site/src/app/about/page.js
import React from 'react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="mb-4">
        Welcome to our institution! We are dedicated to providing quality education and fostering a supportive learning environment for all students.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
      <p className="mb-4">
        Our mission is to empower students with the knowledge and skills they need to succeed in their academic and professional endeavors. We strive to create a community of learners who are engaged, informed, and inspired.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
      <p className="mb-4">
        We envision a future where education is accessible to all, and every student has the opportunity to reach their full potential. We aim to be a leader in innovative teaching and learning practices.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Our Values</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Integrity</li>
        <li>Excellence</li>
        <li>Inclusivity</li>
        <li>Collaboration</li>
        <li>Innovation</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
      <p>If you have any questions or would like to learn more about our programs, please feel free to reach out!</p>
    </div>
  );
}