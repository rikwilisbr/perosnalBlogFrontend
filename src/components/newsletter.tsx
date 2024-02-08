import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'

export default function Newsletter() {
  return (
    <div className='flex flex-col gap-4 border border-gray-300 rounded-sm mt-10 bg-gray-200 text-center py-6 px-20'>
        <span className='font-bold text-lg'>Join the Newsletter</span>
        <div className='flex flex-col md:flex-row gap-1'>
            <Input placeholder='Email address' className='bg-white outline-none border border-neutral-300'/>
            <Button>Subscribe</Button>
        </div>
        <span className='text-sm opacity-60'>Subscribe to get blog updates straight to your inbox!</span>
        
    </div>
  )
}
