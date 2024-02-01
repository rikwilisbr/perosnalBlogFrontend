import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export default async function AdminMiddleware(request: NextRequest) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }