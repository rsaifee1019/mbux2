import localFont from "next/font/local";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/footer";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Providers } from './provider';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/banglaFont ANSI.ttf",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "মাদার বখ্শ গার্হস্থ্য অর্থনীতি কলেজ",
  description: "জ্ঞান এবং উদ্ভাবনের কেন্দ্র",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <UserProvider>
      <Providers>
      <body
        className={` ${geistSans.variable} ${geistMono.variable} antialiased `}
      >
    
          <Header />
          <main className="min-h-screen">{children}</main>
       
          <Footer />
      
      </body>
      </Providers>
      </UserProvider>
    </html>
  );
}
