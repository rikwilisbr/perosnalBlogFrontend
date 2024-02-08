import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export default async function DashboardMiddleware(request: NextRequest){
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const token = request.cookies.get('token')
  const payloadConfig = {
    method: 'GET', 
    headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token?.value}`
    } 
  }

  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  try {
    const response = await fetch(new URL(apiUrl + '/auth').href, payloadConfig)
    const data = await response.json()
    if(!data.id){
        return NextResponse.redirect(new URL('/admin/login', request.url))
    } else {
        return NextResponse.next()
    }
  } catch (error) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
}