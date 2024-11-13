// middleware.js (in your root directory)
import { getSession } from '@auth0/nextjs-auth0/edge'
import { NextResponse } from 'next/server'
import connectionToDatabase from '@/lib/mongoose'
import Teacher from '@/models/Teacher'

export default async function middleware(req) {
  await connectionToDatabase()
  const teachers = await Teacher.find()
  let email = teachers.map(teacher => teacher.email)
  email.push('mbuxbd@gmail.com')

  const res = NextResponse.next()
  const session = await getSession(req, res)
  
  if (!session?.user) {
    return NextResponse.redirect(new URL('/api/auth/login', req.url))
  }

  // Check if email matches
  if (!email.includes(session.user.email)) {
    return NextResponse.redirect(new URL('/unauthorized', req.url))
  }

  return res
}

// Specify which routes to protect
export const config = {
  matcher: [
    // Add routes you want to protect
   
    '/absent/:path*',
    '/api/absent/:path*'
  ]
}