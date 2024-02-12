import React from 'react'
import AdminNavBar from '@/components/adminNavBar'
import AdminPosts from '@/components/adminPosts'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type PostTypes = {
  id: string
  title: string,
  description: string,
  markdown: string
  tags: string[]
  date: string
}

export default function AdminDashboard() {
  return (
    <div className=''>
      <div className=''>
        <AdminNavBar />
      </div>
      <div className='px-10 pt-20 pb-10 md:px-16 flex flex-col'>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-col'>
            <span className='text-3xl font-bold'>Welcome Back</span>
            <span className='text-sm text-neutral-500'>Here you can find all your posts, and edit them!</span>
          </div>
          <div className=''>
          <Link href='/admin/dashboard/new'>
            <Button>New Post</Button>
          </Link>
          </div>
        </div>
        <div className='mt-6'>
          <AdminPosts />
        </div>
      </div>
    </div>
  )
}
