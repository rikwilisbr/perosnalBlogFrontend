import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export default async function LoginMiddleware(request: NextRequest){
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const token = request.cookies.get('token')
  const payloadConfig = {
    method: 'GET', 
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token?.value}`
    } 
  }

  if (!token) {
    return NextResponse.next();
  }

  try {
    const response = await fetch(new URL(apiUrl + '/auth').href, payloadConfig)
    const data = await response.json()
    if(!data.id){
        return NextResponse.next()
    } else {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }   
  } catch (error) {
    return NextResponse.next()
  }
}