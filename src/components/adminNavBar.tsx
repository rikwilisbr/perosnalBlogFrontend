import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import AdminAvatarDropdown from './adminAvatarDropdown'

export default function AdminNavBar() {
  return (
      <div className='fixed flex flex-row items-center justify-between border-b gap-4 border-neutral-200 px-16 h-14 w-full bg-white'>
        <div className=''>
          <Link className='flex gap-1 flex-row items-center h-full' href='/admin/dashboard'>
            <span className=' text-sm'>Tuzhy Articles</span>
            <span className='font-bold '>ADMIN Dashboard</span>
          </Link> 
        </div>
        <AdminAvatarDropdown />
      </div>
  )
}
