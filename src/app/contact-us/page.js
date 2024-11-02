// site/src/app/contact/page.js
import React from 'react';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4">
        We would love to hear from you! Please reach out to us using the information below.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Our Address</h2>
      <p className="mb-4">
        123 Education Lane, <br />
        Knowledge City, <br />
        Learning State, 12345
      </p>
      <h2 className="text-2xl font-semibold mb-2">Phone</h2>
      <p className="mb-4">+1 (123) 456-7890</p>
      <h2 className="text-2xl font-semibold mb-2">Email</h2>
      <p className="mb-4">info@educationinstitution.com</p>
      <h2 className="text-2xl font-semibold mb-2">Follow Us</h2>
      <p className="mb-4">
        Stay connected with us on social media:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li><a href="https://facebook.com" className="text-blue-600">Facebook</a></li>
        <li><a href="https://twitter.com" className="text-blue-400">Twitter</a></li>
        <li><a href="https://instagram.com" className="text-pink-600">Instagram</a></li>
      </ul>
      <h2 className="text-2xl font-semibold mb-2">Contact Form</h2>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Your Name" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Your Email" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
            Message
          </label>
          <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message" placeholder="Your Message" rows="4"></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}