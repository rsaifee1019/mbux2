import { getSession } from '@auth0/nextjs-auth0/edge';
import { NextResponse } from 'next/server';
import axios from 'axios';



export default async function middleware(req) {

  const res = NextResponse.next();
  const session = await getSession(req, res);



  // Check if user is authenticated
  if (!session?.user) {
    console.log('User not authenticated, redirecting to login.');
    return NextResponse.redirect(new URL('/api/auth/login', req.url));
  }

  const userEmail = session.user.email;
  console.log('Authenticated user email:', userEmail);

  // Check the path to determine which authorization to apply
  const path = req.nextUrl.pathname;
  console.log('Requested path:', path);

  // Admin routes check
  if (path.startsWith('/dashboard') || path.startsWith('/admin') || path.startsWith('/api/admin')) {
    if (userEmail !== 'mbuxbd@gmail.com') {
      console.log('User is not authorized for admin routes, redirecting to unauthorized page.');
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
    console.log('User authorized for admin routes.');
  }

  // Teacher routes check
  if (path.startsWith('/absent') || path.startsWith('/api/absent')) {
    try {
      console.log('Checking teacher routes for user:', userEmail);
    const response = await fetch(`https://mbhec.edu.bd/api/teachersAll?timestamp=${Date.now()}`);
      const data = await response.json();
 
      const teachers = data; // Assuming the response data is an array of teachers
      const teacherEmails = teachers.map(teacher => teacher.userEmail);
      console.log('Teacher emails:', teacherEmails);

      if (!teacherEmails.includes(userEmail)) {
        console.log('User email not found in teacher emails, redirecting to unauthorized page.');
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }

    } catch (error) {
 
      return NextResponse.redirect(new URL('/error', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: [
    // Admin routes
    '/dashboard/:path*',
    '/admin/:path*',
    '/api/admin/:path*',
    // Teacher routes
    '/absent/:path*',
    '/api/absent/:path*'
  ]
}